import z from "zod"

export interface DeletePostDTO {
  id:string,
  token:string
}


export const DeletePostSchema = z.object({
  id: z.string(),
  token: z.string()
}).transform(data => data as DeletePostDTO)