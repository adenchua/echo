import { Request, Response } from "express";

import { FORBIDDEN_ERROR } from "../../errors/authErrors";
import projectService from "../../services/projectService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getProjectsOfUser(
  request: Request,
  response: Response,
): Promise<void> {
  const { userId } = request.params as Record<string, string>;

  // users can only list their own projects
  if (userId !== request.user?.id) {
    throw FORBIDDEN_ERROR;
  }

  const projects = await projectService.getProjectsOfUser(userId);
  response.send(wrapResponse(projects));
}
