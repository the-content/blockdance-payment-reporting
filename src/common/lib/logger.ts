import winston from "winston"
import { $dayjs } from "./utils"

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        // 时间日期格式
        winston.format.timestamp({
            format: () => $dayjs().utcOffset(8).format("YYYY-MM-DDTHH:mm:ssZ"),
        }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
        // 打印格式
        // winston.format.printf(({ timestamp, level, message }: any) => {
        //     return `${timestamp} ${level}: ${message}`
        // }),
    ),
    transports: [new winston.transports.Console()],
})