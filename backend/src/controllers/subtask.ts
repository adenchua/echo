import { Request, Response } from "express";

import errorCodeToMessageMap from "../constants/errorMessages";
import subtaskService from "../services/subtaskService";
import ticketService from "../services/ticketService";
import ErrorResponse from "../utils/ErrorResponse";
import { TICKET_NOT_FOUND_ERROR } from "./ticket";

const SUBTASK_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["SUBTASK_NOT_FOUND"],
  "SUBTASK_NOT_FOUND",
  404,
);

export const createSubtask = async (request: Request, response: Response): Promise<void> => {
  const { ticketId, title } = request.body;

  const [ticket] = await ticketService.getTickets([ticketId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  const newSubtask = await subtaskService.createSubtask(ticketId, { title });
  response.status(201).send({ data: newSubtask });
};

export const updateSubtask = async (request: Request, response: Response): Promise<void> => {
  const { subtaskId } = request.params;
  const { title, isCompleted } = request.body;

  const [subtask] = await subtaskService.getSubtasks([subtaskId]);

  if (subtask == null) {
    throw SUBTASK_NOT_FOUND_ERROR;
  }

  await subtaskService.updateSubtask(subtaskId, {
    title,
    isCompleted,
  });
  response.sendStatus(204);
};

export const deleteSubtask = async (request: Request, response: Response): Promise<void> => {
  const { subtaskId } = request.params;

  const [subtask] = await subtaskService.getSubtasks([subtaskId]);

  if (subtask == null) {
    throw SUBTASK_NOT_FOUND_ERROR;
  }

  await subtaskService.deleteSubtask(subtaskId);
  response.sendStatus(204);
};

export const getSubtasks = async (request: Request, response: Response): Promise<void> => {
  const { subtaskIds } = request.body;

  const subtasks = await subtaskService.getSubtasks(subtaskIds);
  response.send({ data: subtasks });
};
