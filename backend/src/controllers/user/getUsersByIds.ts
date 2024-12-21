import { Request, Response } from "express";
import { ValidationChain, body } from "express-validator";

import UserService from "../../services/UserService";

export const getUsersByIdsValidationChains: ValidationChain[] = [
  body("userIds").notEmpty(),
  body("userIds.*").isMongoId(),
];

interface RequestBody {
  userIds: string[];
}

export default async function getUsersByIds(request: Request, response: Response): Promise<void> {
  const { userIds } = <RequestBody>request.body;
  const userService = new UserService();

  const users = await userService.fetchUsersByIds(userIds);

  response.send({ data: users });
}
