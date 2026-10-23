import { Types } from "mongoose";

/** "member" is satisfied by any member of the project, including administrators */
export type ProjectRole = "member" | "admin";

interface ProjectMembership {
  adminIds: Types.ObjectId[];
  memberIds: Types.ObjectId[];
}

const includesUser = (ids: Types.ObjectId[], userId: string): boolean =>
  ids.some((id) => id.toHexString() === userId);

/** Checks if a user holds at least the given role in a project */
export function hasProjectRole(
  project: ProjectMembership,
  userId: string,
  role: ProjectRole,
): boolean {
  if (includesUser(project.adminIds, userId)) {
    return true;
  }

  return role === "member" && includesUser(project.memberIds, userId);
}
