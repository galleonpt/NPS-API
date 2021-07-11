import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

interface IVariables{
  name:string,
  title:string,
  description:string,
  id:string,
  link:string
}

class SendEmailService{
  private client:Transporter;

  constructor(){
    nodemailer.createTestAccount().then(account=>{
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client=transporter
    });
  }

  async execute(to:string, variables:IVariables, path:string){
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html= mailTemplateParse(variables) 

    const message= await this.client.sendMail({
      to,
      subject:variables.title,
      html,
      from: "NPS <noreply@nps.com.>"
    })
    console.log(`Message sent: ${message.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}
export default new SendEmailService()