const { Router } = require("express");

const {
  createProject,
  getProject,
  addMemberToProject,
  removeMemberFromProject,
  updateProject,
  getProjectsOfUser,
  getAllProjects,
  promoteMemberToAdministrator,
  demoteAdmintoMember,
  deleteProject,
  addMembersToProject,
} = require("../controllers/project");

const router = Router();

router.route("/").post(createProject);
router.route("/").get(getAllProjects);
router.route("/id/:projectId").get(getProject);
router.route("/id/:projectId").patch(updateProject);
router.route("/id/:projectId").delete(deleteProject);
router.route("/members/:projectId").post(addMemberToProject);
router.route("/members/bulk/:projectId").post(addMembersToProject);
router.route("/members/:projectId").delete(removeMemberFromProject);
router.route("/user/:userId").get(getProjectsOfUser);
router.route("/admins/:projectId").post(promoteMemberToAdministrator);
router.route("/admins/:projectId").delete(demoteAdmintoMember);

module.exports = router;
