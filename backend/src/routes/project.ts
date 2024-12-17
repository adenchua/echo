import { Router } from "express";

import {
  addMemberToProject,
  addMembersToProject,
  createProject,
  deleteProject,
  demoteAdminToMember,
  getProject,
  getProjectsOfUser,
  promoteMemberToAdministrator,
  removeMemberFromProject,
  updateProject,
} from "../controllers/project";

import {
  addMemberToProjectValidationChain,
  addMembersToProjectValidationChain,
  createProjectValidationChain,
  deleteProjectValidationChain,
  demoteAdminToMemberValidationChain,
  getProjectValidationChain,
  promoteMemberToAdministratorValidationChain,
  removeMemberFromProjectValidationChain,
  updateProjectValidationChain,
} from "../middlewares/projectValidationMiddleware";
import { validationErrorHandling } from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/").post(createProjectValidationChain, validationErrorHandling, createProject);
router.route("/id/:projectId").get(getProjectValidationChain, validationErrorHandling, getProject);
router
  .route("/id/:projectId")
  .patch(updateProjectValidationChain, validationErrorHandling, updateProject);
router
  .route("/id/:projectId")
  .delete(deleteProjectValidationChain, validationErrorHandling, deleteProject);
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
router
  .route("/admins/promote/:projectId")
  .post(
    promoteMemberToAdministratorValidationChain,
    validationErrorHandling,
    promoteMemberToAdministrator,
  );
router
  .route("/admins/demote/:projectId")
  .post(demoteAdminToMemberValidationChain, validationErrorHandling, demoteAdminToMember);

export default router;
