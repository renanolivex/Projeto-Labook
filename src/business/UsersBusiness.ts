import { UsersDatabase } from "../database/UsersDataBase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UsersBusiness {
  constructor(
    private userDatabase: UsersDatabase,
    private IdGenerator: IdGenerator,
    private TokenManager: TokenManager,
    private HashManager: HashManager
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
    const hashedPassword = await this.HashManager.hash(password)
    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
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

    const passwordCorrect = await this.HashManager.compare(password, userDB.password)

    if (!passwordCorrect) {
      throw new BadRequestError("'email' ou 'senha' incorretos")
    }


    const payload: TokenPayload = {
      id:userDB.id,
      name: userDB.name,
      role: userDB.role
    }

    if(!payload){
      throw new BadRequestError("Token inválido")
    }

    const token = this.TokenManager.createToken(payload)

    console.log(payload)


    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token
    }

    return output
  }
  
}