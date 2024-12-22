import { Request, Response } from "express";

import subtaskService from "../../services/subtaskService";
import { SUBTASK_NOT_FOUND_ERROR } from "./errors";

export default async function deleteSubtask(request: Request, response: Response): Promise<void> {
  const { subtaskId } = request.params;

  const [subtask] = await subtaskService.getSubtasks([subtaskId]);

  if (subtask == null) {
    throw SUBTASK_NOT_FOUND_ERROR;
  }

  await subtaskService.deleteSubtask(subtaskId);
  response.sendStatus(204);
}
