import express from "express"
import { PostsController } from "../controller/PostsController"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsDataBase } from "../database/PostsDataBase"
import { IdGeneratorPost } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { UsersDatabase } from "../database/UsersDataBase"

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDataBase(),
        new IdGeneratorPost(),
        new TokenManager(),
        new UsersDatabase
        
  
    )
)

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.createPosts) 
postsRouter.put("/:id",postsController.editPosts)
postsRouter.delete("/:id", postsController.deletePosts)
postsRouter.put("/:id/like", postsController.likeAndDislike)
