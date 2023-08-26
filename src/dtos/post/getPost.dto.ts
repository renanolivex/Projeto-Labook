 import z from "zod"


export interface GetPostDTO {
  token:string
}





export const GetPostSchema = z.object({
  token: z.string()
}).transform(data => data as GetPostDTO) 
