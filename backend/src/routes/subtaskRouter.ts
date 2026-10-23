import { Router } from "express";

import createSubtask from "../controllers/subtask/createSubtask";
import deleteSubtask from "../controllers/subtask/deleteSubtask";
import getSubtasks from "../controllers/subtask/getSubtasks";
import updateSubtask from "../controllers/subtask/updateSubtask";
import { projectOf, requireProjectRole } from "../middlewares/projectAuthorizationMiddleware";
import {
  createSubtaskValidationChain,
  deleteSubtaskValidationChain,
  getSubtasksValidationChain,
  updateSubtaskValidationChain,
} from "../middlewares/subtaskValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const subtaskRouter = Router();

const subtaskFromParams = projectOf("subtask", "params", "subtaskId");

subtaskRouter
  .route("/")
  .post(
    createSubtaskValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("ticket", "body", "ticketId")),
    createSubtask,
  );
subtaskRouter
  .route("/id/:subtaskId")
  .delete(
    deleteSubtaskValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", subtaskFromParams),
    deleteSubtask,
  );
subtaskRouter
  .route("/id/:subtaskId")
  .patch(
    updateSubtaskValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", subtaskFromParams),
    updateSubtask,
  );
subtaskRouter
  .route("/bulk-retrieve")
  .post(
    getSubtasksValidationChain,
    validationErrorMiddleware,
    requireProjectRole("member", projectOf("subtask", "body", "subtaskIds")),
    getSubtasks,
  );

export default subtaskRouter;
