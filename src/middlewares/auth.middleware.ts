import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

/** 登录验证中间件 */
export const authMiddlrware = createMiddleware(async (c, next) => {
    const session = null

    if (!session) {
        throw new HTTPException(401, { message: "Unauthorized" })
    }

    // c.set("user", session.user)
    // c.set("session", session.session)
    return next()
})
