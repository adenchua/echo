import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

const COMMON_PROJECT_VALIDATION_CHAIN = {
  invalidParamProjectId: param("projectId", "INVALID_PROJECT_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
  invalidBodyUserId: body("userId", "INVALID_USER_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
  invalidBodyProjectTitle: body("title", "INVALID_PROJECT_TITLE").trim().isString().notEmpty(),
  invalidBodyProjectType: body("type", "INVALID_PROJECT_TYPE").trim().isString().notEmpty(),
};

export const createProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectTitle,
  body("adminId", "INVALID_ADMIN_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectType,
];

export const getProjectValidationChain = [COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId];

export const addMemberToProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId,
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId,
];

export const removeMemberFromProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId,
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId,
];

export const addMembersToProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId,
  body("userIds", "INVALID_USER_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value) => isValidObjectId(value))),
];

export const updateProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId,
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectTitle.optional(),
  body("description", "INVALID_PROJECT_DESCRIPTION").optional().trim().isString(),
  body("announcement", "INVALID_PROJECT_ANNOUNCEMENT").optional().trim().isString(),
  body("picture", "INVALID_PICTURE").optional().isURL(),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectType.optional(),
];

export const getProjectsOfUserValidationChain = [
  param("userId", "INVALID_USER_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
];
