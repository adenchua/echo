import errorCodeToMessageMap from "../constants/errorMessages.js";
import projectService from "../services/projectService.js";
import ticketService from "../services/ticketService.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isProjectDeleted } from "../utils/projectUtils.js";
import { PROJECT_NOT_FOUND_ERROR } from "./project.js";

export const TICKET_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["TICKET_NOT_FOUND"],
  "TICKET_NOT_FOUND",
  404,
);

export const createTicket = async (req, res, next) => {
  const { title, projectId, priority, type } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    const newTicket = await ticketService.createTicket(projectId, { title, priority, type });
    res.status(201).send({ data: newTicket });
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  const { ticketId } = req.params;
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
  } = req.body;

  try {
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    await ticketService.updateTicket(ticketId, {
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

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  const { ticketId } = req.params;

  try {
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    await ticketService.deleteTicket(ticketId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  const { ticketIds } = req.body;

  try {
    const tickets = await ticketService.getTickets(ticketIds);
    res.send({ data: tickets });
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  const { ticketId } = req.params;

  try {
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    res.send({ data: ticket });
  } catch (error) {
    next(error);
  }
};
