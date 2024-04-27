import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

const COMMON_SPRINT_VALIDATION_CHAINS = {
  invalidBodyProjectId: body("projectId", "INVALID_PROJECT_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
};

export const startSprintValidationChain = [
  COMMON_SPRINT_VALIDATION_CHAINS.invalidBodyProjectId.notEmpty(),
  body("endDateISOString", "INVALID_END_DATE").trim().notEmpty().isISO8601(),
];

export const endSprintValidationChain = [
  COMMON_SPRINT_VALIDATION_CHAINS.invalidBodyProjectId.notEmpty(),
  body("sprintId", "INVALID_SPRINT_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
];

export const getSprintsValidationChain = [
  body("sprintIds", "INVALID_SPRINT_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value) => isValidObjectId(value))),
];

export const getSprintValidationChain = [
  param("sprintId", "INVALID_SPRINT_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
];
