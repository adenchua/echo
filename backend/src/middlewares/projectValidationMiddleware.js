import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

export const COMMON_PROJECT_VALIDATION_CHAIN = {
  invalidParamProjectId: param("projectId", "INVALID_PROJECT_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
  invalidBodyUserId: body("userId", "INVALID_USER_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
  invalidBodyProjectTitle: body("title", "INVALID_PROJECT_TITLE").trim().isString(),
  invalidBodyProjectType: body("type", "INVALID_PROJECT_TYPE").trim().isString(),
};

export const createProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectTitle.notEmpty(),
  body("adminId", "INVALID_ADMIN_ID")
    .trim()
    .notEmpty()
    .custom((value) => isValidObjectId(value)),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyProjectType.notEmpty(),
];

export const getProjectValidationChain = [COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty()];

export const addMemberToProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId.notEmpty(),
];

export const removeMemberFromProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId.notEmpty(),
];

export const addMembersToProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
  body("userIds", "INVALID_USER_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value) => isValidObjectId(value))),
];

export const updateProjectValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
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

export const promoteMemberToAdministratorValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId.notEmpty(),
];

export const demoteAdmintoMemberValidationChain = [
  COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty(),
  COMMON_PROJECT_VALIDATION_CHAIN.invalidBodyUserId.notEmpty(),
];

export const deleteProjectValidationChain = [COMMON_PROJECT_VALIDATION_CHAIN.invalidParamProjectId.notEmpty()];
