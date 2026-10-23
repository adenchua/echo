import Project from "../types/Project";

/** Checks if a user is an administrator of a project. Mirrors the server's project permissions */
export const isProjectAdmin = (project: Project, userId: string | undefined): boolean =>
  userId !== undefined && project.adminIds.includes(userId);
