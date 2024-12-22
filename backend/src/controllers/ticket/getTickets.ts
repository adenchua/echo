import { Request, Response } from "express";

import ticketService from "../../services/ticketService";
import { wrapResponse } from "../../utils/responseUtils";

export default async function getTickets(request: Request, response: Response): Promise<void> {
  const { ticketIds } = request.body;

  const tickets = await ticketService.getTickets(ticketIds);
  response.send(wrapResponse(tickets));
}
