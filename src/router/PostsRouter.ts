import express from "express"
import { PostsController } from "../controller/PostsController"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsDataBase } from "../database/PostsDataBase"

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDataBase()
    )
)

postsRouter.get("/", postsController.getPosts)