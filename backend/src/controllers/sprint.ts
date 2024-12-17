import { Request, Response } from "express";
import { Types } from "mongoose";

import errorCodeToMessageMap from "../constants/errorMessages";
import projectService from "../services/projectService";
import sprintService from "../services/sprintService";
import ErrorResponse from "../utils/ErrorResponse";
import { isProjectDeleted } from "../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./project";

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
  404,
);

export const startSprint = async (request: Request, response: Response): Promise<void> => {
  const { projectId, endDateISOString } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const projectSprints = await sprintService.getSprints(project!.sprintIds as Types.ObjectId[]);
  if (!projectSprints.every((sprint) => sprint.hasEnded)) {
    // already has active sprint
    throw EXISTING_ACTIVE_SPRINT_ERROR;
  }

  const sprintNumber = project!.sprintIds.length + 1;
  const newSprint = await sprintService.startSprint(projectId, {
    number: sprintNumber,
    endDate: endDateISOString,
  });
  response.status(201).send({ data: newSprint });
};

export const endSprint = async (request: Request, response: Response): Promise<void> => {
  const { sprintId, projectId } = request.body;

  const [sprint] = await sprintService.getSprints([sprintId]);
  const project = await projectService.getProject(projectId);

  if (sprint == null) {
    throw SPRINT_NOT_EXIST_ERROR;
  }

  if (sprint.hasEnded) {
    throw NO_ACTIVE_SPRINT_ERROR;
  }

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const endedSprint = await sprintService.endSprint(sprintId, projectId);
  response.send({ data: endedSprint });
};

export const getSprints = async (request: Request, response: Response): Promise<void> => {
  const { sprintIds } = request.body;

  const sprints = await sprintService.getSprints(sprintIds);
  response.send({ data: sprints });
};

export const getSprint = async (request: Request, response: Response): Promise<void> => {
  const { sprintId } = request.params;

  const [sprint] = await sprintService.getSprints([sprintId as unknown as Types.ObjectId]);

  if (sprint == null) {
    throw SPRINT_NOT_EXIST_ERROR;
  }

  response.send({ data: sprint });
};
