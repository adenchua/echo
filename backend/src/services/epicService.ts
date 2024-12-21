import { HydratedDocument, Types } from "mongoose";

import Epic, { IEpic } from "../models/epic";
import Project, { IProject } from "../models/project";
import Ticket from "../models/ticket";
import objectUtils from "../utils/objectUtils";
import { isProjectDeleted } from "../utils/projectUtils";
import projectService from "./projectService";

/** Creates a new epic and adds it to an existing project */
const createEpic = async (
  projectId: string,
  epicFields: Partial<IEpic>,
): Promise<HydratedDocument<IEpic>> => {
  const { title, description, startDate, endDate, ticketIds } = epicFields;
  const definedKeys = objectUtils.removeUndefinedKeysFromObject({
    title,
    description,
    startDate,
    endDate,
    ticketIds,
  });

  const project = (await Project.findById(projectId)) as HydratedDocument<IProject>;

  if (isProjectDeleted(project)) {
    throw new Error("Project not found");
  }

  const projectEpicIds = project.epicIds || [];

  const epic = new Epic({ ...definedKeys });
  await epic.save();

  // add the new created epic into the project
  projectEpicIds.push(epic._id);
  await projectService.updateProject(projectId, { epicIds: projectEpicIds });

  return epic;
};

/** Updates an existing Epic */
const updateEpic = async (epicId: string, epicFields: Partial<IEpic>): Promise<void> => {
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

/** Retrieves a list of Epics by epic IDs */
const getEpics = async (epicIds: string[]): Promise<HydratedDocument<IEpic>[]> => {
  const result: HydratedDocument<IEpic>[] = [];
  for (const epicId of epicIds) {
    const epic = await Epic.findById(epicId);
    if (epic) {
      result.push(epic);
    }
  }

  return result;
};

/** Adds a ticket to an existing Epic */
const addTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
  const epic = await Epic.findById(epicId);

  if (epic == null) {
    throw new Error("Epic not found");
  }

  await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove all instances of this ticketId in other epics
  await Ticket.findByIdAndUpdate(ticketId, { epicId }); // add link to ticket side

  const epicTicketIds = epic.ticketIds.map((ticketId) => ticketId.toHexString());
  if (!epicTicketIds.includes(ticketId)) {
    epic.ticketIds.push(new Types.ObjectId(ticketId)); // add link to epic side
    await epic.save();
  }
};

/** Removes a ticket from an existing Epic */
const removeTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
  const epic = await Epic.findById(epicId);

  if (epic == null) {
    throw new Error("Epic not found");
  }

  await Ticket.findByIdAndUpdate(ticketId, { epicId: null }); // remove link from ticket side
  epic.ticketIds = epic.ticketIds.filter((_ticketId) => _ticketId.toHexString() !== ticketId);
  await epic.save();
};

/** Deletes an epic from the database. (WARNING: HARD DELETE OPERATION) */
const deleteEpic = async (epicId: string): Promise<void> => {
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
