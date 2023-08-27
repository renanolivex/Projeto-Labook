import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness"
import { CreatePostSchema } from "../dtos/post/createPost.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { EditPostSchema } from "../dtos/post/editPost.dto"
import { DeletePostSchema } from "../dtos/post/deletePost.dto"
import { GetPostSchema } from "../dtos/post/getPost.dto"
import { LikeDislikeOutputDTO, LikeDislikeSchema } from "../dtos/post/likeanddislike.dto"



export class PostsController {

    constructor(
        private postsBusiness: PostsBusiness

    ) { }
    public getPosts = async (req: Request, res: Response): Promise<void> => {

        try {const input = GetPostSchema.parse({
            token: req.headers.authorization
            
        })
         
            const result = await this.postsBusiness.getAllPosts(input)
            res.status(200).send(result)

        } catch (error: any) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado, verifique o Token")
            }
        }
    }

 


    public createPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })
            await this.postsBusiness.createNewPost(input)

            res.status(201).send("Post criado com sucesso")
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public editPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = EditPostSchema.parse({
                id:req.params.id,
                content:req.body.content,
                token: req.headers.authorization
            })

            await this.postsBusiness.editNewPost(input)
            res.status(200).send("Post editado com sucesso!")
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePosts =async(req:Request, res: Response):Promise<void> =>{
        try {
            const input = DeletePostSchema.parse({
                id:req.params.id,
                token: req.headers.authorization
            }
          )

          await this.postsBusiness.delete(input)

          res.status(200).send("Post deletado com sucesso!")
            
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public likeAndDislike = async (req:Request, res:Response)=>{
        try {
            const input = LikeDislikeSchema.parse({
                id:req.params.id,
                token:req.headers.authorization,
                like:req.body.like
            })
            this.postsBusiness.likeAndDislikePosts(input)

            res.status(201).send("Reação alterada com sucesso!")
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }

}