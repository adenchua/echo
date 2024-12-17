import { HydratedDocument, Types } from "mongoose";

import Subtask, { ISubtask } from "../models/subtask";
import Ticket from "../models/ticket";
import objectUtils from "../utils/objectUtils";

/** Creates a new subtask for a ticket */
const createSubtask = async (
  ticketId: Types.ObjectId,
  subtaskFields: Partial<ISubtask>,
): Promise<HydratedDocument<ISubtask>> => {
  const { title, isCompleted } = subtaskFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  const subtask = new Subtask({ ...definedKeys });
  await subtask.save();
  const ticket = await Ticket.findById(ticketId);
  if (ticket != null) {
    ticket.subtaskIds.push(subtask._id);
    await ticket.save();
  }

  return subtask;
};

/** Updates a current subtask by the subtask ID */
const updateSubtask = async (
  subtaskId: Types.ObjectId,
  subtaskFields: Partial<ISubtask>,
): Promise<void> => {
  const { title, isCompleted } = subtaskFields;

  const definedKeys = objectUtils.removeUndefinedKeysFromObject({ title, isCompleted });
  await Subtask.findByIdAndUpdate(subtaskId, { ...definedKeys });
};

/** Deletes an existing subtask in the database. WARNING: HARD-DELETE */
const deleteSubtask = async (subtaskId: Types.ObjectId): Promise<void> => {
  await Ticket.updateMany({ subtaskIds: subtaskId }, { $pullAll: { subtaskIds: [subtaskId] } }); // remove ticket with this subtask id
  await Subtask.findByIdAndDelete(subtaskId);
};

/** Returns a list of subtasks by subtask IDs */
const getSubtasks = async (subtaskIds: Types.ObjectId[]): Promise<HydratedDocument<ISubtask>[]> => {
  const result: HydratedDocument<ISubtask>[] = [];
  for (const subtaskId of subtaskIds) {
    const subtask = await Subtask.findById(subtaskId);
    if (subtask) {
      result.push(subtask);
    }
  }

  return result;
};

export default { createSubtask, updateSubtask, deleteSubtask, getSubtasks };
