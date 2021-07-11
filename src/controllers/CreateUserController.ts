import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import * as yup from "yup";
import { CustomException } from "../exceptions/CustomException";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new CustomException({ status: 422, message: error });
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
