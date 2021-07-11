import { Request, Response } from "express";
import {
  getCustomRepository,
  ReturningStatementNotSupportedError,
} from "typeorm";
import { CustomException } from "../exceptions/CustomException";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendEmailService from "../services/SendEmailService";
import { DecryptEmail } from "../utils/DecryptEmail";
import { resolve } from "path";

class SendEmailController {
  async handle(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const decryptEmail = new DecryptEmail();

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const allUsers = await userRepository.find();

    const user = allUsers.find(
      (item) => decryptEmail.execute(item.email) === email
    );

    if (!user)
      throw new CustomException({ status: 409, message: "Invalid User!" });

    const survey = await surveyRepository.findOne({ id: survey_id });

    if (!survey)
      throw new CustomException({ status: 409, message: "Invalid Survey!" });

    //pesquisar os questionários que o utilizador ja recebeu no email mas ainda nao respondeu
    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: {
        user_id: user.id,
        value: null,
      },
      relations: ["user", "survey"],
    });

    const path = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendEmailService.execute(email, variables, path);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);

    //se o surveyUser nao existir colocamos o id do registo que acabamos de fazer
    variables.id = surveyUser.id;

    await SendEmailService.execute(email, variables, path);

    return response.json(surveyUser);
  }
}

export { SendEmailController };
