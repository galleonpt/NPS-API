import { Request, Response } from "express";
import { AnswerService } from "../services/AnswerService";

class AnswerController {
  async handle(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const answerService = new AnswerService();

    const surveyUser = await answerService.execute(value, u as string);

    return response.status(201).json(surveyUser);
  }
}

export { AnswerController };
