import { param, body } from "express-validator";
import { isValidObjectId } from "mongoose";

const COMMON_TICKET_VALIDATION_CHAINS = {
  invalidBodyTicketTitle: body("title", "INVALID_TICKET_TITLE").isString().trim(),
  invalidBodyTicketPriority: body("priority", "INVALID_TICKET_PRIORITY").isIn([
    "low",
    "medium",
    "high",
    "highest",
  ]),
  invalidBodyTicketType: body("type", "INVALID_TICKET_TYPE").isIn(["story", "task", "bug"]),
  invalidParamTicketId: param("ticketId", "INVALID_TICKET_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
  invalidBodyProjectId: body("projectId", "INVALID_PROJECT_ID")
    .trim()
    .custom((value) => isValidObjectId(value)),
};

export const createTicketValidationChain = [
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyProjectId.notEmpty(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketTitle.notEmpty(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketPriority.optional(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketType.optional(),
];

export const updateTicketValidationChain = [
  COMMON_TICKET_VALIDATION_CHAINS.invalidParamTicketId.notEmpty(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketTitle.optional(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketType.optional(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyTicketPriority.optional(),
  body("description", "INVALID_TICKET_DESCRIPTION").isString().trim().optional(),
  body("status", "INVALID_TICKET_STATUS")
    .isIn(["todo", "progress", "review", "completed", "stuck", "hold"])
    .optional(),
  body("dueDate", "INVALID_TICKET_DUE_DATE").isISO8601().optional(),
  body("isInSprint", "INVALID_TICKET_IS_IN_SPRINT").isBoolean().optional(),
  body("assigneeId", "INVALID_TICKET_ASSIGNEE_ID")
    .custom((value) => value === null || isValidObjectId(value))
    .optional(),
  body("storyPoints", "INVALID_TICKET_STORY_POINTS").isNumeric().optional(),
];

export const deleteTicketValidationChain = [
  COMMON_TICKET_VALIDATION_CHAINS.invalidParamTicketId.notEmpty(),
  COMMON_TICKET_VALIDATION_CHAINS.invalidBodyProjectId.notEmpty(),
];

export const getTicketsValidationChain = [
  body("ticketIds", "INVALID_TICKET_IDS")
    .notEmpty()
    .isArray({ min: 0 })
    .custom((values) => values.every((value) => isValidObjectId(value))),
];

export const getTicketValidationChain = [
  COMMON_TICKET_VALIDATION_CHAINS.invalidParamTicketId.notEmpty(),
];
