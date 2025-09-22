import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

const env = process.env.NODE_ENV
dotenv.config({ path: `.env.${env}`, override: true })

export default defineConfig({
    out: "./src/db/reporting",
    schema: "./src/db/reporting/schema.ts",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL_REPORTING!,
    },
});
