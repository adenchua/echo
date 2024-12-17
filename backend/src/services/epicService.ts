import Epic from "../models/epic";
import Project from "../models/project";
import Ticket from "../models/ticket";
import objectUtils from "../utils/objectUtils";
import projectService from "./projectService";

/**
 * Creates a new epic and adds it to an existing project
 * @param {string} projectId
 * @param {Epic} epicFields
 * @returns an Epic object
 */
const createEpic = async (projectId, epicFields) => {
  const { title, description, startDate, endDate, ticketIds } = epicFields;
  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    startDate,
    endDate,
    ticketIds,
  });

  const project = await projectService.getProject(projectId);
  const projectEpicIds = project.epicIds || [];

  const epic = new Epic({ ...definedKeys });
  await epic.save();

  // add the new created epic into the project
  projectEpicIds.push(epic._id);
  await projectService.updateProject(projectId, { epicIds: projectEpicIds });

  return epic;
};

/**
 * Updates an existing Epic
 * @param {string} epicId - update an existing epic by this epic ID
 * @param {Epic} epicFields - fields to update the Epic
 */
const updateEpic = async (epicId, epicFields) => {
  const { title, description, ticketIds, startDate, endDate } = epicFields;
  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    ticketIds,
    startDate,
    endDate,
  });
  await Epic.findByIdAndUpdate(epicId, { ...keysToUpdate });
};

/**
 * Retrieves a list of Epics by epic IDs
 * @param {Array<string>} epicIds
 * @returns a list of Epics
 */
const getEpics = async (epicIds) => {
  const result = [];
  for (const epicId of epicIds) {
    const epic = await Epic.findById(epicId);
    if (epic) {
      result.push(epic);
    }
  }

  return result;
};

/**
 * Adds a ticket to an existing Epic
 * @param {string} ticketId - ticket ID of ticket to add to the epic
 * @param {string} epicId - epic ID of Epic for ticket to be added
 */
const addTicketToEpic = async (ticketId, epicId) => {
  const epic = await Epic.findById(epicId);
  await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove all instances of this ticketId in other epics
  await Ticket.findByIdAndUpdate(ticketId, { epicId }); // add link to ticket side
  if (!epic.ticketIds.includes(ticketId)) {
    epic.ticketIds.push(ticketId); // add link to epic side
    await epic.save();
  }
};

/**
 * Removes a ticket from an existing Epic
 * @param {string} ticketId - ticket ID of ticket to be removed from the epic
 * @param {string} epicId - epic ID of Epic for ticket to be removed
 */
const removeTicketFromEpic = async (ticketId, epicId) => {
  const epic = await Epic.findById(epicId);
  await Ticket.findByIdAndUpdate(ticketId, { epicId: null }); // remove link from ticket side
  if (epic.ticketIds.includes(ticketId)) {
    // remove link from epic side
    epic.ticketIds.pull(ticketId);
    await epic.save();
  }
};

/**
 * Deletes an epic from the database. (WARNING: HARD DELETE OPERATION)
 * @param {string} epicId - epic ID of Epic to be deleted
 */
const deleteEpic = async (epicId) => {
  await Ticket.updateMany({ epicId: epicId }, { $unset: { epicId: "" } }); // remove tickets with this epic id
  await Project.updateMany({ epicIds: epicId }, { $pullAll: { epicIds: [epicId] } }); // remove projects with this epic id
  await Epic.findByIdAndDelete(epicId);
};

export default {
  createEpic,
  updateEpic,
  getEpics,
  addTicketToEpic,
  removeTicketFromEpic,
  deleteEpic,
};
