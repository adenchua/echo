import { Router } from "express";

import { createSubtask, deleteSubtask, getSubtasks, updateSubtask } from "../controllers/subtask";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware";
import {
  createSubtaskValidationChain,
  deleteSubtaskValidationChain,
  getSubtasksValidationChain,
  updateSubtaskValidationChain,
} from "../middlewares/subtaskValidationMiddleware";

const router = Router();

router.route("/").post(createSubtaskValidationChain, validationErrorHandling, createSubtask);
router
  .route("/id/:subtaskId")
  .delete(deleteSubtaskValidationChain, validationErrorHandling, deleteSubtask);
router
  .route("/id/:subtaskId")
  .patch(updateSubtaskValidationChain, validationErrorHandling, updateSubtask);
router
  .route("/bulk-retrieve")
  .post(getSubtasksValidationChain, validationErrorHandling, getSubtasks);

export default router;
