const { Router } = require("express");

const {
  addAssigneeToStory,
  createStory,
  deleteStory,
  getStories,
  getStory,
  removeAssigneeFromStory,
  updateStory,
} = require("../controllers/story");

const router = Router();

router.route("/").post(createStory);
router.route("/id/:storyId").patch(updateStory);
router.route("/id/:storyId").delete(deleteStory);
router.route("/id/:storyId").get(getStory);
router.route("/bulk-retrieve").post(getStories);
router.route("/assignees/:storyId").post(addAssigneeToStory);
router.route("/assignees/:storyId").delete(removeAssigneeFromStory);

module.exports = router;
