import { Request, Response } from "express";

import { wrapResponse } from "../../utils/responseUtils";

export default function login(request: Request, response: Response): void {
  response.send(wrapResponse(request.user?.id));
}
