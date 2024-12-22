import { Request, Response } from "express";

import errorCodeToMessageMap from "../../constants/errorMessages";
import projectService from "../../services/projectService";
import ErrorResponse from "../../utils/ErrorResponse";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "./errors";

export default async function demoteAdminToMember(
  request: Request,
  response: Response,
): Promise<void> {
  const { projectId } = request.params;
  const { userId } = request.body;

  const project = await projectService.getProject(projectId);

  if (!project || isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  if (project.adminIds.length <= 1) {
    throw new ErrorResponse(
      errorCodeToMessageMap["LAST_PROJECT_ADMINISTRATOR"],
      "LAST_PROJECT_ADMINISTRATOR",
      400,
    );
  }

  await projectService.demoteAdminToMember(userId, projectId);
  response.sendStatus(204);
}
