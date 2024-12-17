import { validationResult } from "express-validator";

export const validationErrorHandling = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ errors: result.array() });
    return;
  }

  next(); // no errors, proceed with next controller/middleware
};
