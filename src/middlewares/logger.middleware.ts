import qs from "qs"
import { logger } from "@/common/lib/logger"
import { createMiddleware } from "hono/factory"

export const loggerMiddleware = createMiddleware(async (c, next) => {
    const params = c.req.method.toUpperCase() == "GET" ? JSON.stringify(qs.parse(c.req.query())) : JSON.stringify(await c.req.raw.clone().json())
    logger.info(`[${c.req.method}] ${c.req.path} - [params] ${params}`)
    await next()
})