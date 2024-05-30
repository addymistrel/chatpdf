//tells where the schema is and connects to main drizzle for interacting with neonDB

import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: "./src/lib/db/Schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit push:pg

//npx drizzle-kit push:pg
//ABOVE COMMAND IS USED TO PUSH SCHEMA AND DATA TO DATABASE

//npx drizzle-kit studio