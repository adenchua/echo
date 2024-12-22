import errorCodeToMessageMap from "../../constants/errorMessages";
import ErrorResponse from "../../utils/ErrorResponse";

export const TICKET_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["TICKET_NOT_FOUND"],
  "TICKET_NOT_FOUND",
  404,
);
