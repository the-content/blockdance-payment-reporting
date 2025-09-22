import { Hono } from "hono"

/** cron任务管理接口 */
export const cronRoute = new Hono()

cronRoute.get("/", async (c) => {
    return c.json({ message: "cron task" })
})
