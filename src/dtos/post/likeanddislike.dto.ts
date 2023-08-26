import z from "zod"

export interface LikeDislikeinputDTO{
    id: string,
    token:string,
    like: boolean
}

export type LikeDislikeOutputDTO = any

export const LikeDislikeSchema = z.object({
    id: z.string(),
    token: z.string(),
    like: z.boolean()
}).transform(data => data as LikeDislikeinputDTO)