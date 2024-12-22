import { Request, Response } from "express";
import { param, ValidationChain } from "express-validator";

import UserService from "../../services/UserService";
import { wrapResponse } from "../../utils/responseUtils";

export const getUserByIdValidationChains: ValidationChain[] = [
  param("userId").isMongoId().notEmpty(),
];

export default async function getUserById(request: Request, response: Response): Promise<void> {
  const { userId } = request.params;
  const userService = new UserService();

  const user = await userService.fetchUserById(userId);

  response.send(wrapResponse(user));
}
