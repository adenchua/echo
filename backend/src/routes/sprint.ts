import { Router } from "express";

import { endSprint, getSprint, getSprints, startSprint } from "../controllers/sprint";
import {
  endSprintValidationChain,
  getSprintValidationChain,
  getSprintsValidationChain,
  startSprintValidationChain,
} from "../middlewares/sprintValidationMiddleware";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/start").post(startSprintValidationChain, validationErrorHandling, startSprint);
router.route("/end").post(endSprintValidationChain, validationErrorHandling, endSprint);
router.route("/id/:sprintId").get(getSprintValidationChain, validationErrorHandling, getSprint);
router.route("/bulk-retrieve").post(getSprintsValidationChain, validationErrorHandling, getSprints);

export default router;
