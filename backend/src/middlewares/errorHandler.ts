import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";

const errorHandler = (
  error: ErrorResponse,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const errorStatusCode = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";
  const errorCode = error.errorCode || "INTERNAL_SERVER_ERROR";
  const errorResponse = {
    timestamp: new Date().toISOString(),
    statusCode: errorStatusCode,
    errorCode,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? error.stack : {}, // do not send sensitive information to clients in prod
  };

  console.error(error);

  response.status(errorStatusCode).send({
    status: "error",
    error: errorResponse,
  });
};

export default errorHandler;
