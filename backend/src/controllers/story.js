const Story = require("../models/story");
const Project = require("../models/project");
const removeUndefinedKeysFromObject = require("../utils/removeUndefinedKeysFromObject");

module.exports.createStory = async (req, res) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(404).send();
      return;
    }

    const newStory = new Story({ title });
    await newStory.save();
    project.backlog.push(newStory._id);
    await project.save();
    res.status(201).send(newStory);
  } catch (error) {
    console.error("createStory error", error);
    res.status(500).send();
  }
};

module.exports.updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { title, description, status, weight, priority, type } = req.body;

  if (!storyId) {
    res.status(400).send();
    return;
  }

  try {
    const keysToUpdate = removeUndefinedKeysFromObject({ title, description, status, weight, priority, type });
    await Story.findByIdAndUpdate(storyId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateStory", error);
    res.status(500).send();
  }
};

module.exports.deleteStory = async (req, res) => {
  const { storyId } = req.params;

  if (!storyId) {
    res.status(400).send();
    return;
  }

  try {
    await Story.findByIdAndDelete(storyId);
    res.status(204).send();
  } catch (error) {
    console.error("deleteStory", error);
    res.status(500).send();
  }
};
