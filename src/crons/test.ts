import { logger } from "@/common/lib/logger"

export const handler = async (event: any) => {
    try {
        logger.info(`开始测试任务, 测试数据库连接:${process.env.DATABASE_URL_REPORTING}`)
    } catch (error) {
        logger.error("测试任务执行错误")
    }
}
