const Project = require("../models/project");
const Sprint = require("../models/sprint");
const Story = require("../models/story");

module.exports.startSprint = async (req, res) => {
  const { projectId, endDateISOString } = req.body;

  if (!projectId || !endDateISOString) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);
    const sprintNumber = project.sprintIds.length + 1;
    const newSprint = new Sprint({ number: sprintNumber, endDate: endDateISOString });
    await newSprint.save();
    project.sprintIds.push(newSprint._id);
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
    for (const storyId of project.backlogIds) {
      const story = await Story.findById(storyId);
      if (story.isInSprint && story.status === "completed") {
        completedStoryIds.push(story._id);
      }
      if (story.isInSprint && story.status !== "completed") {
        incompleteStoryIds.push(story._id);
      }
    }

    completedStoryIds.forEach((storyId) => project.backlogIds.pull(storyId)); // remove completed tickets from product backlog

    sprint.hasEnded = true;
    sprint.completedStoryIds = completedStoryIds;
    sprint.incompleteStoryIds = incompleteStoryIds;
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
