import z from "zod"
import { UserModel } from "../../models/Users"

export interface GetUsersInputDTO {
  q: string
 
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
  q: z.string().min(1).optional(),
}).transform(data => data as GetUsersInputDTO)