import { Request, Response } from "express";

import projectService from "../../services/projectService";
import ticketService from "../../services/ticketService";
import { isProjectDeleted } from "../../utils/projectUtils";
import { PROJECT_NOT_FOUND_ERROR } from "../project/errors";
import { wrapResponse } from "../../utils/responseUtils";

export default async function createTicket(request: Request, response: Response): Promise<void> {
  const { title, projectId, priority, type } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const newTicket = await ticketService.createTicket(projectId, { title, priority, type });
  response.status(201).send(wrapResponse(newTicket));
}
