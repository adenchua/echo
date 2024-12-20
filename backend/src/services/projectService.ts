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
const getProject = async (projectId: string): Promise<HydratedDocument<IProject> | null> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  return project;
};

/** Add a list of members to a project */
const addMembersToProject = async (memberIds: string[], projectId: string): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }
  const projectMembers = [...project.adminIds, ...project.memberIds].map((memberId) =>
    memberId.toHexString(),
  );

  memberIds.forEach((memberId) => {
    // already inside project, do nothing
    if (projectMembers.includes(memberId)) {
      return;
    }
    // redundant as it can take in a normal string, but typescript throws an error without typecast
    const objectId = new Types.ObjectId(memberId);
    project.memberIds.push(objectId);
  });

  await project.save();
};

/** Remove a member from a project */
const removeMemberFromProject = async (memberId: string, projectId: string): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  project.memberIds = project.memberIds.filter((_memberId) => _memberId.toHexString() !== memberId);
  await project.save();
};

/** Update a project in the database */
const updateProject = async (
  projectId: string,
  projectFields: Partial<IProject>,
): Promise<void> => {
  await Project.findByIdAndUpdate(projectId, { ...projectFields });
};

/** Retrieves a list of projects by user ID. The user can be a member/admin of the project */
const getProjectsOfUser = async (userId: string): Promise<HydratedDocument<IProject>[]> => {
  const projectsWithUsersAsAdmins = await Project.find({ adminIds: userId, isDeleted: false });
  const projectsWithUsersAsMembers = await Project.find({ memberIds: userId, isDeleted: false });
  const projects = [...projectsWithUsersAsAdmins, ...projectsWithUsersAsMembers];

  return projects;
};

/** Promotes a member to an administrator in a project */
const promoteMemberToAdmin = async (memberId: string, projectId: string): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  const adminIds = project.adminIds.map((adminId) => adminId.toHexString());

  if (!adminIds.includes(memberId)) {
    const objectId = new Types.ObjectId(memberId);
    project.adminIds.push(objectId);
  }

  project.memberIds = project.memberIds.filter((_memberId) => _memberId.toHexString() !== memberId);

  await project.save();
};

/** Demotes an administrator to a member in a project */
const demoteAdminToMember = async (adminId: string, projectId: string): Promise<void> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  // remove user from admin id list
  project.adminIds = project.adminIds.filter((_adminId) => _adminId.toHexString() !== adminId);

  const projectMembers = project.memberIds.map((memberId) => memberId.toHexString());

  // add user to members list
  if (!projectMembers.includes(adminId)) {
    const objectId = new Types.ObjectId(adminId);
    project.memberIds.push(objectId);
  }

  await project.save();
};

/** Performs a safe delete of a project. Deleted projects cannot be retrieved by clients */
const deleteProject = async (projectId: string): Promise<void> => {
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
