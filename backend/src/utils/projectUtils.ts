import { IProject } from "../models/project";

/** Utility function to test if a project does not exist or already deleted */
export const isProjectDeleted = (project: IProject | null) => {
  return project == null || project.isDeleted;
};
