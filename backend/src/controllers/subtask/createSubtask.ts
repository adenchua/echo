import { Request, Response } from "express";

import subtaskService from "../../services/subtaskService";
import ticketService from "../../services/ticketService";
import { wrapResponse } from "../../utils/responseUtils";
import { TICKET_NOT_FOUND_ERROR } from "../ticket/errors";

export default async function createSubtask(request: Request, response: Response): Promise<void> {
  const { ticketId, title } = request.body;

  const [ticket] = await ticketService.getTickets([ticketId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  const newSubtask = await subtaskService.createSubtask(ticketId, { title });
  response.status(201).send(wrapResponse(newSubtask));
}
