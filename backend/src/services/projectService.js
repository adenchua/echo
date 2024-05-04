import Project from "../models/project.js";
import objectUtils from "../utils/objectUtils.js";

/**
 * Creates a project in the database
 * @param {Project} projectFields - project fields to create a Project
 * @returns Project
 */
const createProject = async (projectFields) => {
  const {
    title,
    type,
    description,
    announcement,
    adminIds,
    memberIds,
    epicIds,
    backlogIds,
    sprintIds,
    picture,
  } = projectFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    type,
    description,
    announcement,
    adminIds,
    memberIds,
    epicIds,
    backlogIds,
    sprintIds,
    picture,
  });

  const newProject = new Project({ ...definedKeys });
  await newProject.save();

  return newProject;
};

/**
 * Retrieves a project by project ID. Returns null if project by the project ID cannot be found
 * @param {string} projectId - project ID of project to retrieve from
 * @returns Project or null
 */
const getProject = async (projectId) => {
  const project = await Project.findById(projectId);

  if (project.isDeleted) {
    return null; // do not return deleted projects to client
  }

  return project;
};

/**
 * Add a list of members to a project.
 * @param {Array<string>} memberIds - list of member IDs of members to add to project
 * @param {string} projectId - project ID of project to add members to
 */
const addMembersToProject = async (memberIds, projectId) => {
  const project = await getProject(projectId);

  for (const memberId of memberIds) {
    if (project.adminIds.includes(memberId)) {
      project.adminIds.pull(memberId); // if admin, remove and put into member list
    }
    if (!project.memberIds.includes(memberId)) {
      project.memberIds.push(memberId);
    }
  }

  await project.save();
};

/**
 * Remove a member from a project
 * @param {string} memberId - member ID of member to remove from project
 * @param {string} projectId - project ID of project to remove member from
 */
const removeMemberFromProject = async (memberId, projectId) => {
  const project = await getProject(projectId);

  if (project.memberIds.includes(memberId)) {
    project.memberIds.pull(memberId);
    await project.save();
  }
};

/**
 * Update a project in the database
 * @param {string} projectId - project ID of project to update
 * @param {Project} projectFields - project fields to update
 */
const updateProject = async (projectId, projectFields) => {
  const {
    title,
    type,
    description,
    announcement,
    adminIds,
    memberIds,
    epicIds,
    backlogIds,
    sprintIds,
    picture,
  } = projectFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    type,
    description,
    announcement,
    adminIds,
    memberIds,
    epicIds,
    backlogIds,
    sprintIds,
    picture,
  });

  await Project.findByIdAndUpdate(projectId, { ...definedKeys });
};

/**
 * Retrieves a list of projects by user ID. The user can be a member/admin of the project
 * @param {string} userId - retrieves projects by this user ID
 * @returns A list of projects
 */
const getProjectsOfUser = async (userId) => {
  const projectsWithUsersAsAdmins = await Project.find({ adminIds: userId, isDeleted: false });
  const projectsWithUsersAsMembers = await Project.find({ memberIds: userId, isDeleted: false });
  const projects = [...projectsWithUsersAsAdmins, ...projectsWithUsersAsMembers];

  return projects;
};

/**
 * Promotes a member to an administrator in a project
 * @param {string} memberId - member ID of project to promote to admin
 * @param {string} projectId - project ID of project
 */
const promoteMemberToAdmin = async (memberId, projectId) => {
  const project = await projectService.getProject(projectId);

  if (!project.adminIds.includes(memberId)) {
    project.adminIds.push(memberId);
  }

  if (project.memberIds.includes(memberId)) {
    project.memberIds.pull(memberId);
  }

  await project.save();
};

/**
 * Demotes an administrator to a member in a project.
 * @param {string} adminId - admin ID of the project to demote to a member
 * @param {string} projectId - project ID of the project
 */
const demoteAdminToMember = async (adminId, projectId) => {
  const project = await projectService.getProject(projectId);

  // remove user from admin id list
  if (project.adminIds.includes(adminId)) {
    project.adminIds.pull(adminId);
  }

  // add user to members list
  if (!project.memberIds.includes(adminId)) {
    project.memberIds.push(adminId);
  }

  await project.save();
};

/**
 * Performs a safe delete of a project. Deleted projects cannot be retrieved by clients
 * @param {string} projectId - project ID of project to delete
 */
const deleteProject = async (projectId) => {
  await Project.findByIdAndUpdate(projectId, { isDeleted: true }); // safe delete.
};

export default {
  createProject,
  getProject,
  addMembersToProject,
  removeMemberFromProject,
  updateProject,
  getProjectsOfUser,
  promoteMemberToAdmin,
  demoteAdminToMember,
  deleteProject,
};
