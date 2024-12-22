import { Request, Response } from "express";

import sprintService from "../../services/sprintService";
import { SPRINT_NOT_EXIST_ERROR } from "./errors";
import { wrapResponse } from "../../utils/responseUtils";

export const getSprints = async (request: Request, response: Response): Promise<void> => {
  const { sprintIds } = request.body;

  const sprints = await sprintService.getSprints(sprintIds);
  response.send({ data: sprints });
};

export const getSprint = async (request: Request, response: Response): Promise<void> => {
  const { sprintId } = request.params;

  const [sprint] = await sprintService.getSprints([sprintId]);

  if (sprint == null) {
    throw SPRINT_NOT_EXIST_ERROR;
  }

  response.send(wrapResponse(sprint));
};
