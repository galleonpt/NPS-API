import { Request, Response } from "express";
import { ListSurveyService } from "../services/ListSurveyService";

class ListSurveyController {
  async handle(request: Request, response: Response) {
    const listSurveyService = new ListSurveyService();

    const surveys = await listSurveyService.execute();

    return response.json(surveys);
  }
}

export { ListSurveyController };
