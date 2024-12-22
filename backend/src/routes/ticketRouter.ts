import { Router } from "express";

import createTicket from "../controllers/ticket/createTicket";
import deleteTicket from "../controllers/ticket/deleteTicket";
import getTicket from "../controllers/ticket/getTicket";
import getTickets from "../controllers/ticket/getTickets";
import updateTicket from "../controllers/ticket/updateTicket";
import {
  createTicketValidationChain,
  deleteTicketValidationChain,
  getTicketValidationChain,
  getTicketsValidationChain,
  updateTicketValidationChain,
} from "../middlewares/ticketValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const ticketRouter = Router();

ticketRouter.route("/").post(createTicketValidationChain, validationErrorMiddleware, createTicket);
ticketRouter
  .route("/id/:ticketId")
  .patch(updateTicketValidationChain, validationErrorMiddleware, updateTicket);
ticketRouter
  .route("/id/:ticketId")
  .post(deleteTicketValidationChain, validationErrorMiddleware, deleteTicket);
ticketRouter
  .route("/id/:ticketId")
  .get(getTicketValidationChain, validationErrorMiddleware, getTicket);
ticketRouter
  .route("/bulk-retrieve")
  .post(getTicketsValidationChain, validationErrorMiddleware, getTickets);

export default ticketRouter;
