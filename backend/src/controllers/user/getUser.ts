import { Request, Response } from "express";
import { param, ValidationChain } from "express-validator";
import { Types } from "mongoose";

import UserService from "../../services/UserService";

export const getUserValidationChains: ValidationChain[] = [param("userId").isMongoId().notEmpty()];

export default async function getUser(request: Request, response: Response): Promise<void> {
  const { userId } = request.params;
  const userService = new UserService();

  const user = await userService.getUser(userId as unknown as Types.ObjectId);

  response.send({ data: user });
}
