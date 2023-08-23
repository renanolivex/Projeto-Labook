import express from "express"
import { UsersController } from "../controller/UsersController"
import { UsersBusiness } from "../business/UsersBusiness"
import { UsersDatabase } from "../database/UsersDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export const usersRouter = express.Router()

const usersController = new UsersController(
    new UsersBusiness(
        new UsersDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

usersRouter.get("/", usersController.getUsers)
usersRouter.post("/signup", usersController.signup)
usersRouter.post("/login", usersController.login)