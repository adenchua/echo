import { Request, Response } from "express";
import { ValidationChain, body } from "express-validator";

import UserService from "../../services/UserService";

export const createUserValidationChains: ValidationChain[] = [
  body("username").trim().isString().toLowerCase().notEmpty(),
  body("password").trim().isString().notEmpty(),
];

interface RequestBody {
  username: string;
  password: string;
}

export default async function createUser(request: Request, response: Response): Promise<void> {
  const { username, password } = <RequestBody>request.body;
  const userService = new UserService();

  const user = await userService.createUser(username, password);

  response.send({ data: user });
}