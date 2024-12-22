import { Request, Response } from "express";

import epicService from "../../services/epicService";
import projectService from "../../services/projectService";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "../project/errors";
import { wrapResponse } from "../../utils/responseUtils";

export default async function createEpic(request: Request, response: Response): Promise<void> {
  const { title, projectId } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const epic = await epicService.createEpic(projectId, { title });
  response.status(201).send(wrapResponse(epic));
}
