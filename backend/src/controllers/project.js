import errorCodeToMessageMap from "../constants/errorMessages.js";
import projectService from "../services/projectService.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import objectUtils from "../utils/objectUtils.js";
import { isProjectDeleted } from "../utils/projectUtils.js";

export const PROJECT_NOT_FOUND_ERROR = new ErrorResponse(
  errorCodeToMessageMap["PROJECT_NOT_FOUND"],
  "PROJECT_NOT_FOUND",
  404,
);

export const createProject = async (req, res, next) => {
  const { title, adminId, type } = req.body;

  try {
    const newProject = await projectService.createProject({ title, adminId: [adminId], type });
    res.status(201).send({ data: newProject });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const project = await projectService.getProject(projectId);
    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    res.send({ data: project });
  } catch (error) {
    next(error);
  }
};

export const addMemberToProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    await projectService.addMembersToProject([userId], projectId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addMembersToProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userIds } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    await projectService.addMembersToProject(userIds, projectId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeMemberFromProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    await projectService.removeMemberFromProject(userId, projectId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { title, description, announcement, picture, type } = req.body;

  try {
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getProjectsOfUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const projects = await projectService.getProjectsOfUser(userId);
    res.send({ data: projects });
  } catch (error) {
    next(error);
  }
};

export const promoteMemberToAdministrator = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    await projectService.promoteMemberToAdmin(userId, projectId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const demoteAdmintoMember = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const project = await projectService.getProject(projectId);

    if (isProjectDeleted(project)) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    await projectService.deleteProject(projectId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
