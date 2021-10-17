const Subtask = require("../models/subtask");
const Story = require("../models/story");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

module.exports.createSubtask = async (req, res) => {
  const { storyId, title } = req.body;

  if (!storyId || !title) {
    res.status(400).send();
    return;
  }

  try {
    const subtask = new Subtask({ title });
    await subtask.save();
    const story = await Story.findById(storyId);
    story.subtasks.push(subtask._id);
    await story.save();
    res.status(201).send(subtask);
  } catch (error) {
    console.error("createSubtask", error);
    res.status(500).send();
  }
};

module.exports.updateSubtask = async (req, res) => {
  const { subtaskId } = req.params;
  const { title, isCompleted } = req.body;

  if (!subtaskId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = removeUndefinedKeysFromObject({ title, isCompleted });
  try {
    await Subtask.findByIdAndUpdate(subtaskId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateSubtask", error);
    res.status(500).send();
  }
};

module.exports.deleteSubtask = async (req, res) => {
  const { subtaskId } = req.params;

  if (!subtaskId) {
    res.status(400).send();
    return;
  }

  try {
    await Subtask.findByIdAndDelete(subtaskId);
    res.status(204).send();
  } catch (error) {
    console.error("deletesubtask", error);
    res.status(500).send();
  }
};

module.exports.getSubtasks = async (req, res) => {
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
