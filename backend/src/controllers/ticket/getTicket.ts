import { Request, Response } from "express";

import ticketService from "../../services/ticketService";
import { TICKET_NOT_FOUND_ERROR } from "./errors";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getTicket(request: Request, response: Response): Promise<void> {
  const { ticketId } = request.params as Record<string, string>;

  const [ticket] = await ticketService.getTickets([ticketId]);

  if (ticket == null) {
    throw TICKET_NOT_FOUND_ERROR;
  }

  response.send(wrapResponse(ticket));
}
