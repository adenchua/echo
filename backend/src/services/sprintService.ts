import { HydratedDocument, Types } from "mongoose";

import Project, { IProject } from "../models/project";
import Sprint, { ISprint } from "../models/sprint";
import Ticket from "../models/ticket";
import objectUtils from "../utils/objectUtils";
import { isProjectDeleted } from "../utils/projectUtils";

/** Starts a sprint in a project **/
const startSprint = async (projectId: string, sprintFields: Partial<ISprint>): Promise<ISprint> => {
  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

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

/** Ends an active sprint in a project **/
const endSprint = async (
  sprintId: string,
  projectId: string,
): Promise<HydratedDocument<ISprint>> => {
  const completedTicketIds: Types.ObjectId[] = [];
  const incompleteTicketIds: Types.ObjectId[] = [];
  const sprint = await Sprint.findById(sprintId);

  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  if (sprint == null) {
    throw new Error("Sprint not found");
  }

  for (const ticketId of project.backlogIds) {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      project.backlogIds = project.backlogIds.filter(
        (_backlogId) => _backlogId.toHexString() !== ticketId.toHexString(),
      );
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

  // remove completed tickets from product backlog
  completedTicketIds.forEach((ticketId) => {
    project.backlogIds = project.backlogIds.filter(
      (_backlogId) => _backlogId.toHexString() !== ticketId.toHexString(),
    );
  });

  sprint.hasEnded = true;
  sprint.completedTicketIds = completedTicketIds;
  sprint.incompleteTicketIds = incompleteTicketIds;
  await sprint.save();
  await project.save();

  return sprint;
};

/** Retrieves a list of sprint by sprint IDs **/
const getSprints = async (sprintIds: string[]): Promise<HydratedDocument<ISprint>[]> => {
  const result: HydratedDocument<ISprint>[] = [];

  for (const sprintId of sprintIds) {
    const sprint = await Sprint.findById(sprintId);
    if (sprint) {
      result.push(sprint);
    }
  }

  return result;
};

export default { startSprint, endSprint, getSprints };
