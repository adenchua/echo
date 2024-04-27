import Epic from "../models/epic.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";
import { errorMessages } from "../utils/errorMessages.js";
import objectUtils from "../utils/objectUtils.js";

export const createEpic = async (req, res, next) => {
  const { title, projectId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    const epic = new Epic({ title });
    await epic.save();
    project.epicIds.push(epic._id);
    await project.save();
    res.status(201).send(epic);
  } catch (error) {
    next(error);
  }
};

export const updateEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { title, description } = req.body;

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({ title, description });

  try {
    await Epic.findByIdAndUpdate(epicId, { ...keysToUpdate });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getEpics = async (req, res, next) => {
  const { epicIds } = req.body;
  const epics = [];

  try {
    for (const epicId of epicIds) {
      const epic = await Epic.findById(epicId);
      if (epic) {
        epics.push(epic);
      }
    }
    res.send(epics);
  } catch (error) {
    next(error);
  }
};

export const addTicketToEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  try {
    const epic = await Epic.findById(epicId);
    await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove all instances of the ticketId in all epics
    await Ticket.findByIdAndUpdate(ticketId, { epicId }); // add link to both sides
    if (!epic.ticketIds.includes(ticketId)) {
      epic.ticketIds.push(ticketId);
    }
    await epic.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeTicketFromEpic = async (req, res, next) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  try {
    const epic = await Epic.findById(epicId);
    await Ticket.findByIdAndUpdate(ticketId, { epicId: null }); // remove link from both sides
    if (epic.ticketIds.includes(ticketId)) {
      epic.ticketIds.pull(ticketId);
    }
    await epic.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteEpic = async (req, res, next) => {
  const { epicId } = req.params;

  try {
    await Ticket.updateMany({ epicId: epicId }, { $unset: { epicId: "" } }); // remove tickets with this epic id
    await Project.updateMany({ epicIds: epicId }, { $pullAll: { epicIds: [epicId] } }); // remove projects with this epic id
    await Epic.findByIdAndDelete(epicId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
