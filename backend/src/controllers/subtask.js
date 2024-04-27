import Subtask from "../models/subtask.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

export const createSubtask = async (req, res, next) => {
  const { ticketId, title } = req.body;

  try {
    const subtask = new Subtask({ title });
    await subtask.save();
    const ticket = await Ticket.findById(ticketId);
    ticket.subtaskIds.push(subtask._id);
    await ticket.save();
    res.status(201).send(subtask);
  } catch (error) {
    next(error);
  }
};

export const updateSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;
  const { title, isCompleted } = req.body;

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  try {
    await Subtask.findByIdAndUpdate(subtaskId, { ...keysToUpdate });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;

  try {
    await Ticket.updateMany({ subtaskIds: subtaskId }, { $pullAll: { subtaskIds: [subtaskId] } }); // remove ticket with this subtask id
    await Subtask.findByIdAndDelete(subtaskId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getSubtasks = async (req, res, next) => {
  const { subtaskIds } = req.body;
  const subtasks = [];

  try {
    for (const subtaskId of subtaskIds) {
      const subtask = await Subtask.findById(subtaskId);
      subtasks.push(subtask);
    }

    res.send(subtasks);
  } catch (error) {
    next(error);
  }
};
