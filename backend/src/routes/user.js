const { Router } = require("express");

const { createUser, getUserByUsername } = require("../controllers/user");

const router = Router();

router.route("/").post(createUser);
router.route("/:username").get(getUserByUsername);

module.exports = router;
