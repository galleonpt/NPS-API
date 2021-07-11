import { getCustomRepository } from "typeorm";
import { CustomException } from "../exceptions/CustomException";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerService {
  async execute(value: string, u: string) {
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new CustomException({
        status: 409,
        message: "Invalid Survey User!",
      });
    }

    surveyUser.value = Number(value);
    await surveyUserRepository.save(surveyUser);

    return surveyUser;
  }
}

export { AnswerService };
