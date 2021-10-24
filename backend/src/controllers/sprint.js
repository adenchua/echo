const Project = require("../models/project");
const Sprint = require("../models/sprint");
const Story = require("../models/story");

module.exports.startSprint = async (req, res) => {
  const { storyIds, projectId } = req.body;

  if (!storyIds || projectId || !Array.isArray(storyIds)) {
    res.status(400).send();
    return;
  }

  if (storyIds.length === 0) {
    res.status(400).send({ message: "unable to start sprint without a story" });
    return;
  }

  try {
    const project = await Project.findById(projectId);
    const sprintNumber = project.sprints.length + 1;
    const newSprint = new Sprint({ number: sprintNumber, incompletedStories: storyIds });
    await newSprint.save();
    project.sprints.push(newSprint._id);

    project.backlog = project.backlog.filter((backlogId) => !storyIds.includes(backlogId));
    await project.save();
    res.status(201).send(newSprint);
  } catch (error) {
    console.error("startSprint", error);
    res.status(500).send();
  }
};

module.exports.endSprint = async (req, res) => {
  const { sprintId, projectId } = req.body;
  const completedStoryIds = [];
  const incompleteStoryIds = [];

  if (!sprintId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    const sprint = await Sprint.findById(sprintId);

    if (sprint.hasEnded) {
      res.status(400).send({ message: "Sprint has already ended" });
      return;
    }
    const project = await Project.findById(projectId);
    for (const storyId of sprint.incompleteStories) {
      const story = await Story.findById(storyId);
      if (story.status === "completed") {
        completedStoryIds.push(story._id);
      } else {
        incompleteStoryIds.push(story._id);
      }
    }

    sprint.hasEnded = true;
    sprint.completedStories = completedStoryIds;
    sprint.incompleteStories = incompleteStoryIds;
    project.backlog = [...project.backlog, ...incompleteStoryIds];
    await sprint.save();
    await project.save();
    res.status(200).send(sprint);
  } catch (error) {
    console.error("endSprint", error);
    res.status(500).send();
  }
};

module.exports.getSprints = async (req, res) => {
  const { sprintIds } = req.body;
  const sprints = [];

  if (!sprintIds || !Array.isArray(sprintIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const sprintId of sprintIds) {
      const sprint = await Sprint.findById(sprintId);
      sprints.push(sprint);
    }

    res.status(200).send(sprints);
  } catch (error) {
    console.error("getSprints", error);
    res.status(500).send();
  }
};

module.exports.getSprint = async (req, res) => {
  const { sprintId } = req.params;

  if (!sprintId) {
    res.status(400).send();
    return;
  }

  try {
    const sprint = await Sprint.findById(sprintId);
    res.status(200).send(sprint);
  } catch (error) {
    console.error("getSprint", error);
    res.status(500).send();
  }
};

module.exports.addBacklogToSprint = async (req, res) => {
  const { sprintId } = req.params;
  const { projectId, storyId } = req.body;

  if (!sprintId || !projectId || !storyId) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);
    const sprint = await Sprint.findById(sprintId);

    if (project.backlog.includes(storyId)) {
      project.backlog.pull(storyId);
    }

    if (!sprint.incompleteStories.includes(storyId)) {
      sprint.incompleteStories.push(storyId);
    }

    await project.save();
    await sprint.save();
    res.status(204).send();
  } catch (error) {
    console.error("addBacklogToSprint", error);
    res.status(500).send();
  }
};
