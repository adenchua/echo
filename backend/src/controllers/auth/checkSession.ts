import { Request, Response } from "express";

export default async function checkSession(request: Request, response: Response): Promise<void> {
  if (!request.user) {
    response.sendStatus(401);
    return;
  }
  response.sendStatus(200);
}
