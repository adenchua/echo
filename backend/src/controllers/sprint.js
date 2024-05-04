import errorCodeToMessageMap from "../constants/errorMessages.js";
import projectService from "../services/projectService.js";
import sprintService from "../services/sprintService.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { NO_PROJECT_ERROR } from "./project.js";

const EXISTING_ACTIVE_SPRINT_ERROR = new ErrorResponse(
  errorCodeToMessageMap["EXISTING_ACTIVE_SPRINT"],
  "EXISTING_ACTIVE_SPRINT",
  400,
);

const NO_ACTIVE_SPRINT_ERROR = new ErrorResponse(
  errorCodeToMessageMap["NO_ACTIVE_SPRINT"],
  "NO_ACTIVE_SPRINT",
  400,
);

const SPRINT_NOT_EXIST_ERROR = new ErrorResponse(
  errorCodeToMessageMap["SPRINT_NOT_FOUND"],
  "SPRINT_NOT_FOUND",
  400,
);

export const startSprint = async (req, res, next) => {
  const { projectId, endDateISOString } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (project == null || project.isDeleted) {
      throw NO_PROJECT_ERROR;
    }

    const projectSprints = await sprintService.getSprints(project.sprintIds);
    if (!projectSprints.every((sprint) => sprint.hasEnded)) {
      // already has active sprint
      throw EXISTING_ACTIVE_SPRINT_ERROR;
    }

    const sprintNumber = project.sprintIds.length + 1;
    const newSprint = await sprintService.startSprint(projectId, {
      number: sprintNumber,
      endDate: endDateISOString,
    });
    res.status(201).send(newSprint);
  } catch (error) {
    next(error);
  }
};

export const endSprint = async (req, res, next) => {
  const { sprintId, projectId } = req.body;

  try {
    const sprint = await sprintService.getSprints([sprintId]);
    const project = await projectService.getProject(projectId);

    if (sprint == null) {
      throw SPRINT_NOT_EXIST_ERROR;
    }

    if (sprint.hasEnded) {
      throw NO_ACTIVE_SPRINT_ERROR;
    }

    if (project == null || project.isDeleted) {
      throw NO_PROJECT_ERROR;
    }

    const endedSprint = await sprintService.endSprint(sprintId, projectId);
    res.send(endedSprint);
  } catch (error) {
    next(error);
  }
};

export const getSprints = async (req, res, next) => {
  const { sprintIds } = req.body;

  try {
    const sprints = await sprintService.getSprints(sprintIds);
    res.send(sprints);
  } catch (error) {
    next(error);
  }
};

export const getSprint = async (req, res, next) => {
  const { sprintId } = req.params;

  try {
    const [sprint] = await sprintService.getSprints([sprintId]);
    res.send(sprint);
  } catch (error) {
    next(error);
  }
};
