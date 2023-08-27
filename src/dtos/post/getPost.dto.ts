 import z from "zod"
import { GetPostsModel } from "../../models/Posts"




export interface GetPostDTO {
  token:string
}

 export type GetPostsOutputDTO = GetPostsModel[] 



export const GetPostSchema = z.object({
  token: z.string()
}).transform(data => data as GetPostDTO) 
