import errorCodeToMessageMap from "../../constants/errorMessages";
import ErrorResponse from "../../utils/ErrorResponse";

export const INVALID_CREDENTIALS_ERROR = new ErrorResponse(
  errorCodeToMessageMap["INVALID_CREDENTIALS"],
  "INVALID_CREDENTIALS",
  401,
);

export const UNAUTHENTICATED_ERROR = new ErrorResponse(
  errorCodeToMessageMap["UNAUTHENTICATED"],
  "UNAUTHENTICATED",
  401,
);

export const FORBIDDEN_ERROR = new ErrorResponse(
  errorCodeToMessageMap["FORBIDDEN"],
  "FORBIDDEN",
  403,
);
