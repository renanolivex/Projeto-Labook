import express from "express"
import cors from "cors"
import { postsRouter } from "./router/PostsRouter"
import dotenv from "dotenv"
import { usersRouter } from "./router/UsersRouter"

dotenv.config()



const app = express()


app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, ()=>{
    console.log(`Servidor está rodando na porta ${process.env.PORT || 3003}`)
})


app.use("/users", usersRouter)
app.use("/posts", postsRouter)