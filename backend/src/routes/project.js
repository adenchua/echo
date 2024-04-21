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

import {
  getProjectValidationChain,
  createProjectValidationChain,
  addMembersToProjectValidationChain,
  addMemberToProjectValidationChain,
  removeMemberFromProjectValidationChain,
  updateProjectValidationChain,
} from "../middlewares/projectValidationMiddleware.js";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware.js";

const router = Router();

router.route("/").get(getAllProjects);
router.route("/").post(createProjectValidationChain, validationErrorHandling, createProject);
router.route("/id/:projectId").get(getProjectValidationChain, validationErrorHandling, getProject);
router.route("/id/:projectId").patch(updateProjectValidationChain, validationErrorHandling, updateProject);
router.route("/id/:projectId").delete(deleteProject);
router
  .route("/members/add/:projectId")
  .post(addMemberToProjectValidationChain, validationErrorHandling, addMemberToProject);
router
  .route("/members/bulk-add/:projectId")
  .post(addMembersToProjectValidationChain, validationErrorHandling, addMembersToProject);
router
  .route("/members/remove/:projectId")
  .post(removeMemberFromProjectValidationChain, validationErrorHandling, removeMemberFromProject);
router.route("/user/:userId").get(getProjectsOfUser);
router.route("/admins/promote/:projectId").post(promoteMemberToAdministrator);
router.route("/admins/demote/:projectId").post(demoteAdmintoMember);

export default router;
