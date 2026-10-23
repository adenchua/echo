import { Request, Response } from "express";

import { wrapResponse } from "../../utils/responseUtils";
import { UNAUTHENTICATED_ERROR } from "../../errors/authErrors";

export default async function checkSession(request: Request, response: Response): Promise<void> {
  if (!request.user) {
    throw UNAUTHENTICATED_ERROR;
  }
  response.send(wrapResponse(request.user));
}
