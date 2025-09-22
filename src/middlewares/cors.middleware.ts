import { env } from "hono/adapter"
import { cors } from "hono/cors"
import { createMiddleware } from "hono/factory"

/** 跨域中间件 */
export const corsMiddleware = createMiddleware(async (c, next) => {
    const { CORS_TRUSTED_ORIGINS } = env<{ CORS_TRUSTED_ORIGINS: string }>(c)
    const corsMiddlewareHandler = cors({
        origin: [CORS_TRUSTED_ORIGINS],
        allowHeaders: ["Content-Type", "Authorization", "Cookie"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    })
    return corsMiddlewareHandler(c, next)
})
