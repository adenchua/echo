import { Router } from "express";

import createTicket from "../controllers/ticket/createTicket";
import deleteTicket from "../controllers/ticket/deleteTicket";
import getTicket from "../controllers/ticket/getTicket";
import getTickets from "../controllers/ticket/getTickets";
import updateTicket from "../controllers/ticket/updateTicket";
import {
  projectIdIn,
  projectOf,
  requireProjectRole,
} from "../middlewares/projectAuthorizationMiddleware";
import {
  createTicketValidationChain,
  deleteTicketValidationChain,
  getTicketValidationChain,
  getTicketsValidationChain,
  updateTicketValidationChain,
} from "../middlewares/ticketValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const ticketRouter = Router();

const ticketFromParams = projectOf("ticket", "params", "ticketId");

ticketRouter
  .route("/")
  .post(
    createTicketValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectIdIn("body", "projectId")),
    createTicket,
  );
ticketRouter
  .route("/id/:ticketId")
  .patch(
    updateTicketValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", ticketFromParams),
    updateTicket,
  );
ticketRouter
  .route("/id/:ticketId")
  .post(
    deleteTicketValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", ticketFromParams, projectIdIn("body", "projectId")),
    deleteTicket,
  );
ticketRouter
  .route("/id/:ticketId")
  .get(
    getTicketValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", ticketFromParams),
    getTicket,
  );
ticketRouter
  .route("/bulk-retrieve")
  .post(
    getTicketsValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("ticket", "body", "ticketIds")),
    getTickets,
  );

export default ticketRouter;
