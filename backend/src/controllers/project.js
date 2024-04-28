import Project from "../models/project.js";
import objectUtils from "../utils/objectUtils.js";
import { errorMessages } from "../utils/errorMessages.js";

export const createProject = async (req, res, next) => {
  const { title, adminId, type } = req.body;

  try {
    const newProject = new Project({ title, adminIds: [adminId], type });
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project || project.isDeleted) {
      res.sendStatus(404);
      return;
    }

    res.send(project);
  } catch (error) {
    next(error);
  }
};

export const addMemberToProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    // if member is already inside the array, no need to do anything
    if (!project.memberIds.includes(userId)) {
      project.memberIds.push(userId);
      await project.save();
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addMembersToProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userIds } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    for (const userId of userIds) {
      if (project.adminIds.includes(userId)) {
        continue; // already admin, no need to add
      }
      if (!project.memberIds.includes(userId)) {
        project.memberIds.push(userId);
      }
    }

    await project.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeMemberFromProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    if (project.memberIds.includes(userId)) {
      project.memberIds.pull(userId);
      await project.save();
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { title, description, announcement, picture, type } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({
      title,
      description,
      announcement,
      picture,
      type,
    });
    await Project.findByIdAndUpdate(projectId, { ...keysToUpdate });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getProjectsOfUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const projectsWithUsersAsAdmins = await Project.find({ adminIds: userId, isDeleted: false });
    const projectsWithUsersAsMembers = await Project.find({ memberIds: userId, isDeleted: false });
    const projects = [...projectsWithUsersAsAdmins, ...projectsWithUsersAsMembers];
    res.send(projects);
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isDeleted: false });
    res.send(projects);
  } catch (error) {
    next(error);
  }
};

export const promoteMemberToAdministrator = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    // add user id to admin id list
    if (!project.adminIds.includes(userId)) {
      project.adminIds.push(userId);
    }

    // remove from member id list since already administrator
    if (project.memberIds.includes(userId)) {
      project.memberIds.pull(userId);
    }

    await project.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const demoteAdmintoMember = async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    if (project.adminIds.length === 1) {
      res.status(400).send({ error: errorMessages.lastAdministrator });
      return;
    }

    // remove user from admin id list
    if (project.adminIds.includes(userId)) {
      project.adminIds.pull(userId);
    }

    // add user to members list
    if (!project.memberIds.includes(userId)) {
      project.memberIds.push(userId);
    }

    await project.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndUpdate(projectId, { isDeleted: true }); // safe delete.
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
