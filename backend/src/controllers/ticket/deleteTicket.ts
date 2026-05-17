import { Request, Response } from "express";

import ticketService from "../../services/ticketService";
import { TICKET_NOT_FOUND_ERROR } from "./errors";

export default async function deleteTicket(request: Request, response: Response): Promise<void> {
  const { ticketId } = request.params as Record<string, string>;

  const [ticket] = await ticketService.getTickets([ticketId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  await ticketService.deleteTicket(ticketId);
  response.sendStatus(204);
}
