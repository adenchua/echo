import { Request, Response, NextFunction } from "express";

// checks if there is a user object added to the request object
export default function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.user) {
    next();
    return;
  }

  response.sendStatus(401);
}
