import { UsersDatabase } from "../database/UsersDataBase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User } from "../models/Users"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UsersBusiness {
  constructor(
    private userDatabase: UsersDatabase,
    private IdGenerator: IdGenerator,
    private TokenManager: TokenManager
  ) { }

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { q } = input


    const usersDB = await this.userDatabase.findUsers(q)


    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )
  
      return user.toBusinessModel()
    })

    const output: GetUsersOutputDTO = users

    return output
  }

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input

    const userDBExists = await this.userDatabase.findUserByEmail(email)

    if (userDBExists) {
      throw new BadRequestError("Email já cadastrado!")
    }


    const id = this.IdGenerator.generateId()
    const newUser = new User(
      id,
      name,
      email,
      password,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    )

    const newUserDB = newUser.toDBModel()
    await this.userDatabase.insertUser(newUserDB)

    const token = this.TokenManager.createToken({
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole()
    })
    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token: token
    }

    return output
  }

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }

    if (password !== userDB.password) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }


    const payload: TokenPayload = {
      id:userDB.id,
      name: userDB.name,
      role: userDB.role
    }

    const token = this.TokenManager.createToken (payload)
    

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token
    }

    return output
  }
}