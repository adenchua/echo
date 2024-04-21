import Subtask from "../models/subtask.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

export const createSubtask = async (req, res) => {
  const { ticketId, title } = req.body;

  if (!ticketId || !title) {
    res.status(400).send();
    return;
  }

  try {
    const subtask = new Subtask({ title });
    await subtask.save();
    const ticket = await Ticket.findById(ticketId);
    ticket.subtaskIds.push(subtask._id);
    await ticket.save();
    res.status(201).send(subtask);
  } catch (error) {
    console.error("createSubtask", error);
    res.status(500).send();
  }
};

export const updateSubtask = async (req, res) => {
  const { subtaskId } = req.params;
  const { title, isCompleted } = req.body;

  if (!subtaskId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  try {
    await Subtask.findByIdAndUpdate(subtaskId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateSubtask", error);
    res.status(500).send();
  }
};

export const deleteSubtask = async (req, res) => {
  const { subtaskId } = req.params;

  if (!subtaskId) {
    res.status(400).send();
    return;
  }

  try {
    await Ticket.updateMany({ subtaskIds: subtaskId }, { $pullAll: { subtaskIds: [subtaskId] } }); // remove ticket with this subtask id
    await Subtask.findByIdAndDelete(subtaskId);
    res.status(204).send();
  } catch (error) {
    console.error("deletesubtask", error);
    res.status(500).send();
  }
};

export const getSubtasks = async (req, res) => {
  const { subtaskIds } = req.body;
  const subtasks = [];

  if (!subtaskIds || !Array.isArray(subtaskIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const subtaskId of subtaskIds) {
      const subtask = await Subtask.findById(subtaskId);
      subtasks.push(subtask);
    }

    res.status(200).send(subtasks);
  } catch (error) {
    console.error("getSubtasks", error);
    res.status(500).send();
  }
};
