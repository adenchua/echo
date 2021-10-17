const Story = require("../models/story");
const Project = require("../models/project");
const { removeUndefinedKeysFromObject } = require("../utils/removeUndefinedKeysFromObject");

module.exports.createStory = async (req, res) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);
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

module.exports.addAssigneeToStory = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;

  if (!storyId || !userId) {
    res.status(400).send();
    return;
  }

  try {
    const story = await Story.findById(storyId);
    if (!story.assignees.includes(userId)) {
      story.assignees.push(userId);
    }

    await story.save();
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
    const story = await Story.findById(storyId);
    if (story.assignees.includes(userId)) {
      story.assignees.pull(userId);
    }

    await story.save();
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
