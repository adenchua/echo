import epicService from "../services/epicService.js";
import projectService from "../services/projectService.js";
import { NO_PROJECT_ERROR } from "./project.js";

export const createEpic = async (req, res, next) => {
  const { title, projectId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (project == null) {
      throw NO_PROJECT_ERROR;
    }

    const epic = await epicService.createEpic(projectId, { title });
    res.status(201).send(epic);
  } catch (error) {
    next(error);
  }
};

export const updateEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { title, description } = req.body;

  try {
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
    res.send(epics);
  } catch (error) {
    next(error);
  }
};

export const addTicketToEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  try {
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
    await epicService.removeTicketFromEpic(ticketId, epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteEpic = async (req, res, next) => {
  const { epicId } = req.params;

  try {
    await epicService.deleteEpic(epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
