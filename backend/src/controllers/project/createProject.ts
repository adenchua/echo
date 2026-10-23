import { Request, Response } from "express";
import { Types } from "mongoose";

import { UNAUTHENTICATED_ERROR } from "../../errors/authErrors";
import projectService from "../../services/projectService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function createProject(request: Request, response: Response): Promise<void> {
  const { title, type } = request.body;

  if (!request.user) {
    throw UNAUTHENTICATED_ERROR;
  }

  // the logged-in user becomes the first administrator of the project
  const adminId = new Types.ObjectId(request.user.id);
  const newProject = await projectService.createProject({ title, adminIds: [adminId], type });
  response.status(201).send(wrapResponse(newProject));
}
