const { Router } = require("express");

const {
  addTicketToEpic,
  createEpic,
  getEpics,
  removeTicketFromEpic,
  updateEpic,
  deleteEpic,
} = require("../controllers/epic");

const router = Router();

router.route("/").post(createEpic);
router.route("/id/:epicId").patch(updateEpic);
router.route("/id/:epicId").delete(deleteEpic);
router.route("/bulk-retrieve").post(getEpics);
router.route("/add-ticket/:epicId").post(addTicketToEpic);
router.route("/remove-ticket/:epicId").post(removeTicketFromEpic);

module.exports = router;
