const { Router } = require("express");

const {
  createProject,
  getProject,
  addMemberToProject,
  removeMemberFromProject,
  updateProject,
  getProjectsOfUser,
} = require("../controllers/project");

const router = Router();

router.route("/").post(createProject);
router.route("/:projectId").get(getProject);
router.route("/:projectId").patch(updateProject);
router.route("/:projectId/members").post(addMemberToProject);
router.route("/:projectId/members").delete(removeMemberFromProject);
router.route("/user/:userId").get(getProjectsOfUser);

module.exports = router;
