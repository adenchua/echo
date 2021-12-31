const Project = require("../models/project");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

module.exports.createProject = async (req, res) => {
  const { title, adminId, type } = req.body;

  if (!title || !adminId || !type) {
    res.status(400).send();
    return;
  }

  try {
    const newProject = new Project({ title, adminIds: [adminId], type });
    await newProject.save();
    res.status(201).send(newProject);
  } catch (error) {
    console.error("createProject error", error);
    res.status(500).send();
  }
};

module.exports.getProject = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    res.status(200).send(project);
  } catch (error) {
    console.error("getProject error", error);
    res.status(500).send();
  }
};

module.exports.addMemberToProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  if (!userId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    if (project.adminIds.includes(userId)) {
      res.status(400).send({ message: "member is already an administrator" });
      return;
    }

    if (!project.memberIds.includes(userId)) {
      project.memberIds.push(userId);
    }
    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("addMemberToProject", error);
    res.status(500).send();
  }
};

module.exports.addMembersToProject = async (req, res) => {
  const { projectId } = req.params;
  const { userIds } = req.body;

  if (!userIds || !projectId || !Array.isArray(userIds)) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
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
    res.status(204).send();
  } catch (error) {
    console.error("addMembersToProject", error);
    res.status(500).send();
  }
};

module.exports.removeMemberFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  if (!userId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    if (project.memberIds.includes(userId)) {
      project.memberIds.pull(userId);
    }
    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("removeMemberFromProject", error);
    res.status(500).send();
  }
};

module.exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, announcement, picture, type } = req.body;
  if (!projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);
    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    const keysToUpdate = removeUndefinedKeysFromObject({ title, description, announcement, picture, type });
    await Project.findByIdAndUpdate(projectId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateProject", error);
    res.status(500).send();
  }
};

module.exports.getProjectsOfUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).send();
    return;
  }

  try {
    const projectsWithUsersAsAdmins = await Project.find({ adminIds: userId, isDeleted: false });
    const projectsWithUsersAsMembers = await Project.find({ memberIds: userId, isDeleted: false });
    const projects = [...projectsWithUsersAsAdmins, ...projectsWithUsersAsMembers];
    res.status(200).send(projects);
  } catch (error) {
    console.error("getProjectsOfUser", error);
    res.status(500).send();
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isDeleted: false });
    res.status(200).send(projects);
  } catch (error) {
    console.error("getAllProjects", error);
    res.status(500).send();
  }
};

module.exports.promoteMemberToAdministrator = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  if (!userId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    if (!project.adminIds.includes(userId)) {
      project.adminIds.push(userId);
    }

    if (project.memberIds.includes(userId)) {
      project.memberIds.pull(userId);
    }

    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("promoteMemberToAdministrator", error);
    res.status(500).send();
  }
};

module.exports.demoteAdmintoMember = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  if (!userId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (project.isDeleted) {
      res.status(400).send();
      return;
    }

    if (project.adminIds.length === 1 && project.adminIds.includes(userId)) {
      res.status(400).send({ message: "unable to remove the only administrator" });
      return;
    }

    if (project.adminIds.includes(userId)) {
      project.adminIds.pull(userId);
    }

    if (!project.memberIds.includes(userId)) {
      project.memberIds.push(userId);
    }

    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("demoteAdmintoMember", error);
    res.status(500).send();
  }
};

module.exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndUpdate(projectId, { isDeleted: true }); // safe delete.
    res.status(204).send();
  } catch (error) {
    console.error("deleteProject", error);
    res.status(500).send();
  }
};
