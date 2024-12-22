import { Request, Response } from "express";

import epicService from "../../services/epicService";
import ticketService from "../../services/ticketService";
import { TICKET_NOT_FOUND_ERROR } from "../ticket/errors";
import { EPIC_NOT_FOUND_ERROR } from "./errors";

export default async function removeTicketFromEpic(
  request: Request,
  response: Response,
): Promise<void> {
  const { epicId } = request.params;
  const { ticketId } = request.body;

  const [epic] = await epicService.getEpics([epicId]);
  const [ticket] = await ticketService.getTickets([ticketId]);

  if (epic == null) {
    throw EPIC_NOT_FOUND_ERROR;
  }

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await epicService.removeTicketFromEpic(ticketId, epicId);
  response.sendStatus(204);
}
