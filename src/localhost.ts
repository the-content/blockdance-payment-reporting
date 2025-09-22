import { app } from "@/routers/app.route"

export default {
    fetch: app.fetch,
    host: "0.0.0.0",
    port: process.env.PORT || 3100,
}
