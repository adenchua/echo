import { Request, Response, NextFunction } from "express";

import { UNAUTHENTICATED_ERROR } from "../controllers/auth/errors";

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

  next(UNAUTHENTICATED_ERROR);
}
