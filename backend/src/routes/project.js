import { Router } from "express";

import {
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
} from "../controllers/project.js";

const router = Router();

router.route("/").post(createProject);
router.route("/").get(getAllProjects);
router.route("/id/:projectId").get(getProject);
router.route("/id/:projectId").patch(updateProject);
router.route("/id/:projectId").delete(deleteProject);
router.route("/members/add/:projectId").post(addMemberToProject);
router.route("/members/bulk-add/:projectId").post(addMembersToProject);
router.route("/members/remove/:projectId").post(removeMemberFromProject);
router.route("/user/:userId").get(getProjectsOfUser);
router.route("/admins/promote/:projectId").post(promoteMemberToAdministrator);
router.route("/admins/demote/:projectId").post(demoteAdmintoMember);

export default router;
