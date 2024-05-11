import { Router } from "express";

import { endSprint, getSprint, getSprints, startSprint } from "../controllers/sprint.js";
import {
  endSprintValidationChain,
  getSprintValidationChain,
  getSprintsValidationChain,
  startSprintValidationChain,
} from "../middlewares/sprintValidationMiddleware.js";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware.js";

const router = Router();

router.route("/start").post(startSprintValidationChain, validationErrorHandling, startSprint);
router.route("/end").post(endSprintValidationChain, validationErrorHandling, endSprint);
router.route("/id/:sprintId").get(getSprintValidationChain, validationErrorHandling, getSprint);
router.route("/bulk-retrieve").post(getSprintsValidationChain, validationErrorHandling, getSprints);

export default router;
