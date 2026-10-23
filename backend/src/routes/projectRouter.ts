import { Router } from "express";

import addMembersToProject from "../controllers/project/addMembersToProject";
import addMemberToProject from "../controllers/project/addMemberToProject";
import createProject from "../controllers/project/createProject";
import deleteProject from "../controllers/project/deleteProject";
import demoteAdminToMember from "../controllers/project/demoteAdminToMember";
import getProject from "../controllers/project/getProject";
import getProjectsOfUser from "../controllers/project/getProjectsOfUser";
import promoteMemberToAdministrator from "../controllers/project/promoteMemberToAdministrator";
import removeMemberFromProject from "../controllers/project/removeMemberFromProject";
import updateProject from "../controllers/project/updateProject";
import { projectIdIn, requireProjectRole } from "../middlewares/projectAuthorizationMiddleware";
import {
  addMemberToProjectValidationChain,
  addMembersToProjectValidationChain,
  createProjectValidationChain,
  deleteProjectValidationChain,
  demoteAdminToMemberValidationChain,
  getProjectValidationChain,
  getProjectsOfUserValidationChain,
  promoteMemberToAdministratorValidationChain,
  removeMemberFromProjectValidationChain,
  updateProjectValidationChain,
} from "../middlewares/projectValidationMiddleware";
import validationErrorMiddleware from "../middlewares/validationErrorHandlingMiddleware";

const projectRouter = Router();

const projectFromParams = projectIdIn("params", "projectId");
const requireMember = requireProjectRole("member", projectFromParams);
const requireAdmin = requireProjectRole("admin", projectFromParams);

projectRouter
  .route("/")
  .post(createProjectValidationChain, validationErrorMiddleware, createProject);
projectRouter
  .route("/id/:projectId")
  .get(getProjectValidationChain, validationErrorMiddleware, requireMember, getProject);
projectRouter
  .route("/id/:projectId")
  .patch(updateProjectValidationChain, validationErrorMiddleware, requireMember, updateProject);
projectRouter
  .route("/id/:projectId")
  .delete(deleteProjectValidationChain, validationErrorMiddleware, requireAdmin, deleteProject);
projectRouter
  .route("/members/add/:projectId")
  .post(
    addMemberToProjectValidationChain,
    validationErrorMiddleware,
    requireMember,
    addMemberToProject,
  );
projectRouter
  .route("/members/bulk-add/:projectId")
  .post(
    addMembersToProjectValidationChain,
    validationErrorMiddleware,
    requireMember,
    addMembersToProject,
  );
projectRouter
  .route("/members/remove/:projectId")
  .post(
    removeMemberFromProjectValidationChain,
    validationErrorMiddleware,
    requireAdmin,
    removeMemberFromProject,
  );
projectRouter
  .route("/user/:userId")
  .get(getProjectsOfUserValidationChain, validationErrorMiddleware, getProjectsOfUser);
projectRouter
  .route("/admins/promote/:projectId")
  .post(
    promoteMemberToAdministratorValidationChain,
    validationErrorMiddleware,
    requireAdmin,
    promoteMemberToAdministrator,
  );
projectRouter
  .route("/admins/demote/:projectId")
  .post(
    demoteAdminToMemberValidationChain,
    validationErrorMiddleware,
    requireAdmin,
    demoteAdminToMember,
  );

export default projectRouter;
