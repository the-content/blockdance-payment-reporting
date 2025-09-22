import z from "zod"
import qs from "qs"

/** 定义排序项的 schema */
export const sortingItemSchema = z.object({
    id: z.string(),
    desc: z.union([z.boolean(), z.stringbool()]).default(false),
})

/** 定义过滤项的 schema */
export const filterItemSchema = z.object({
    id: z.string(),
    operation: z.enum(['']),
    value: z.string().optional(),
})

/** 创建 query schema，使用 qs 解析嵌套数组参数 */
export const tableQuerySchema = z.preprocess(
    (val) => qs.parse(val as string),
    z.object({
        pageIndex: z.coerce.number().int().positive().min(1).default(1),
        pageSize: z.coerce.number().int().positive().max(500).default(10),
        sorting: z.array(sortingItemSchema).optional(),
        filters: z.array(filterItemSchema).optional(),
    }),
)
