import errorCodeToMessageMap from "../../constants/errorMessages";
import ErrorResponse from "../../utils/ErrorResponse";

export const EPIC_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["EPIC_NOT_FOUND"],
  "EPIC_NOT_FOUND",
  404,
);
