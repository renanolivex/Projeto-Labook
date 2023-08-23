export class Posts{
    constructor(
    private id: string,
    private creator_id:string, 
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt :string,
    private updateAt :string
   
    ){}
}

export interface PostsDB {

 id: string,
 creator_id:string, 
 content: string,
 likes: number,
 dislikes: number,
 created_at :string,
 update_at :string
}