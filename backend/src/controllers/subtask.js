import subtaskService from "../services/subtaskService.js";

export const createSubtask = async (req, res, next) => {
  const { ticketId, title } = req.body;

  try {
    const newSubtask = await subtaskService.createSubtask(ticketId, { title });
    res.status(201).send(newSubtask);
  } catch (error) {
    next(error);
  }
};

export const updateSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;
  const { title, isCompleted } = req.body;

  try {
    await subtaskService.updateSubtask(subtaskId, { title, isCompleted });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteSubtask = async (req, res, next) => {
  const { subtaskId } = req.params;

  try {
    await subtaskService.deleteSubtask(subtaskId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getSubtasks = async (req, res, next) => {
  const { subtaskIds } = req.body;

  try {
    const subtasks = await subtaskService.getSubtasks(subtaskIds);
    res.send(subtasks);
  } catch (error) {
    next(error);
  }
};
