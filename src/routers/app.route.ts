import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { logger } from "@/common/lib/logger"
import { ParamsException } from "@/common/errors/params.error"
import { loggerMiddleware } from "@/middlewares/logger.middleware"
import { cronRoute } from "./cron/cron.route"
import { reportingRoute } from "./reporting/reporting.route"

export const app = new Hono().basePath("/api")
/** 日志中间件 */
app.use(loggerMiddleware)

app.route("/cron", cronRoute)
app.route("/reporting", reportingRoute)

/** 健康检查 */
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    })
})

/** 404路由 */
app.notFound((c) => {
    const data = {
        message: "Route not found",
        path: c.req.path,
    }
    return c.json(data, 404)
})

/** 全局错误拦截 */
app.onError((err, c) => {
    logger.error(`[${c.req.method}] ${c.req.path} - [message] ${err.message}`)
    /** 1.验证错误 */
    if (err instanceof ParamsException) {
        return c.json({ message: err.message, path: c.req.path }, err.status)
    }

    /** 2.请求错误 */
    if (err instanceof HTTPException) {
        return c.json({ message: err.message, path: c.req.path }, err.status)
    }

    return c.json({ message: err.message }, 500)
})
