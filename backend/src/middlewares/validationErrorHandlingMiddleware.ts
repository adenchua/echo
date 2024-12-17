import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationErrorHandling = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    response.status(400).send({ errors: result.array() });
    return;
  }

  next(); // no errors, proceed with next controller/middleware
};
