import {AES, enc} from 'crypto-js'

class DecryptEmail{
  execute(encryptedEmail:string){
    return AES.decrypt(encryptedEmail, process.env.ENCRYPT_TOKEN).toString(enc.Utf8)
  }
}
export {DecryptEmail}