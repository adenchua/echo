const { Router } = require("express");

const { createSubtask, deleteSubtask, getSubtasks, updateSubtask } = require("../controllers/subtask");

const router = Router();

router.route("/").post(createSubtask);
router.route("/id/:subtaskId").delete(deleteSubtask);
router.route("/id/:subtaskId").patch(updateSubtask);
router.route("/bulk-retrieve").post(getSubtasks);

module.exports = router;
