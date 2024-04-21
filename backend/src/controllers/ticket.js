import Epic from "../models/epic.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

export const createTicket = async (req, res) => {
  const { title, projectId, priority, type } = req.body;

  if (!title || !projectId) {
    res.status(400).send();
    return;
  }

  const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({
    priority,
    type,
  });

  try {
    let ticketNumber = 1;
    const project = await Project.findById(projectId);
    const latestTicketId = project.backlogIds[project.backlogIds.length - 1];
    if (latestTicketId) {
      const latestTicket = await Ticket.findById(latestTicketId); // if no tickets at all, latestTicketId will be null.
      ticketNumber = latestTicket.ticketNumber + 1;
    }

    const newTicket = new Ticket({ title, ...keysToUpdate, ticketNumber });
    await newTicket.save();
    project.backlogIds.push(newTicket._id);
    await project.save();
    res.status(201).send(newTicket);
  } catch (error) {
    console.error("createTicket error", error);
    res.status(500).send();
  }
};

export const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { title, description, status, priority, type, dueDate, isInSprint, assigneeId, storyPoints } = req.body;

  if (!ticketId) {
    res.status(400).send();
    return;
  }

  try {
    const keysToUpdate = objectUtils.removeUndefinedKeysFromObject({
      title,
      description,
      status,
      priority,
      type,
      dueDate,
      isInSprint,
      assigneeId,
      storyPoints,
    });

    await Ticket.findByIdAndUpdate(ticketId, { ...keysToUpdate });
    res.status(204).send();
  } catch (error) {
    console.error("updateTicket", error);
    res.status(500).send();
  }
};

export const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { projectId } = req.body;

  if (!ticketId || !projectId) {
    res.status(400).send();
    return;
  }

  try {
    await Ticket.findByIdAndDelete(ticketId);
    await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove ticketids
    const project = await Project.findById(projectId);
    project.backlogIds.pull(ticketId);
    await project.save();
    res.status(204).send();
  } catch (error) {
    console.error("deleteTicket", error);
    res.status(500).send();
  }
};

export const getTickets = async (req, res) => {
  const { ticketIds } = req.body;
  const tickets = [];

  if (!ticketIds || !Array.isArray(ticketIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const ticketId of ticketIds) {
      const ticket = await Ticket.findById(ticketId);
      if (ticket) {
        tickets.push(ticket);
      }
    }

    res.status(200).send(tickets);
  } catch (error) {
    console.error("getTickets", error);
    res.status(500).send();
  }
};

export const getTicket = async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    res.status(400).send();
    return;
  }

  try {
    const ticket = await Ticket.findById(ticketId);
    res.status(200).send(ticket);
  } catch (error) {
    console.error("getTicket", error);
    res.status(500).send();
  }
};
