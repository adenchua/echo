import errorCodeToMessageMap from "../constants/errorMessages";
import ErrorResponse from "../utils/ErrorResponse";

export const PROJECT_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["PROJECT_NOT_FOUND"],
  "PROJECT_NOT_FOUND",
  404,
);

export const PROJECT_MISMATCH_ERROR = new ErrorResponse(
  errorCodeToMessageMap["PROJECT_MISMATCH"],
  "PROJECT_MISMATCH",
  400,
);
