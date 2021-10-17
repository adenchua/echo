const { Router } = require("express");

const { addBacklogToSprint, endSprint, getSprint, getSprints, startSprint } = require("../controllers/sprint");

const router = Router();

router.route("/start").post(startSprint);
router.route("/end").post(endSprint);
router.route("/id/:sprintId").get(getSprint);
router.route("/bulk-retrieve").post(getSprints);
router.route("/story/:sprintId").post(addBacklogToSprint);

module.exports = router;
