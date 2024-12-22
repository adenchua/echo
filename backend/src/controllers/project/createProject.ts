import { Request, Response } from "express";

import projectService from "../../services/projectService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function createProject(request: Request, response: Response): Promise<void> {
  const { title, adminId, type } = request.body;

  const newProject = await projectService.createProject({ title, adminIds: [adminId], type });
  response.status(201).send(wrapResponse(newProject));
}
