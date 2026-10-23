import { Request, Response } from "express";

import { wrapResponse } from "../../utils/responseUtils";

export default async function checkSession(request: Request, response: Response): Promise<void> {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  response.send(wrapResponse(request.user));
}
