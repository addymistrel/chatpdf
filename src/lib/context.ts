import { Pinecone } from "@pinecone-database/pinecone"
import { convertToAscii } from "./utils";
import { index } from "drizzle-orm/pg-core";
import { getEmbeddings } from "./embeddings";
export const getPineconeClient = () => {
    return new Pinecone({
      //environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
  };

export async function getMatchesFromEmbeddings(embeddings:number[], fileKey:string){
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("chat-pdf");
    try {
        const namespace=convertToAscii(fileKey);
        const queryResult=await pineconeIndex.namespace(namespace).query({
            topK:5,
            vector:embeddings,
            includeMetadata:true,
        })

         return queryResult.matches || [];
    } catch (error) {
        console.log('Error Querying Embeddings ', error);
        throw error;
    }
}

export async function getContext(query:string, fileKey:string) {
    const queryEmbeddings=await getEmbeddings(query);
    const matches=await getMatchesFromEmbeddings(queryEmbeddings, fileKey);


    const qualifyingDocs=matches.filter(match=>match.score && match.score>0.5);

    type Metadata={
        text:string,
        pageNumber:number
    }
    let docs=qualifyingDocs.map(match=>(match.metadata as Metadata).text);
    return docs.join('\n').substring(0,3000);
}



