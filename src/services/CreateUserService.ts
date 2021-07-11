import { getCustomRepository } from "typeorm"
import { CustomException } from "../exceptions/CustomException"
import { UserRepository } from "../repositories/UserRepository"
import { DecryptEmail } from "../utils/DecryptEmail"
import { EncryptEmail } from "../utils/EncryptEmail"

interface IUserData{
  name:string,
  email:string
}

class CreateUserService{
  async execute({name, email}:IUserData){
    const usersRepository= getCustomRepository(UserRepository)
    const encryptEmail= new EncryptEmail()
    const decryptEmail= new DecryptEmail()

    const allUsers= await usersRepository.find()

    const userAlreadyExists= allUsers.find( item => decryptEmail.execute(item.email) === email )
    
    if(userAlreadyExists){
      throw new CustomException({status:409, message:"User already exists!"})
    }

    const user= usersRepository.create({
      name, 
      email: encryptEmail.execute(email)
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }

