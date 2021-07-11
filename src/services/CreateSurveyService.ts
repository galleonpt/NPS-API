import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"

interface ISurveyData{
  title:string;
  description:string;
}

class CreateSurveyService{
  async execute({title, description}: ISurveyData){
    const surveysRepository = getCustomRepository(SurveyRepository)

    const survey= surveysRepository.create({
      title, description
    })

    await surveysRepository.save(survey)

    return survey
  }
}

export { CreateSurveyService }
