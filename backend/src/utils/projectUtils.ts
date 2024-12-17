/**
 * Utility function to test if a project does not exist or already deleted
 * @param {Project | null} project
 * @returns boolean
 */
export const isProjectDeleted = (project) => {
  if (project == null || project.isDeleted) {
    return true;
  }

  return false;
};

export default {};
