import { Router } from "express";

import { createSubtask, deleteSubtask, getSubtasks, updateSubtask } from "../controllers/subtask.js";

const router = Router();

router.route("/").post(createSubtask);
router.route("/id/:subtaskId").delete(deleteSubtask);
router.route("/id/:subtaskId").patch(updateSubtask);
router.route("/bulk-retrieve").post(getSubtasks);

export default router;
