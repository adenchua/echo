const { Router } = require("express");

const {
  addStoryToEpic,
  createEpic,
  getEpics,
  removeStoryFromEpic,
  updateEpic,
  deleteEpic,
} = require("../controllers/epic");

const router = Router();

router.route("/").post(createEpic);
router.route("/id/:epicId").patch(updateEpic);
router.route("/id/:epicId").delete(deleteEpic);
router.route("/bulk-retrieve").post(getEpics);
router.route("/story/:epicId").post(addStoryToEpic);
router.route("/story/:epicId").delete(removeStoryFromEpic);

module.exports = router;
