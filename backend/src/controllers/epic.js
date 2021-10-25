const Epic = require("../models/epic");
const Project = require("../models/project");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

module.exports.createEpic = async (req, res) => {
  const { title, projectId } = req.body;

  if (!title || projectId) {
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

module.exports.updateEpic = async (req, res) => {
  const { epicId } = req.params;
  const { title, description } = req.body;

  if (!epicId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = removeUndefinedKeysFromObject({ title, description });

  try {
    await Epic.findByIdAndUpdate(epicId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateEpic", error);
    res.status(500).send();
  }
};

module.exports.getEpics = async (req, res) => {
  const { epicIds } = req.body;
  const epics = [];

  if (!epicIds || !Array.isArray(epicIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const epicId of epicIds) {
      const epic = await Epic.findById(epicId);
      epics.push(epic);
    }
    res.status(200).send(epics);
  } catch (error) {
    console.error("getEpics", error);
    res.status(500).send();
  }
};

module.exports.addStoryToEpic = async (req, res) => {
  const { epicId } = req.params;
  const { storyId } = req.body;

  if (!epicId || !storyId) {
    res.status(400).send();
    return;
  }

  try {
    const epic = await Epic.findById(epicId);
    if (!epic.storyIds.includes(storyId)) {
      epic.storyIds.push(storyId);
    }
    await epic.save();
    res.status(204).send();
  } catch (error) {
    console.error("addStoryToEpic", error);
    res.status(500).send();
  }
};

module.exports.removeStoryFromEpic = async (req, res) => {
  const { epicId } = req.params;
  const { storyId } = req.body;

  if (!epicId || !storyId) {
    res.status(400).send();
    return;
  }

  try {
    const epic = await Epic.findById(epicId);
    if (epic.storyIds.includes(storyId)) {
      epic.storyIds.pull(storyId);
    }
    await epic.save();
    res.status(204).send();
  } catch (error) {
    console.error("addStoryToEpic", error);
    res.status(500).send();
  }
};

module.exports.deleteEpic = async (req, res) => {
  const { epicId } = req.params;

  if (!epicId) {
    res.status(400).send();
    return;
  }

  try {
    await Epic.findByIdAndDelete(epicId);
    res.status(204).send();
  } catch (error) {
    console.error("deleteEpic", error);
    res.status(500).send();
  }
};
