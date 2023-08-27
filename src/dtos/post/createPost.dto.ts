import z from "zod"


export interface CreatePostDTO {
  content:string,
  token:string
}




export const CreatePostSchema = z.object({
  content: z.string().min(2),
  token: z.string()
}).transform(data => data as CreatePostDTO)

