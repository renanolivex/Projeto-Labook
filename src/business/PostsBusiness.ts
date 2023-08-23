import { PostsDataBase } from "../database/PostsDataBase"


export class PostsBusiness{

    constructor(
        private postsDatabase: PostsDataBase
    ){}

    public getAllPosts = async ()=> {
        const postsData = await this.postsDatabase.getAllPosts()

        return postsData
    }

}