import {Request, Response} from "express"
import { PostsBusiness } from "../business/PostsBusiness"

export class PostsController{

    constructor(
        private postsBusiness: PostsBusiness
    ){}
    public getPosts = async(req: Request, res: Response):Promise<void>=>{

    try {
        const result = await this.postsBusiness.getAllPosts()
        res.status(200).send(result)
        
    } catch (error:any) {
        res.status(400).send(error.message)
    }
    }
}