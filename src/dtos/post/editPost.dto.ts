import z from "zod"

export interface EditPostDTO {
  id:string,
  content:string,
  token:string
}


export const EditPostSchema = z.object({
    id:z.string(),
  content: z.string().min(2),
  token: z.string()
}).transform(data => data as EditPostDTO)