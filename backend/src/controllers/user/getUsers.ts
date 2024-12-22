import { Request, Response } from "express";

import UserService from "../../services/UserService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getUsers(request: Request, response: Response): Promise<void> {
  const { q } = request.query;
  const userService = new UserService();

  const users = await userService.fetchUsers(q as string);

  response.send(wrapResponse(users));
}
