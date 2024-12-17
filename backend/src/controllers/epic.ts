import { Request, Response } from "express";
import { Types } from "mongoose";

import errorCodeToMessageMap from "../constants/errorMessages";
import epicService from "../services/epicService";
import projectService from "../services/projectService";
import ticketService from "../services/ticketService";
import ErrorResponse from "../utils/ErrorResponse";
import { isProjectDeleted } from "../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./project";
import { TICKET_NOT_FOUND_ERROR } from "./ticket";

const EPIC_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["EPIC_NOT_FOUND"],
  "EPIC_NOT_FOUND",
  404,
);

export const createEpic = async (request: Request, response: Response): Promise<void> => {
  const { title, projectId } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const epic = await epicService.createEpic(projectId, { title });
  response.status(201).send({ data: epic });
};

export const updateEpic = async (request: Request, response: Response): Promise<void> => {
  const { epicId } = request.params;
  const { title, description } = request.body;

  const [epic] = await epicService.getEpics([epicId as unknown as Types.ObjectId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  await epicService.updateEpic(epicId as unknown as Types.ObjectId, { title, description });
  response.sendStatus(204);
};

export const getEpics = async (request: Request, response: Response): Promise<void> => {
  const { epicIds } = request.body;

  const epics = await epicService.getEpics(epicIds);
  response.send({ data: epics });
};

export const addTicketToEpic = async (request: Request, response: Response): Promise<void> => {
  const { epicId } = request.params;
  const { ticketId } = request.body;

  const [epic] = await epicService.getEpics([epicId as unknown as Types.ObjectId]);
  const [ticket] = await ticketService.getTickets([ticketId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await epicService.addTicketToEpic(ticketId, epicId as unknown as Types.ObjectId);
  response.sendStatus(204);
};

export const removeTicketFromEpic = async (request: Request, response: Response): Promise<void> => {
  const { epicId } = request.params;
  const { ticketId } = request.body;

  const [epic] = await epicService.getEpics([epicId as unknown as Types.ObjectId]);
  const [ticket] = await ticketService.getTickets([ticketId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await epicService.removeTicketFromEpic(ticketId, epicId as unknown as Types.ObjectId);
  response.sendStatus(204);
};

export const deleteEpic = async (request: Request, response: Response): Promise<void> => {
  const { epicId } = request.params;

  const [epic] = await epicService.getEpics([epicId as unknown as Types.ObjectId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  await epicService.deleteEpic(epicId as unknown as Types.ObjectId);
  response.sendStatus(204);
};
