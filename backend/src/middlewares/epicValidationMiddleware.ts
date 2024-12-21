import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

const COMMON_EPIC_VALIDATION_CHAINS = {
  invalidBodyEpicTitle: body("title", "INVALID_EPIC_TITLE").trim().isString().isLength({ min: 1 }),
  invalidParamEpicId: param("epicId", "INVALID_EPIC_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
  invalidBodyTicketId: body("ticketId", "INVALID_TICKET_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
};

export const createEpicValidationChain = [
  COMMON_EPIC_VALIDATION_CHAINS.invalidBodyEpicTitle.notEmpty(),
  body("projectId", "INVALID_PROJECT_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
];

export const updateEpicValidationChain = [
  COMMON_EPIC_VALIDATION_CHAINS.invalidParamEpicId.notEmpty(),
  COMMON_EPIC_VALIDATION_CHAINS.invalidBodyEpicTitle.optional(),
];

export const getEpicsValidationChain = [
  body("epicIds", "INVALID_EPIC_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value: string) => isValidObjectId(value))),
];

export const addTicketToEpicValidationChain = [
  COMMON_EPIC_VALIDATION_CHAINS.invalidParamEpicId.notEmpty(),
  COMMON_EPIC_VALIDATION_CHAINS.invalidBodyTicketId.notEmpty(),
];

export const removeTicketFromEpicValidationChain = [
  COMMON_EPIC_VALIDATION_CHAINS.invalidParamEpicId.notEmpty(),
  COMMON_EPIC_VALIDATION_CHAINS.invalidBodyTicketId.notEmpty(),
];

export const deleteEpicValidationChain = [
  COMMON_EPIC_VALIDATION_CHAINS.invalidParamEpicId.notEmpty(),
];
