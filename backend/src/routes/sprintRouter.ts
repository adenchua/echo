import { Router } from "express";

import { endSprint } from "../controllers/sprint/endSprint";
import { getSprint, getSprints } from "../controllers/sprint/getSprints";
import { startSprint } from "../controllers/sprint/startSprint";
import {
  endSprintValidationChain,
  getSprintValidationChain,
  getSprintsValidationChain,
  startSprintValidationChain,
} from "../middlewares/sprintValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const sprintRouter = Router();

sprintRouter
  .route("/start")
  .post(startSprintValidationChain, validationErrorMiddleware, startSprint);
sprintRouter.route("/end").post(endSprintValidationChain, validationErrorMiddleware, endSprint);
sprintRouter
  .route("/id/:sprintId")
  .get(getSprintValidationChain, validationErrorMiddleware, getSprint);
sprintRouter
  .route("/bulk-retrieve")
  .post(getSprintsValidationChain, validationErrorMiddleware, getSprints);

export default sprintRouter;
