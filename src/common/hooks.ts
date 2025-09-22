import { Context } from "hono"
import { createMessageBuilder, fromError } from "zod-validation-error"
import { $ZodError } from "zod/v4/core"
import { ParamsException } from "@/common/errors/params.error"

/** 构建错误消息格式化 */
const messageBuilder = createMessageBuilder({
    maxIssuesInMessage: 3,
    prefix: undefined,
    includePath: true,
})

type ValidatorResult = {
    success: boolean
    error?: $ZodError<unknown>
}

/** 参数验证错误处理 */
export const validatorHook = async (result: ValidatorResult, c: Context) => {
    if (!result.success) {
        const message = fromError(result.error, { messageBuilder }).toString()
        throw new ParamsException(400, { message: message })
    }
}
