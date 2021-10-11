const { Router } = require("express");

const { createProject } = require("../controllers/project");

const router = Router();

router.route("/").post(createProject);

module.exports = router;
