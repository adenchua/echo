const { Router } = require("express");

const { createStory, deleteStory, getStories, getStory, updateStory } = require("../controllers/story");

const router = Router();

router.route("/").post(createStory);
router.route("/id/:storyId").patch(updateStory);
router.route("/id/:storyId").delete(deleteStory);
router.route("/id/:storyId").get(getStory);
router.route("/bulk-retrieve").post(getStories);

module.exports = router;
