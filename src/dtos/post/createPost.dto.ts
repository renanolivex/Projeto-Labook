import z from "zod"
import { Posts } from "../../models/Posts"

export interface CreatePostDTO {
  content:string,
  token:string
}

export type GetPostOutputDTO = Posts[]


export const CreatePostSchema = z.object({
  content: z.string().min(2),
  token: z.string()
}).transform(data => data as CreatePostDTO)

