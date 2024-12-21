import { Router } from "express";

import { endSprint, getSprint, getSprints, startSprint } from "../controllers/sprint";
import {
  endSprintValidationChain,
  getSprintValidationChain,
  getSprintsValidationChain,
  startSprintValidationChain,
} from "../middlewares/sprintValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/start").post(startSprintValidationChain, validationErrorMiddleware, startSprint);
router.route("/end").post(endSprintValidationChain, validationErrorMiddleware, endSprint);
router.route("/id/:sprintId").get(getSprintValidationChain, validationErrorMiddleware, getSprint);
router
  .route("/bulk-retrieve")
  .post(getSprintsValidationChain, validationErrorMiddleware, getSprints);

export default router;
