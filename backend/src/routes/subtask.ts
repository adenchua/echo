import { Router } from "express";

import { createSubtask, deleteSubtask, getSubtasks, updateSubtask } from "../controllers/subtask";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";
import {
  createSubtaskValidationChain,
  deleteSubtaskValidationChain,
  getSubtasksValidationChain,
  updateSubtaskValidationChain,
} from "../middlewares/subtaskValidationMiddleware";

const router = Router();

router.route("/").post(createSubtaskValidationChain, validationErrorMiddleware, createSubtask);
router
  .route("/id/:subtaskId")
  .delete(deleteSubtaskValidationChain, validationErrorMiddleware, deleteSubtask);
router
  .route("/id/:subtaskId")
  .patch(updateSubtaskValidationChain, validationErrorMiddleware, updateSubtask);
router
  .route("/bulk-retrieve")
  .post(getSubtasksValidationChain, validationErrorMiddleware, getSubtasks);

export default router;
