import { promises } from "dns"
import { PostsDataBase } from "../database/PostsDataBase"
import { UsersDatabase } from "../database/UsersDataBase"
import { CreatePostDTO } from "../dtos/post/createPost.dto"
import { EditPostDTO } from "../dtos/post/editPost.dto"
import { POST_EXISTS_LIKE, Posts, PostsDB, likeDeslikeDB } from "../models/Posts"
import {  UserDB } from "../models/Users"
import {  IdGeneratorPost } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { BadRequestError } from "../errors/BadRequestError"
import { DeletePostDTO } from "../dtos/post/deletePost.dto"
import { LikeDislikeOutputDTO, LikeDislikeinputDTO } from "../dtos/post/likeanddislike.dto"
import { GetPostDTO, GetPostsOutputDTO} from "../dtos/post/getPost.dto"
import { NotFoundError } from "../errors/NotFoundError"

   


export class PostsBusiness{

    constructor(
        private postsDatabase: PostsDataBase,
        private IdGenerator: IdGeneratorPost,
        private tokenManager: TokenManager,
        private usersDatabase: UsersDatabase
  
    ){}

    public getAllPosts = async (input:GetPostDTO):Promise<GetPostsOutputDTO>=> {
        const {token} = input
        

        const payload = this.tokenManager.getPayLoad(token)

        if(!payload){
            throw new BadRequestError ("Não foi adicionado um token válido")
        }
        

        const postsData = await this.postsDatabase.getAllPosts()

        const getUsers = await this.usersDatabase.findAllUsers()
    



    const getUsersId = getUsers.map((found)=>found.id)

     console.log(getUsersId)

     const getPost = postsData.map((postsDB) => {
        const post = new Posts(
          postsDB.id,
          postsDB.creator_id,
          postsDB.content,
          postsDB.likes,
          postsDB.dislikes,
          postsDB.created_at,
          postsDB.updated_at
        );
        return post.toDBModel();
      });

      const getPostCreatorId = getPost.map((posts)=>posts.creator_id)

      const userName: any = []

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.usersDatabase.returnUserName(
        getPostCreatorId[i]
      );

      userName.push(result);
    }

        const getPosts = postsData.map((post, index) => {
            const newPost = {
              id: post.id,
              content: post.content,
              likes: post.likes,
              dislikes: post.dislikes,
              createdAt: post.created_at,
              updatedAt: post.updated_at,
              creator: {
                id: post.creator_id,
                name:userName[index],
              }
            }
            return newPost
        })
       const output:GetPostsOutputDTO = getPosts
        return output
    }



    public createNewPost = async (input: CreatePostDTO):Promise<void> => {
        const {content, token} = input
      
        if(!content) {
            throw new BadRequestError ("Não foi adicionado um post válido")
        }

        const payload = this.tokenManager.getPayLoad(token)
        if(!payload){
            throw new BadRequestError ("Não foi adicionado um token válido")
        }
        console.log(payload?.id)
        const id = this.IdGenerator.generateId()
        const allCreator = new UsersDatabase()
        const searchCreator:UserDB[]= await allCreator.findAllUsers()
        const creatorFound = searchCreator.find(element => element.id === payload?.id) 
        const creator_id = creatorFound?.id as string
        const today = new Date().toISOString()
        let likes = 0
        let dislikes = 0
        console.log(creator_id)

        const newPost = new Posts(id, creator_id, content, likes, dislikes, today, today )

        await this.postsDatabase.createNewPost(newPost.toDBModel())

    }


    public editNewPost = async(input:EditPostDTO):Promise<void> =>{

        const {id, content, token} = input

     
        const payload = this.tokenManager.getPayLoad(token)
        if(!payload){
            throw new BadRequestError ("Não foi adicionado um token válido")
        }

        const allPosts: PostsDB[] = await this.postsDatabase.getAllPosts()
        const postIdExists = allPosts.find(element => element.id ===id)
        if(!postIdExists?.id){
            throw new NotFoundError ("Id do post não encontrado")
        }

        const today = new Date().toISOString()
        const allCreator = new UsersDatabase()
        const searchCreator:UserDB[]= await allCreator.findAllUsers()
        const creatorFound = searchCreator.find(element => element.id === payload?.id) 


        console.log(postIdExists)
      
       
        if(creatorFound?.id != postIdExists.creator_id ){
            throw new BadRequestError("Você não consegue alterar uma mensagem criada por outra pessoa")
        }
        const postUpdate = new Posts(
            postIdExists.id,
            postIdExists.creator_id,
            content|| postIdExists.content,
            postIdExists.likes,
            postIdExists.dislikes,
            postIdExists.created_at,
            today

        )

        await this.postsDatabase.editNewPost(postUpdate.toDBModel())
    }

    public delete = async (input:DeletePostDTO):Promise<void> =>{
        const {id,token} = input

       
        const payload = this.tokenManager.getPayLoad(token)
        if(!payload){
            throw new BadRequestError ("Não foi adicionado um token válido")
        }
        const allPosts: PostsDB[] = await this.postsDatabase.getAllPosts()
        const postIdExists = allPosts.find(element => element.id ===id)
        if(!postIdExists?.id){
            throw new NotFoundError ("Id do post não encontrado")
        }
        const allCreator = new UsersDatabase()
        const searchCreator:UserDB[]= await allCreator.findAllUsers()
        const creatorFound = searchCreator.find(element => element.id === payload?.id) 
        if(creatorFound?.id != postIdExists.creator_id && creatorFound?.role === "NORMAL" ){
            throw new BadRequestError("Você não consegue deletar uma mensagem criada por outra pessoa")
        }

        await this.postsDatabase.deletePost(input)

    }


    public likeAndDislikePosts = async (input:LikeDislikeinputDTO):Promise<LikeDislikeOutputDTO>=>{
        const {id, token , like}= input

        const payload = this.tokenManager.getPayLoad(token)

        console.log(payload)

        if(!payload) {
            throw new BadRequestError ("Token Inválido")
        }

        const allPosts: PostsDB[] = await this.postsDatabase.getAllPosts()
        const postIdExists = allPosts.find(element => element.id ===id)
        if(!postIdExists?.id){
            throw new NotFoundError ("Id do post não encontrado")
        }

        const likeOrDislike = like? 1:0
    
        const postDB = new Posts(
            postIdExists.id,
            postIdExists.creator_id,
            postIdExists.content,
            postIdExists.likes,
            postIdExists.dislikes,
            postIdExists.created_at,
            postIdExists.updated_at
        )

           
       

      
       
        const inputLike:likeDeslikeDB={
            user_id:payload.id,
            post_id:id,
            like: likeOrDislike
        }

        const likeDislikeExists = await this.postsDatabase.findIfExistLikeDislike(inputLike)     
        console.log(likeDislikeExists)
        
        
    
        if(likeDislikeExists === POST_EXISTS_LIKE.LIKED){
             if(like){
                await this.postsDatabase.removeLD(inputLike)
                postDB.removeLike()
            }else{
                await this.postsDatabase.updateLD(inputLike)
                postDB.removeLike()
                postDB.addDislikes()
            } }

            else if (likeDislikeExists===POST_EXISTS_LIKE.DISLIKED) {
                if(like===false){
                   
                    await this.postsDatabase.removeLD(inputLike)
                    postDB.removeDislikes()
                    
                }
                else{
                    await this.postsDatabase.updateLD(inputLike)
                    postDB.removeDislikes()
                    postDB.addLike()
                }

            }else{
                await this.postsDatabase.addLD(inputLike)
                like? postDB.addLike() : postDB.addDislikes()
            }
  
            const updateLikeDislike = postDB.toDBModel()
            await this.postsDatabase.editNewPost(updateLikeDislike)
        }
    }