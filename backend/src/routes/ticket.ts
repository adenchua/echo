import { Router } from "express";

import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket";
import {
  createTicketValidationChain,
  deleteTicketValidationChain,
  getTicketValidationChain,
  getTicketsValidationChain,
  updateTicketValidationChain,
} from "../middlewares/ticketValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/").post(createTicketValidationChain, validationErrorMiddleware, createTicket);
router
  .route("/id/:ticketId")
  .patch(updateTicketValidationChain, validationErrorMiddleware, updateTicket);
router
  .route("/id/:ticketId")
  .post(deleteTicketValidationChain, validationErrorMiddleware, deleteTicket);
router.route("/id/:ticketId").get(getTicketValidationChain, validationErrorMiddleware, getTicket);
router
  .route("/bulk-retrieve")
  .post(getTicketsValidationChain, validationErrorMiddleware, getTickets);

export default router;
