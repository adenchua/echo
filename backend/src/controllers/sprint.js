import Project from "../models/project.js";
import Sprint from "../models/sprint.js";
import Ticket from "../models/ticket.js";
import { errorMessages } from "../utils/errorMessages.js";

export const startSprint = async (req, res, next) => {
  const { projectId, endDateISOString } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
      return;
    }

    for (const sprintId of project.sprintIds) {
      const sprint = await Sprint.findById(sprintId);
      if (!sprint.hasEnded) {
        // already has active sprint
        res.status(400).send({ error: "Active sprint exists" });
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
    next(error);
  }
};

export const endSprint = async (req, res, next) => {
  const { sprintId, projectId } = req.body;
  const completedTicketIds = [];
  const incompleteTicketIds = [];

  try {
    const sprint = await Sprint.findById(sprintId);

    if (sprint.hasEnded) {
      res.status(400).send({ error: "Sprint has already ended" });
      return;
    }

    const project = await Project.findById(projectId);

    if (!project || project.isDeleted) {
      res.status(400).send({ error: errorMessages.projectNotExists });
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
    res.send(sprint);
  } catch (error) {
    next(error);
  }
};

export const getSprints = async (req, res, next) => {
  const { sprintIds } = req.body;
  const sprints = [];

  try {
    for (const sprintId of sprintIds) {
      const sprint = await Sprint.findById(sprintId);
      if (sprint) {
        sprints.push(sprint);
      }
    }

    res.send(sprints);
  } catch (error) {
    next(error);
  }
};

export const getSprint = async (req, res, next) => {
  const { sprintId } = req.params;

  try {
    const sprint = await Sprint.findById(sprintId);
    res.send(sprint);
  } catch (error) {
    next(error);
  }
};
