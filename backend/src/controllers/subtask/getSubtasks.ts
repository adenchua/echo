import { Request, Response } from "express";

import subtaskService from "../../services/subtaskService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getSubtasks(request: Request, response: Response): Promise<void> {
  const { subtaskIds } = request.body;

  const subtasks = await subtaskService.getSubtasks(subtaskIds);
  response.send(wrapResponse(subtasks));
}
