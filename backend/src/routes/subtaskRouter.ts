import { Router } from "express";

import createSubtask from "../controllers/subtask/createSubtask";
import deleteSubtask from "../controllers/subtask/deleteSubtask";
import getSubtasks from "../controllers/subtask/getSubtasks";
import updateSubtask from "../controllers/subtask/updateSubtask";
import {
  createSubtaskValidationChain,
  deleteSubtaskValidationChain,
  getSubtasksValidationChain,
  updateSubtaskValidationChain,
} from "../middlewares/subtaskValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const subtaskRouter = Router();

subtaskRouter
  .route("/")
  .post(createSubtaskValidationChain, validationErrorMiddleware, createSubtask);
subtaskRouter
  .route("/id/:subtaskId")
  .delete(deleteSubtaskValidationChain, validationErrorMiddleware, deleteSubtask);
subtaskRouter
  .route("/id/:subtaskId")
  .patch(updateSubtaskValidationChain, validationErrorMiddleware, updateSubtask);
subtaskRouter
  .route("/bulk-retrieve")
  .post(getSubtasksValidationChain, validationErrorMiddleware, getSubtasks);

export default subtaskRouter;
