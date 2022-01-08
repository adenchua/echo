const { Router } = require("express");

const { createTicket, deleteTicket, getTickets, getTicket, updateTicket } = require("../controllers/ticket");

const router = Router();

router.route("/").post(createTicket);
router.route("/id/:ticketId").patch(updateTicket);
router.route("/id/:ticketId").post(deleteTicket);
router.route("/id/:ticketId").get(getTicket);
router.route("/bulk-retrieve").post(getTickets);

module.exports = router;
