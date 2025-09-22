import { Hono } from "hono"
import { dbPayment, schemasPayment } from "@/db/payment"

/** 不需要鉴权的公共接口 */
export const reportingRoute = new Hono()

reportingRoute.get("/accounts", async (c) => {
    const data = await dbPayment.select().from(schemasPayment.account).limit(10)
    return c.json({ data })
})
