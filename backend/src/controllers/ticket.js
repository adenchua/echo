import projectService from "../services/projectService.js";
import ticketService from "../services/ticketService.js";

export const createTicket = async (req, res, next) => {
  const { title, projectId, priority, type } = req.body;

  try {
    const project = await projectService.getProject(projectId);

    if (project == null || project.isDeleted) {
      throw NO_PROJECT_ERROR;
    }

    const newTicket = ticketService.createTicket(projectId, { title, priority, type });
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
    await ticketService.updateTicket(ticketId, {
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
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (req, res, next) => {
  const { ticketId } = req.params;
  // const { projectId } = req.body;

  try {
    await ticketService.deleteTicket(ticketId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  const { ticketIds } = req.body;

  try {
    const tickets = await ticketService.getTickets(ticketIds);
    res.send(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  const { ticketId } = req.params;

  try {
    const [ticket] = await ticketService.getTickets([ticketId]);
    res.send(ticket);
  } catch (error) {
    next(error);
  }
};
