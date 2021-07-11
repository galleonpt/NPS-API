import { Request, Response } from "express";
import { NpsService } from "../services/NPSService";

class NpsController {
  async handle(request: Request, response: Response) {
    const { survey_id } = request.params;

    const npsService = new NpsService();

    const result = await npsService.execute(survey_id);

    return response.json(result);
  }
}

export { NpsController };
