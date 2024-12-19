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
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const router = Router();

router.route("/").post(createProjectValidationChain, validationErrorMiddleware, createProject);
router
  .route("/id/:projectId")
  .get(getProjectValidationChain, validationErrorMiddleware, getProject);
router
  .route("/id/:projectId")
  .patch(updateProjectValidationChain, validationErrorMiddleware, updateProject);
router
  .route("/id/:projectId")
  .delete(deleteProjectValidationChain, validationErrorMiddleware, deleteProject);
router
  .route("/members/add/:projectId")
  .post(addMemberToProjectValidationChain, validationErrorMiddleware, addMemberToProject);
router
  .route("/members/bulk-add/:projectId")
  .post(addMembersToProjectValidationChain, validationErrorMiddleware, addMembersToProject);
router
  .route("/members/remove/:projectId")
  .post(removeMemberFromProjectValidationChain, validationErrorMiddleware, removeMemberFromProject);
router.route("/user/:userId").get(getProjectsOfUser);
router
  .route("/admins/promote/:projectId")
  .post(
    promoteMemberToAdministratorValidationChain,
    validationErrorMiddleware,
    promoteMemberToAdministrator,
  );
router
  .route("/admins/demote/:projectId")
  .post(demoteAdminToMemberValidationChain, validationErrorMiddleware, demoteAdminToMember);

export default router;
