import { Router } from "express";

import { endSprint } from "../controllers/sprint/endSprint";
import { getSprint, getSprints } from "../controllers/sprint/getSprints";
import { startSprint } from "../controllers/sprint/startSprint";
import {
  projectIdIn,
  projectOf,
  requireProjectRole,
} from "../middlewares/projectAuthorizationMiddleware";
import {
  endSprintValidationChain,
  getSprintValidationChain,
  getSprintsValidationChain,
  startSprintValidationChain,
} from "../middlewares/sprintValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const sprintRouter = Router();

const projectFromBody = projectIdIn("body", "projectId");

sprintRouter
  .route("/start")
  .post(
    startSprintValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectFromBody),
    startSprint,
  );
sprintRouter
  .route("/end")
  .post(
    endSprintValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectFromBody, projectOf("sprint", "body", "sprintId")),
    endSprint,
  );
sprintRouter
  .route("/id/:sprintId")
  .get(
    getSprintValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("sprint", "params", "sprintId")),
    getSprint,
  );
sprintRouter
  .route("/bulk-retrieve")
  .post(
    getSprintsValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("sprint", "body", "sprintIds")),
    getSprints,
  );

export default sprintRouter;
