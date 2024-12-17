import { Request, Response } from "express";
import { Types } from "mongoose";

import errorCodeToMessageMap from "../constants/errorMessages";
import projectService from "../services/projectService";
import ticketService from "../services/ticketService";
import ErrorResponse from "../utils/ErrorResponse";
import { isProjectDeleted } from "../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./project";

export const TICKET_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["TICKET_NOT_FOUND"],
  "TICKET_NOT_FOUND",
  404,
);

export const createTicket = async (request: Request, response: Response): Promise<void> => {
  const { title, projectId, priority, type } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const newTicket = await ticketService.createTicket(projectId, { title, priority, type });
  response.status(201).send({ data: newTicket });
};

export const updateTicket = async (request: Request, response: Response): Promise<void> => {
  const { ticketId } = request.params;
  const {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  } = request.body;

  const [ticket] = await ticketService.getTickets([ticketId as unknown as Types.ObjectId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await ticketService.updateTicket(ticketId as unknown as Types.ObjectId, {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  });

  response.sendStatus(204);
};

export const deleteTicket = async (request: Request, response: Response): Promise<void> => {
  const { ticketId } = request.params;

  const [ticket] = await ticketService.getTickets([ticketId as unknown as Types.ObjectId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await ticketService.deleteTicket(ticketId as unknown as Types.ObjectId);
  response.sendStatus(204);
};

export const getTickets = async (request: Request, response: Response): Promise<void> => {
  const { ticketIds } = request.body;

  const tickets = await ticketService.getTickets(ticketIds);
  response.send({ data: tickets });
};

export const getTicket = async (request: Request, response: Response): Promise<void> => {
  const { ticketId } = request.params;

  const [ticket] = await ticketService.getTickets([ticketId as unknown as Types.ObjectId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  response.send({ data: ticket });
};
