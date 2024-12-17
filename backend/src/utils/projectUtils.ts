/** Utility function to test if a project does not exist or already deleted */
export const isProjectDeleted = (project) => {
  return project == null || project.isDeleted;
};
