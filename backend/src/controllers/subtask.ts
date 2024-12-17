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

export const createSubtask = async (req, res, next) => {
  const { ticketId, title } = req.body;

  try {
    const [ticket] = await ticketService.getTickets([ticketId]);

    if (ticket == null) {
      throw TICKET_NOT_FOUND_ERROR;
    }

    const newSubtask = await subtaskService.createSubtask(ticketId, { title });
    res.status(201).send({ data: newSubtask });
  } catch (error) {
    next(error);
  }
};

export const updateSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;
  const { title, isCompleted } = req.body;

  try {
    const [subtask] = await subtaskService.getSubtasks([subtaskId]);

    if (subtask == null) {
      throw SUBTASK_NOT_FOUND_ERROR;
    }

    await subtaskService.updateSubtask(subtaskId, { title, isCompleted });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;

  try {
    const [subtask] = await subtaskService.getSubtasks([subtaskId]);

    if (subtask == null) {
      throw SUBTASK_NOT_FOUND_ERROR;
    }

    await subtaskService.deleteSubtask(subtaskId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getSubtasks = async (req, res, next) => {
  const { subtaskIds } = req.body;

  try {
    const subtasks = await subtaskService.getSubtasks(subtaskIds);
    res.send({ data: subtasks });
  } catch (error) {
    next(error);
  }
};
