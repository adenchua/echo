import { Request, Response } from "express";

import projectService from "../../services/projectService";
import sprintService from "../../services/sprintService";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "../project/errors";
import { SPRINT_NOT_EXIST_ERROR, NO_ACTIVE_SPRINT_ERROR } from "./errors";
import { wrapResponse } from "../../utils/responseUtils";

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
  response.send(wrapResponse(endedSprint));
};
