import { HydratedDocument } from "mongoose";

import Epic from "../models/epic";
import Project, { IProject } from "../models/project";
import Ticket, { ITicket } from "../models/ticket";
import objectUtils from "../utils/objectUtils";
import { isProjectDeleted } from "../utils/projectUtils";

/** Creates a new ticket for a project */
const createTicket = async (
  projectId: string,
  ticketFields: Partial<ITicket>,
): Promise<HydratedDocument<ITicket>> => {
  const {
    title,
    description,
    assigneeId,
    dueDate,
    status,
    priority,
    type,
    subtaskIds,
    isInSprint,
    epicId,
    storyPoints,
  } = ticketFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    assigneeId,
    dueDate,
    status,
    priority,
    type,
    subtaskIds,
    isInSprint,
    epicId,
    storyPoints,
  });

  let ticketNumber = 1;
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  // update ticket number to the latest ticket number + 1
  if (project.backlogIds.length > 0) {
    const latestTicketId = project.backlogIds[project.backlogIds.length - 1];
    const latestTicket = await Ticket.findById(latestTicketId);
    if (latestTicket != null) {
      ticketNumber = latestTicket.ticketNumber + 1;
    }
  }

  const newTicket = new Ticket({ ...definedKeys, ticketNumber });
  await newTicket.save();
  project.backlogIds.push(newTicket._id);
  await project.save();

  return newTicket;
};

/** Updates an existing ticket using ticket ID */
const updateTicket = async (ticketId: string, ticketFields: Partial<ITicket>): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  } = ticketFields;

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  });

  await Ticket.findByIdAndUpdate(ticketId, { ...keysToUpdate });
};

/** Deletes an existing ticket */
const deleteTicket = async (ticketId: string): Promise<void> => {
  await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove deleted ticket from epics
  await Project.updateMany({ backlogIds: ticketId }, { $pullAll: { backlogIds: [ticketId] } }); // remove deleted ticket from project
  await Ticket.findByIdAndDelete(ticketId);
};

/** Retrieves a list of tickets from given list of ticket IDs */
const getTickets = async (ticketIds: string[]): Promise<HydratedDocument<ITicket>[]> => {
  const result: HydratedDocument<ITicket>[] = [];
  for (const ticketId of ticketIds) {
    const ticket = await Ticket.findById(ticketId);
    if (ticket) {
      result.push(ticket);
    }
  }

  return result;
};

export default { createTicket, updateTicket, deleteTicket, getTickets };
