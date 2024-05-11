import errorCodeToMessageMap from "../constants/errorMessages.js";
import epicService from "../services/epicService.js";
import projectService from "../services/projectService.js";
import ticketService from "../services/ticketService.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isProjectDeleted } from "../utils/projectUtils.js";
import { PROJECT_NOT_FOUND_ERROR } from "./project.js";
import { TICKET_NOT_FOUND_ERROR } from "./ticket.js";

const EPIC_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["EPIC_NOT_FOUND"],
  "EPIC_NOT_FOUND",
  404,
);

export const createEpic = async (req, res, next) => {
  const { title, projectId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    const epic = await epicService.createEpic(projectId, { title });
    res.status(201).send({ data: epic });
  } catch (error) {
    next(error);
  }
};

export const updateEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { title, description } = req.body;

  try {
    const [epic] = await epicService.getEpics([epicId]);

    if (epic == null) {
      throw EPIC_NOT_FOUND_ERROR;
    }

    await epicService.updateEpic(epicId, { title, description });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getEpics = async (req, res, next) => {
  const { epicIds } = req.body;

  try {
    const epics = await epicService.getEpics(epicIds);
    res.send({ data: epics });
  } catch (error) {
    next(error);
  }
};

export const addTicketToEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  try {
    const [epic] = await epicService.getEpics([epicId]);
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (epic == null) {
      throw EPIC_NOT_FOUND_ERROR;
    }

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    await epicService.addTicketToEpic(ticketId, epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeTicketFromEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  try {
    const [epic] = await epicService.getEpics([epicId]);
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (epic == null) {
      throw EPIC_NOT_FOUND_ERROR;
    }

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    await epicService.removeTicketFromEpic(ticketId, epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteEpic = async (req, res, next) => {
  const { epicId } = req.params;

  try {
    const [epic] = await epicService.getEpics([epicId]);

    if (epic == null) {
      throw EPIC_NOT_FOUND_ERROR;
    }

    await epicService.deleteEpic(epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
