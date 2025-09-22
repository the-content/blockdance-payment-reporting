import { handle } from 'hono/aws-lambda'
import { app } from "@/routers/app.route"

export const handler = handle(app)
