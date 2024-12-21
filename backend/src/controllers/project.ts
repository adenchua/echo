import { Request, Response } from "express";

import errorCodeToMessageMap from "../constants/errorMessages";
import projectService from "../services/projectService";
import ErrorResponse from "../utils/ErrorResponse";
import objectUtils from "../utils/objectUtils";
import { isProjectDeleted } from "../utils/projectUtils";

export const PROJECT_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["PROJECT_NOT_FOUND"],
  "PROJECT_NOT_FOUND",
  404,
);

export const createProject = async (request: Request, response: Response): Promise<void> => {
  const { title, adminId, type } = request.body;

  const newProject = await projectService.createProject({ title, adminIds: [adminId], type });
  response.status(201).send({ data: newProject });
};

export const getProject = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;

  const project = await projectService.getProject(projectId);
  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  response.send({ data: project });
};

export const addMemberToProject = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;
  const { userId } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.addMembersToProject([userId], projectId);
  response.sendStatus(204);
};

export const addMembersToProject = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;
  const { userIds } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.addMembersToProject(userIds, projectId);
  response.sendStatus(204);
};

export const removeMemberFromProject = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { projectId } = request.params;
  const { userId } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.removeMemberFromProject(userId, projectId);
  response.sendStatus(204);
};

export const updateProject = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;
  const { title, description, announcement, picture, type } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    announcement,
    picture,
    type,
  });

  await projectService.updateProject(projectId, definedKeys);
  response.sendStatus(204);
};

export const getProjectsOfUser = async (request: Request, response: Response): Promise<void> => {
  const { userId } = request.params;

  const projects = await projectService.getProjectsOfUser(userId);
  response.send({ data: projects });
};

export const promoteMemberToAdministrator = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { projectId } = request.params;
  const { userId } = request.body;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.promoteMemberToAdmin(userId, projectId);
  response.sendStatus(204);
};

export const demoteAdminToMember = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;
  const { userId } = request.body;

  const project = await projectService.getProject(projectId);

  if (!project || isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  if (project.adminIds.length <= 1) {
    throw new ErrorResponse(
      errorCodeToMessageMap["LAST_PROJECT_ADMINISTRATOR"],
      "LAST_PROJECT_ADMINISTRATOR",
      400,
    );
  }

  await projectService.demoteAdminToMember(userId, projectId);
  response.sendStatus(204);
};

export const deleteProject = async (request: Request, response: Response): Promise<void> => {
  const { projectId } = request.params;

  const project = await projectService.getProject(projectId);

  if (isProjectDeleted(project)) {
    throw PROJECT_NOT_FOUND_ERROR;
  }

  await projectService.deleteProject(projectId);
  response.sendStatus(204);
};
