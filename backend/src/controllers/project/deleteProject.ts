import { Request, Response } from "express";

import projectService from "../../services/projectService";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./errors";

export default async function deleteProject(request: Request, response: Response): Promise<void> {
  const { projectId } = request.params;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.deleteProject(projectId);
  response.sendStatus(204);
}
