import { HydratedDocument, Types } from "mongoose";

import Project, { IProject } from "../models/project";
import objectUtils from "../utils/objectUtils";
import { isProjectDeleted } from "../utils/projectUtils";

/** Creates a project in the database */
const createProject = async (
  projectFields: Partial<IProject>,
): Promise<HydratedDocument<IProject>> => {
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

/** Retrieves a project by project ID. Returns null if project by the project ID cannot be found */
const getProject = async (
  projectId: Types.ObjectId,
): Promise<HydratedDocument<IProject> | null> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  return project;
};

/** Add a list of members to a project */
const addMembersToProject = async (
  memberIds: Types.ObjectId[],
  projectId: Types.ObjectId,
): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  for (const memberId of memberIds) {
    // if admin, remove and put into member list
    project.adminIds = project.adminIds.filter((_adminId) => _adminId !== memberId);

    if (!project.memberIds.includes(memberId)) {
      project.memberIds.push(memberId);
    }
  }

  await project.save();
};

/** Remove a member from a project */
const removeMemberFromProject = async (
  memberId: Types.ObjectId,
  projectId: Types.ObjectId,
): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  project.memberIds = project.memberIds.filter((_memberId) => _memberId !== memberId);
  await project.save();
};

/** Update a project in the database */
const updateProject = async (
  projectId: Types.ObjectId,
  projectFields: Partial<IProject>,
): Promise<void> => {
  await Project.findByIdAndUpdate(projectId, { ...projectFields });
};

/** Retrieves a list of projects by user ID. The user can be a member/admin of the project */
const getProjectsOfUser = async (userId: Types.ObjectId): Promise<HydratedDocument<IProject>[]> => {
  const projectsWithUsersAsAdmins = await Project.find({ adminIds: userId, isDeleted: false });
  const projectsWithUsersAsMembers = await Project.find({ memberIds: userId, isDeleted: false });
  const projects = [...projectsWithUsersAsAdmins, ...projectsWithUsersAsMembers];

  return projects;
};

/** Promotes a member to an administrator in a project */
const promoteMemberToAdmin = async (
  memberId: Types.ObjectId,
  projectId: Types.ObjectId,
): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  if (!project.adminIds.includes(memberId)) {
    project.adminIds.push(memberId);
  }

  project.memberIds = project.memberIds.filter((_memberId) => _memberId !== memberId);

  await project.save();
};

/** Demotes an administrator to a member in a project */
const demoteAdminToMember = async (
  adminId: Types.ObjectId,
  projectId: Types.ObjectId,
): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  // remove user from admin id list
  project.adminIds = project.adminIds.filter((_adminId) => adminId !== _adminId);

  // add user to members list
  if (!project.memberIds.includes(adminId)) {
    project.memberIds.push(adminId);
  }

  await project.save();
};

/** Performs a safe delete of a project. Deleted projects cannot be retrieved by clients */
const deleteProject = async (projectId: Types.ObjectId): Promise<void> => {
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
