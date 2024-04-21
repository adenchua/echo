import { Router } from "express";

import { createTicket, deleteTicket, getTickets, getTicket, updateTicket } from "../controllers/ticket.js";

const router = Router();

router.route("/").post(createTicket);
router.route("/id/:ticketId").patch(updateTicket);
router.route("/id/:ticketId").post(deleteTicket);
router.route("/id/:ticketId").get(getTicket);
router.route("/bulk-retrieve").post(getTickets);

export default router;
