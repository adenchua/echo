import Epic from "../models/epic.js";
import Project from "../models/project.js";
import Ticket from "../models/ticket.js";
import objectUtils from "../utils/objectUtils.js";

export const createTicket = async (req, res, next) => {
  const { title, projectId, priority, type } = req.body;

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
    next(error);
  }
};

export const updateTicket = async (req, res, next) => {
  const { ticketId } = req.params;
  const {
    title,
    description,
    status,
    priority,
    type,
    dueDate,
    isInSprint,
    assigneeId,
    storyPoints,
  } = req.body;

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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  const { ticketId } = req.params;
  const { projectId } = req.body;

  try {
    await Ticket.findByIdAndDelete(ticketId);
    await Epic.updateMany({ ticketIds: ticketId }, { $pullAll: { ticketIds: [ticketId] } }); // remove ticketids
    const project = await Project.findById(projectId);
    project.backlogIds.pull(ticketId);
    await project.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  const { ticketIds } = req.body;
  const tickets = [];

  try {
    for (const ticketId of ticketIds) {
      const ticket = await Ticket.findById(ticketId);
      if (ticket) {
        tickets.push(ticket);
      }
    }

    res.send(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);
    res.send(ticket);
  } catch (error) {
    next(error);
  }
};
