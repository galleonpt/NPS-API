import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"

class ListSurveyService{
  async execute(){
    const surveysRepository= getCustomRepository(SurveyRepository)

    const surveys= await surveysRepository.find()

    return surveys
  }
}

export {ListSurveyService}