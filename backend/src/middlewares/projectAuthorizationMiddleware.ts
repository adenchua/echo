import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import { ProjectRole, hasProjectRole } from "../auth/projectPolicy";
import { FORBIDDEN_ERROR, UNAUTHENTICATED_ERROR } from "../errors/authErrors";
import { EPIC_NOT_FOUND_ERROR } from "../errors/epicErrors";
import { PROJECT_MISMATCH_ERROR, PROJECT_NOT_FOUND_ERROR } from "../errors/projectErrors";
import { SPRINT_NOT_EXIST_ERROR } from "../errors/sprintErrors";
import { SUBTASK_NOT_FOUND_ERROR } from "../errors/subtaskErrors";
import { TICKET_NOT_FOUND_ERROR } from "../errors/ticketErrors";
import Epic from "../models/epic";
import Sprint from "../models/sprint";
import Subtask from "../models/subtask";
import Ticket from "../models/ticket";
import projectService from "../services/projectService";
import ErrorResponse from "../utils/ErrorResponse";

/** Finds the project IDs that a request refers to through one of its fields */
type ProjectIdResolver = (request: Request) => Promise<string[]>;

type RequestLocation = "params" | "body";

type ScopedResource = "ticket" | "epic" | "sprint" | "subtask";

interface ScopedResourceLookup {
  find: (ids: string[]) => Promise<{ projectId: Types.ObjectId }[]>;
  notFoundError: ErrorResponse;
}

const scopedResources: Record<ScopedResource, ScopedResourceLookup> = {
  ticket: {
    find: (ids) => Ticket.find({ _id: { $in: ids } }, "projectId").exec(),
    notFoundError: TICKET_NOT_FOUND_ERROR,
  },
  epic: {
    find: (ids) => Epic.find({ _id: { $in: ids } }, "projectId").exec(),
    notFoundError: EPIC_NOT_FOUND_ERROR,
  },
  sprint: {
    find: (ids) => Sprint.find({ _id: { $in: ids } }, "projectId").exec(),
    notFoundError: SPRINT_NOT_EXIST_ERROR,
  },
  subtask: {
    find: (ids) => Subtask.find({ _id: { $in: ids } }, "projectId").exec(),
    notFoundError: SUBTASK_NOT_FOUND_ERROR,
  },
};

const readField = (request: Request, location: RequestLocation, field: string): unknown =>
  request[location]?.[field];

/** Resolves a project ID given directly in a request field */
export const projectIdIn =
  (location: RequestLocation, field: string): ProjectIdResolver =>
  async (request) => [String(readField(request, location, field))];

/** Resolves the projects of the resources whose IDs are in a request field (a single ID or a list) */
export const projectOf =
  (resource: ScopedResource, location: RequestLocation, field: string): ProjectIdResolver =>
  async (request) => {
    const value = readField(request, location, field);
    const ids = (Array.isArray(value) ? value : [value]).map(String);
    const { find, notFoundError } = scopedResources[resource];
    const documents = await find(ids);

    // a missing single resource is a 404, while bulk retrieval skips missing IDs
    if (!Array.isArray(value) && documents.length === 0) {
      throw notFoundError;
    }

    return documents.map((document) => document.projectId.toHexString());
  };

/**
 * Allows the request only if every resource it references belongs to the same project,
 * and the logged-in user holds at least the given role in that project.
 * Place after the route's validation middleware so that all referenced IDs are well-formed.
 */
export const requireProjectRole =
  (role: ProjectRole, ...resolvers: ProjectIdResolver[]) =>
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!request.user) {
      throw UNAUTHENTICATED_ERROR;
    }

    const resolvedIds = await Promise.all(resolvers.map((resolve) => resolve(request)));
    const projectIds = [...new Set(resolvedIds.flat())];

    // nothing to protect, e.g. bulk retrieval where none of the IDs exist
    if (projectIds.length === 0) {
      next();
      return;
    }

    if (projectIds.length > 1) {
      throw PROJECT_MISMATCH_ERROR;
    }

    const project = await projectService.getProject(projectIds[0]);

    if (project == null) {
      throw PROJECT_NOT_FOUND_ERROR;
    }

    if (!hasProjectRole(project, request.user.id, role)) {
      throw FORBIDDEN_ERROR;
    }

    next();
  };
