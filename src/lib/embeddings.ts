import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

export async function getEmbeddings(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001"})
    const result = await model.embedContent(text.replace(/\n/g, " "));
    const embedding = result.embedding;
    //console.log(embedding);
    //
    return embedding.values;
    //return embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}