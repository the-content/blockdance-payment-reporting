import winston from "winston"

const timezoned = () => {
    return new Date().toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }) //.replace(/\//g, '-').replace(/,/g, '')
}

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        // 时间日期格式
        winston.format.timestamp({
            format: timezoned,
        }),
        // 打印格式
        winston.format.printf(({ timestamp, level, message }: any) => {
            return `${timestamp} ${level}: ${message}`
        }),
    ),
    transports: [new winston.transports.Console()],
})