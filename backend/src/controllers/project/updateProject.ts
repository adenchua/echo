import { Request, Response } from "express";

import projectService from "../../services/projectService";
import objectUtils from "../../utils/objectUtils";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./errors";

export default async function updateProject(request: Request, response: Response): Promise<void> {
  const { projectId } = request.params;
  const { title, description, announcement, picture, type } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    announcement,
    picture,
    type,
  });

  await projectService.updateProject(projectId, definedKeys);
  response.sendStatus(204);
}
