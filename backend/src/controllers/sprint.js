import Sprint from "../models/sprint.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";

export const startSprint = async (req, res) => {
  const { projectId, endDateISOString } = req.body;

  if (!projectId || !endDateISOString) {
    res.status(400).send();
    return;
  }

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ message: "Project may not exist anymore" });
      return;
    }

    for (const sprintId of project.sprintIds) {
      const sprint = await Sprint.findById(sprintId);
      if (!sprint.hasEnded) {
        // already has active sprint
        res.status(400).send({ messsage: "Active sprint exists" });
        return;
      }
    }

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

export const endSprint = async (req, res) => {
  const { sprintId, projectId } = req.body;
  const completedTicketIds = [];
  const incompleteTicketIds = [];

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

    if (!project || project.isDeleted) {
      res.status(400).send({ message: "Project may not exist anymore" });
      return;
    }

    for (const ticketId of project.backlogIds) {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        project.backlogIds.pull(ticketId); // remove invalid ticket from backlog
        continue; // invalid ticketIds will return null, causing the next statements to break
      }
      if (ticket.isInSprint && ticket.status === "completed") {
        ticket.isInSprint = false;
        await ticket.save(); // update ticket tor inSprint status
        completedTicketIds.push(ticket._id);
      }
      if (ticket.isInSprint && ticket.status !== "completed") {
        incompleteTicketIds.push(ticket._id);
      }
    }

    completedTicketIds.forEach((ticketId) => project.backlogIds.pull(ticketId)); // remove completed tickets from product backlog

    sprint.hasEnded = true;
    sprint.completedTicketIds = completedTicketIds;
    sprint.incompleteTicketIds = incompleteTicketIds;
    await sprint.save();
    await project.save();
    res.status(200).send(sprint);
  } catch (error) {
    console.error("endSprint", error);
    res.status(500).send();
  }
};

export const getSprints = async (req, res) => {
  const { sprintIds } = req.body;
  const sprints = [];

  if (!sprintIds || !Array.isArray(sprintIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const sprintId of sprintIds) {
      const sprint = await Sprint.findById(sprintId);
      if (sprint) {
        sprints.push(sprint);
      }
    }

    res.status(200).send(sprints);
  } catch (error) {
    console.error("getSprints", error);
    res.status(500).send();
  }
};

export const getSprint = async (req, res) => {
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
