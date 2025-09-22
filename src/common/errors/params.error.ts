import type { ContentfulStatusCode } from "hono/utils/http-status"
import { HTTPException } from "hono/http-exception"

type ParamsExceptionOptions = {
    res?: Response
    message?: string
    cause?: unknown
}

/** 参数验证错误 */
export class ParamsException extends HTTPException {
    constructor(status: ContentfulStatusCode, options?: ParamsExceptionOptions) {
        super(status, options)
        this.name = "ParamsException"
    }
}