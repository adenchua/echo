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

const projectRouter = Router();

projectRouter
  .route("/")
  .post(createProjectValidationChain, validationErrorMiddleware, createProject);
projectRouter
  .route("/id/:projectId")
  .get(getProjectValidationChain, validationErrorMiddleware, getProject);
projectRouter
  .route("/id/:projectId")
  .patch(updateProjectValidationChain, validationErrorMiddleware, updateProject);
projectRouter
  .route("/id/:projectId")
  .delete(deleteProjectValidationChain, validationErrorMiddleware, deleteProject);
projectRouter
  .route("/members/add/:projectId")
  .post(addMemberToProjectValidationChain, validationErrorMiddleware, addMemberToProject);
projectRouter
  .route("/members/bulk-add/:projectId")
  .post(addMembersToProjectValidationChain, validationErrorMiddleware, addMembersToProject);
projectRouter
  .route("/members/remove/:projectId")
  .post(removeMemberFromProjectValidationChain, validationErrorMiddleware, removeMemberFromProject);
projectRouter.route("/user/:userId").get(getProjectsOfUser);
projectRouter
  .route("/admins/promote/:projectId")
  .post(
    promoteMemberToAdministratorValidationChain,
    validationErrorMiddleware,
    promoteMemberToAdministrator,
  );
projectRouter
  .route("/admins/demote/:projectId")
  .post(demoteAdminToMemberValidationChain, validationErrorMiddleware, demoteAdminToMember);

export default projectRouter;
