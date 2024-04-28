import { Router } from "express";

import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.js";
import {
  createTicketValidationChain,
  deleteTicketValidationChain,
  getTicketValidationChain,
  getTicketsValidationChain,
  updateTicketValidationChain,
} from "../middlewares/ticketValidationMiddleware.js";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware.js";

const router = Router();

router.route("/").post(createTicketValidationChain, validationErrorHandling, createTicket);
router
  .route("/id/:ticketId")
  .patch(updateTicketValidationChain, validationErrorHandling, updateTicket);
router
  .route("/id/:ticketId")
  .post(deleteTicketValidationChain, validationErrorHandling, deleteTicket);
router.route("/id/:ticketId").get(getTicketValidationChain, validationErrorHandling, getTicket);
router.route("/bulk-retrieve").post(getTicketsValidationChain, validationErrorHandling, getTickets);

export default router;
