import Epic from "../models/epic.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

export const createEpic = async (req, res) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);
    const epic = new Epic({ title });
    await epic.save();
    project.epicIds.push(epic._id);
    await project.save();
    res.status(201).send(epic);
  } catch (error) {
    console.error("createEpic", error);
    res.status(500).send();
  }
};

export const updateEpic = async (req, res) => {
  const { epicId } = req.params;
  const { title, description } = req.body;

  if (!epicId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({ title, description });

  try {
    await Epic.findByIdAndUpdate(epicId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateEpic", error);
    res.status(500).send();
  }
};

export const getEpics = async (req, res) => {
  const { epicIds } = req.body;
  const epics = [];

  if (!epicIds || !Array.isArray(epicIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const epicId of epicIds) {
      const epic = await Epic.findById(epicId);
      if (epic) {
        epics.push(epic);
      }
    }
    res.status(200).send(epics);
  } catch (error) {
    console.error("getEpics", error);
    res.status(500).send();
  }
};

export const addTicketToEpic = async (req, res) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  if (!epicId || !ticketId) {
    res.status(400).send();
    return;
  }

  try {
    const epic = await Epic.findById(epicId);
    await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove all instances of the ticketId in all epics
    await Ticket.findByIdAndUpdate(ticketId, { epicId }); // add link to both sides
    if (!epic.ticketIds.includes(ticketId)) {
      epic.ticketIds.push(ticketId);
    }
    await epic.save();
    res.status(204).send();
  } catch (error) {
    console.error("addTicketToEpic", error);
    res.status(500).send();
  }
};

export const removeTicketFromEpic = async (req, res) => {
  const { epicId } = req.params;
  const { ticketId } = req.body;

  if (!epicId || !ticketId) {
    res.status(400).send();
    return;
  }

  try {
    const epic = await Epic.findById(epicId);
    await Ticket.findByIdAndUpdate(ticketId, { epicId: null }); // remove link from both sides
    if (epic.ticketIds.includes(ticketId)) {
      epic.ticketIds.pull(ticketId);
    }
    await epic.save();
    res.status(204).send();
  } catch (error) {
    console.error("addTicketToEpic", error);
    res.status(500).send();
  }
};

export const deleteEpic = async (req, res) => {
  const { epicId } = req.params;

  if (!epicId) {
    res.status(400).send();
    return;
  }

  try {
    await Ticket.updateMany({ epicId: epicId }, { $unset: { epicId: "" } }); // remove tickets with this epic id
    await Project.updateMany({ epicIds: epicId }, { $pullAll: { epicIds: [epicId] } }); // remove projects with this epic id
    await Epic.findByIdAndDelete(epicId);
    res.status(204).send();
  } catch (error) {
    console.error("deleteEpic", error);
    res.status(500).send();
  }
};
