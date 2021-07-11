import {AES} from 'crypto-js'

class EncryptEmail{
  execute(email:string){
    return AES.encrypt(email, process.env.ENCRYPT_TOKEN).toString()
  }
}
export {EncryptEmail}