import { Request, Response } from "express";
import { CreateSurveyService } from "../services/CreateSurveyService";

class CreateSurveyController{
  async handle(request:Request, response:Response){
    const {title, description}= request.body

    const createSurveyService= new CreateSurveyService()

    const survey = await createSurveyService.execute({title, description})

    return response.status(201).json(survey)
  }
}

export { CreateSurveyController }