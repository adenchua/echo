import Project from "../models/project.js";
import Sprint from "../models/sprint.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

/**
 * Starts a sprint in a project
 * @param {string} projectId
 * @param {Sprint} sprintFields
 * @returns Sprint
 */
const startSprint = async (projectId, sprintFields) => {
  const project = await Project.findById(projectId);
  const { number, startDate, endDate, incompleteTicketIds, completedTicketIds, hasEnded } =
    sprintFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    number,
    startDate,
    endDate,
    incompleteTicketIds,
    completedTicketIds,
    hasEnded,
  });

  const newSprint = new Sprint({ ...definedKeys });
  await newSprint.save();
  project.sprintIds.push(newSprint._id);
  await project.save();

  return newSprint;
};

// TODO: should not require project ID, add relation from sprint to project
/**
 * Ends an active sprint in a project
 * @param {string} sprintId
 * @param {string} projectId
 * @returns Sprint
 */
const endSprint = async (sprintId, projectId) => {
  const completedTicketIds = [];
  const incompleteTicketIds = [];
  const sprint = await Sprint.findById(sprintId);
  const project = await Project.findById(projectId);

  for (const ticketId of project.backlogIds) {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      project.backlogIds.pull(ticketId); // remove invalid ticket from backlog
      continue; // invalid ticketIds will return null, causing the next statements to break
    }
    if (ticket.isInSprint && ticket.status === "completed") {
      ticket.isInSprint = false;
      await ticket.save(); // update ticket tor inSprint status
      completedTicketIds.push(ticket._id);
    }
    if (ticket.isInSprint && ticket.status !== "completed") {
      incompleteTicketIds.push(ticket._id);
    }
  }

  completedTicketIds.forEach((ticketId) => project.backlogIds.pull(ticketId)); // remove completed tickets from product backlog

  sprint.hasEnded = true;
  sprint.completedTicketIds = completedTicketIds;
  sprint.incompleteTicketIds = incompleteTicketIds;
  await sprint.save();
  await project.save();

  return sprint;
};

/**
 * Retrieves a list of sprint by sprint IDs
 * @param {Array<string>} sprintIds - sprint IDs to retrieve sprint from
 * @returns Array<Sprint>
 */
const getSprints = async (sprintIds) => {
  const result = [];

  for (const sprintId of sprintIds) {
    const sprint = await Sprint.findById(sprintId);
    if (sprint) {
      result.push(sprint);
    }
  }

  return result;
};

export default { startSprint, endSprint, getSprints };
