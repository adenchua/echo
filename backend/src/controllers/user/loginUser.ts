import { Request, Response } from "express";
import { ValidationChain, body } from "express-validator";

import UserService from "../../services/UserService";

export const loginUserValidationChains: ValidationChain[] = [
  body("username").trim().isString().toLowerCase().notEmpty(),
  body("password").trim().isString().notEmpty(),
];

interface RequestBody {
  username: string;
  password: string;
}

export default async function loginUser(request: Request, response: Response): Promise<void> {
  const { username, password } = <RequestBody>request.body;
  const userService = new UserService();

  const userId = await userService.login(username, password);

  response.send({ data: userId });
}
