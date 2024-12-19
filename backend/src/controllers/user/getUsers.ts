import { Request, Response } from "express";
import { Types } from "mongoose";
import { ValidationChain, body } from "express-validator";

import UserService from "../../services/UserService";

export const getUsersValidationChains: ValidationChain[] = [
  body("userIds").notEmpty(),
  body("userIds.*").isMongoId(),
];

interface RequestBody {
  userIds: string[];
}

export default async function getUsers(request: Request, response: Response): Promise<void> {
  const { userIds } = <RequestBody>request.body;
  const userService = new UserService();

  const users = await userService.getUsers(userIds as unknown as Types.ObjectId[]);

  response.send({ data: users });
}
