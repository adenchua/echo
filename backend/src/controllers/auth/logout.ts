import { Request, Response } from "express";

export default function logout(request: Request, response: Response): void {
  request.logout((error) => {
    if (error) {
      response.sendStatus(400);
      return;
    }
    response.send();
  });
}
