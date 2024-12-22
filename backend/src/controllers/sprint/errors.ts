import errorCodeToMessageMap from "../../constants/errorMessages";
import ErrorResponse from "../../utils/ErrorResponse";

export const EXISTING_ACTIVE_SPRINT_ERROR = new ErrorResponse(
  errorCodeToMessageMap["EXISTING_ACTIVE_SPRINT"],
  "EXISTING_ACTIVE_SPRINT",
  400,
);

export const NO_ACTIVE_SPRINT_ERROR = new ErrorResponse(
  errorCodeToMessageMap["NO_ACTIVE_SPRINT"],
  "NO_ACTIVE_SPRINT",
  400,
);

export const SPRINT_NOT_EXIST_ERROR = new ErrorResponse(
  errorCodeToMessageMap["SPRINT_NOT_FOUND"],
  "SPRINT_NOT_FOUND",
  404,
);
