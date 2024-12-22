import { Request, Response } from "express";

import projectService from "../../services/projectService";
import sprintService from "../../services/sprintService";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "../project/errors";
import { EXISTING_ACTIVE_SPRINT_ERROR } from "./errors";
import { wrapResponse } from "../../utils/responseUtils";

export const startSprint = async (request: Request, response: Response): Promise<void> => {
  const { projectId, endDateISOString } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const sprintIds = project!.sprintIds.map((sprintId) => sprintId.toHexString());

  const projectSprints = await sprintService.getSprints(sprintIds);
  if (!projectSprints.every((sprint) => sprint.hasEnded)) {
    // already has active sprint
    throw EXISTING_ACTIVE_SPRINT_ERROR;
  }

  const sprintNumber = project!.sprintIds.length + 1;
  const newSprint = await sprintService.startSprint(projectId, {
    number: sprintNumber,
    endDate: endDateISOString,
  });
  response.status(201).send(wrapResponse(newSprint));
};
