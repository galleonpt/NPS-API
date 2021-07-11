import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { CreateSurveyController } from "./controllers/CreateSurveyController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListSurveyController } from "./controllers/ListSurveysController";
import { NpsController } from "./controllers/NPSController";
import { SendEmailController } from "./controllers/SendEmailController";

const routes = Router();

//variables
const createUserController = new CreateUserController();
const createSurveyController = new CreateSurveyController();
const listSurveyController = new ListSurveyController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//routes
routes.post("/users", createUserController.handle);

routes.get("/surveys", listSurveyController.handle);
routes.post("/surveys", createSurveyController.handle);

routes.post("/sendEmail", sendEmailController.handle);

routes.get("/answers/:value", answerController.handle);

routes.get("/nps/:survey_id", npsController.handle);
export { routes };
