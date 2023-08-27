import { UserDB } from "../models/Users"
import { BaseDatabase } from "./BaseDataBase"

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
  
    public async findUsers(q: string | undefined): Promise<UserDB[]> {
      let usersDB
  
      if (q) {
        const result: UserDB[] = await BaseDatabase
          .connection(UsersDatabase.TABLE_USERS)
          .where("name", "LIKE", `%${q}%`)
  
        usersDB = result
      } else {
        const result: UserDB[] = await BaseDatabase
          .connection(UsersDatabase.TABLE_USERS)
  
        usersDB = result
      }
  
      return usersDB
    }

    public async findAllUsers(): Promise<UserDB[]> {
      
        const result: UserDB[] = await BaseDatabase
          .connection(UsersDatabase.TABLE_USERS)
  
      return result
    }

   
  
    public async findUserById(id: string): Promise<UserDB | undefined> {
      const [userDB]: UserDB[] | undefined[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where({ id })
  
      return userDB
    }
  
    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
      const [userDB]: UserDB[] | undefined[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where({ email })
  
      return userDB
    }
  
    public async insertUser(newUserDB: UserDB): Promise<void> {
      await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .insert(newUserDB)
    }


    public async returnUserName(id: string): Promise<string> {
      const [userDB]: UserDB[] = await BaseDatabase.connection(
        UsersDatabase.TABLE_USERS
      ).where({ id });

      return userDB.name;
    }
  }