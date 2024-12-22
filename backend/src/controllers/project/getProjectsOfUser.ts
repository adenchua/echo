import { Request, Response } from "express";

import projectService from "../../services/projectService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getProjectsOfUser(
  request: Request,
  response: Response,
): Promise<void> {
  const { userId } = request.params;

  const projects = await projectService.getProjectsOfUser(userId);
  response.send(wrapResponse(projects));
}
