import { Router } from "express";

import { endSprint, getSprint, getSprints, startSprint } from "../controllers/sprint.js";

const router = Router();

router.route("/start").post(startSprint);
router.route("/end").post(endSprint);
router.route("/id/:sprintId").get(getSprint);
router.route("/bulk-retrieve").post(getSprints);

export default router;
