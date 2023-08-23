import { PostsDB }  from "../models/Posts"
import { BaseDatabase } from "./BaseDataBase"


export class PostsDataBase extends BaseDatabase{

    public getAllPosts = async (): Promise <PostsDB[]> => {
        const result: PostsDB[] = await BaseDatabase.connection("posts")
        return result
        
    }
} 