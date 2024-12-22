import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { IUser } from "../../models/user";
import { wrapResponse } from "../../utils/responseUtils";

export default function login(request: Request, response: Response): void {
  const user = request.user as HydratedDocument<IUser>;

  response.send(wrapResponse(user._id));
}
