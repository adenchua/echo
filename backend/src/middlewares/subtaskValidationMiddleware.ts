import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

const COMMON_SUBTASK_VALIDATION_CHAINS = {
  invalidBodySubtaskTitle: body("title", "INVALID_SUBTASK_TITLE").isString().trim(),
  invalidParamSubtaskId: param("subtaskId", "INVALID_SUBTASK_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
};

export const createSubtaskValidationChain = [
  body("ticketId", "INVALID_TICKET_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
  COMMON_SUBTASK_VALIDATION_CHAINS.invalidBodySubtaskTitle.notEmpty(),
];

export const updateSubtaskValidationChain = [
  COMMON_SUBTASK_VALIDATION_CHAINS.invalidParamSubtaskId,
  COMMON_SUBTASK_VALIDATION_CHAINS.invalidBodySubtaskTitle.optional(),
  body("isCompleted", "INVALID_SUBTASK_IS_COMPLETED").isBoolean().optional(),
];

export const deleteSubtaskValidationChain = [
  COMMON_SUBTASK_VALIDATION_CHAINS.invalidParamSubtaskId,
];

export const getSubtasksValidationChain = [
  body("subtaskIds", "INVALID_SUBTASK_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value: string) => isValidObjectId(value))),
];
