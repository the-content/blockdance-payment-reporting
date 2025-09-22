import mysql from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import * as schemas from "./schema"

const poolConnection = mysql.createPool({
    uri: process.env.DATABASE_URL_REPORTING,
})

export const dbReporting = drizzle({ client: poolConnection, mode: "default", schema: schemas })

export const schemasReporting = schemas
