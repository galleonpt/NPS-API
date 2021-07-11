import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsService {
  async execute(survey_id: string) {
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Math.floor(
      ((promoters - detractor) / totalAnswers) * 100
    );
    let NpsStatus = "";

    if (calculate >= 0 && calculate < 50) {
      NpsStatus = "Bad";
    } else if (calculate >= 50 || calculate < 80) {
      NpsStatus = "Good";
    } else {
      NpsStatus = "Excellent";
    }

    return {
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
      status: NpsStatus,
    };
  }
}

export { NpsService };
