import { Request, Response } from "express";

import ticketService from "../../services/ticketService";
import { TICKET_NOT_FOUND_ERROR } from "./errors";

export default async function updateTicket(request: Request, response: Response): Promise<void> {
  const { ticketId } = request.params;
  const {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  } = request.body;

  const [ticket] = await ticketService.getTickets([ticketId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await ticketService.updateTicket(ticketId, {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  });

  response.sendStatus(204);
}
