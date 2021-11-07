const Story = require("../models/story");
const Project = require("../models/project");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

module.exports.createStory = async (req, res) => {
  const { title, projectId, priority, type } = req.body;

  if (!title || !projectId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = removeUndefinedKeysFromObject({
    priority,
    type,
  });

  try {
    const project = await Project.findById(projectId);
    const newStory = new Story({ title, ...keysToUpdate });
    await newStory.save();
    project.backlogIds.push(newStory._id);
    await project.save();
    res.status(201).send(newStory);
  } catch (error) {
    console.error("createStory error", error);
    res.status(500).send();
  }
};

module.exports.updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { title, description, status, priority, type, dueDate, isInSprint } = req.body;

  if (!storyId) {
    res.status(400).send();
    return;
  }

  try {
    const keysToUpdate = removeUndefinedKeysFromObject({
      title,
      description,
      status,
      priority,
      type,
      dueDate,
      isInSprint,
    });
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

module.exports.addAssigneeToStory = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;

  if (!storyId || !userId) {
    res.status(400).send();
    return;
  }

  try {
    await Story.findByIdAndUpdate(storyId, { assigneeId: userId });
    res.status(204).send();
  } catch (error) {
    console.error("addAssigneeToStory", error);
    res.status(500).send();
  }
};

module.exports.removeAssigneeFromStory = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;

  if (!storyId || !userId) {
    res.status(400).send();
    return;
  }

  try {
    await Story.findByIdAndUpdate(storyId, { assigneeId: undefined });
    res.status(204).send();
  } catch (error) {
    console.error("removeAssigneeFromStory", error);
    res.status(500).send();
  }
};

module.exports.getStories = async (req, res) => {
  const { storyIds } = req.body;
  const stories = [];

  if (!storyIds || !Array.isArray(storyIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const storyId of storyIds) {
      const story = await Story.findById(storyId);
      stories.push(story);
    }

    res.status(200).send(stories);
  } catch (error) {
    console.error("getStories", error);
    res.status(500).send();
  }
};

module.exports.getStory = async (req, res) => {
  const { storyId } = req.params;

  if (!storyId) {
    res.status(400).send();
    return;
  }

  try {
    const story = await Story.findById(storyId);
    res.status(200).send(story);
  } catch (error) {
    console.error("getStory", error);
    res.status(500).send();
  }
};
