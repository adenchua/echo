import Subtask from "../models/subtask";
import Ticket from "../models/ticket";
import objectUtils from "../utils/objectUtils";

/**
 * Creates a new subtask for a ticket
 * @param {string} ticketId
 * @param {Subtask} subtaskFields
 * @returns Subtask
 */
const createSubtask = async (ticketId, subtaskFields) => {
  const { title, isCompleted } = subtaskFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  const subtask = new Subtask({ ...definedKeys });
  await subtask.save();
  const ticket = await Ticket.findById(ticketId);
  ticket.subtaskIds.push(subtask._id);
  await ticket.save();

  return subtask;
};

/**
 * Updates a current subtask by the subtask ID
 * @param {string} subtaskId
 * @param {Subtask} subtaskFields
 */
const updateSubtask = async (subtaskId, subtaskFields) => {
  const { title, isCompleted } = subtaskFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  await Subtask.findByIdAndUpdate(subtaskId, { ...definedKeys });
};

/**
 * Deletes an existing subtask in the database. WARNING: HARD-DELETE
 * @param {string} subtaskId
 */
const deleteSubtask = async (subtaskId) => {
  await Ticket.updateMany({ subtaskIds: subtaskId }, { $pullAll: { subtaskIds: [subtaskId] } }); // remove ticket with this subtask id
  await Subtask.findByIdAndDelete(subtaskId);
};

/**
 * Returns a list of subtasks by subtask IDs
 * @param {Array<string>} subtaskIds
 * @returns Array<Subtask>
 */
const getSubtasks = async (subtaskIds) => {
  const result = [];
  for (const subtaskId of subtaskIds) {
    const subtask = await Subtask.findById(subtaskId);
    result.push(subtask);
  }

  return result;
};

export default { createSubtask, updateSubtask, deleteSubtask, getSubtasks };
