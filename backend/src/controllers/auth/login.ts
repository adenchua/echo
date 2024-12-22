import { Request, Response } from "express";

export default function login(request: Request, response: Response): void {
  response.sendStatus(200);
}
