import { Request, Response } from "express";

import epicService from "../../services/epicService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getEpics(request: Request, response: Response): Promise<void> {
  const { epicIds } = request.body;

  const epics = await epicService.getEpics(epicIds);
  response.send(wrapResponse(epics));
}
