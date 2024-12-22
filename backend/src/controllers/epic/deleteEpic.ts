import { Request, Response } from "express";

import epicService from "../../services/epicService";
import { EPIC_NOT_FOUND_ERROR } from "./errors";

export default async function deleteEpic(request: Request, response: Response): Promise<void> {
  const { epicId } = request.params;

  const [epic] = await epicService.getEpics([epicId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  await epicService.deleteEpic(epicId);
  response.sendStatus(204);
}
