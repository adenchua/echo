import Epic from "../models/epic.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";
import projectService from "./projectService.js";

/**
 * Creates a new ticket for a project
 * @param {string} projectId - Project ID of project to add ticket to
 * @param {Ticket} ticketFields - ticket fields for the new ticket
 * @returns Ticket
 */
const createTicket = async (projectId, ticketFields) => {
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
  const project = await projectService.getProject(projectId);
  // update ticket number to the latest ticket number + 1
  if (project.backlogIds.length > 0) {
    const latestTicketId = project.backlogIds[project.backlogIds.length - 1];
    const latestTicket = await Ticket.findById(latestTicketId);
    ticketNumber = latestTicket.ticketNumber + 1;
  }

  const newTicket = new Ticket({ ...definedKeys, ticketNumber });
  await newTicket.save();
  project.backlogIds.push(newTicket._id);
  await project.save();

  return newTicket;
};

/**
 * Updates an existing ticket using ticket ID
 * @param {string} ticketId - ticket ID of ticket to update
 * @param {Ticket} ticketFields - updated fields to update ticket
 */
const updateTicket = async (ticketId, ticketFields) => {
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

/**
 * Deletes an existing ticket
 * @param {string} ticketId - ticket ID of ticket to delete
 */
const deleteTicket = async (ticketId) => {
  await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove deleted ticket from epics
  await Project.updateMany({ backlogIds: ticketId }, { $pullAll: { backlogIds: [ticketId] } }); // remove deleted ticket from project
  await Ticket.findByIdAndDelete(ticketId);
};

/**
 * Retrieves a list of tickets from given list of ticket IDs
 * @param {string} ticketIds - ticket IDs of ticket to retrieve
 * @returns Array<Ticket>
 */
const getTickets = async (ticketIds) => {
  const result = [];
  for (const ticketId of ticketIds) {
    const ticket = await Ticket.findById(ticketId);
    if (ticket) {
      result.push(ticket);
    }
  }

  return result;
};

export default { createTicket, updateTicket, deleteTicket, getTickets };
