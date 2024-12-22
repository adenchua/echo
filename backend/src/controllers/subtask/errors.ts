import errorCodeToMessageMap from "../../constants/errorMessages";
import ErrorResponse from "../../utils/ErrorResponse";

export const SUBTASK_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["SUBTASK_NOT_FOUND"],
  "SUBTASK_NOT_FOUND",
  404,
);
