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
		let ticketNumber = 1;
    const project = await Project.findById(projectId);
    const latestTicketId = project.backlogIds[project.backlogIds.length - 1];
		if (latestTicketId) {
			const latestTicket = await Story.findById(latestTicketId); // if no tickets at all, will be null.
			ticketNumber = latestTicket.ticketNumber + 1;
		}

    const newStory = new Story({ title, ...keysToUpdate, ticketNumber });
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
  const { title, description, status, priority, type, dueDate, isInSprint, assigneeId } = req.body;

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
      assigneeId,
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
  const { projectId } = req.body;

  if (!storyId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    await Story.findByIdAndDelete(storyId);
    const project = await Project.findById(projectId);
    project.backlogIds.pull(storyId);
    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("deleteStory", error);
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
      if (story) {
        stories.push(story);
      }
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
