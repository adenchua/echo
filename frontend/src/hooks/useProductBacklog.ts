import { useContext } from "react";

import createTicket from "../api/tickets/createTicket";
import updateTicket from "../api/tickets/updateTicket";
import { TicketPriority, TicketType, TicketUpdateFields } from "../types/Ticket";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import deleteTicket from "../api/tickets/deleteTicket";
import addTicketToEpic from "../api/epics/addTicketToEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import removeTicketFromEpic from "../api/epics/removeTicketFromEpic";
import addTicketSubtask from "../api/tickets/addTicketSubtask";
import deleteTicketSubtask from "../api/tickets/deleteTicketSubtask";

const useProductBacklog = () => {
  const {
    addTicket,
    updateTicket: updateTicketContext,
    deleteTicket: deleteTicketContext,
    addSubtaskIdToTicket: addSubtaskIdToTicketContext,
    removeSubtaskIdFromTicket: removeSubtaskIdFromTicketContext,
  } = useContext(TicketsContext);
  const { addTicketIdToEpic, deleteTicketIdFromEpic } = useContext(EpicsContext);

  const onAddTicket = async (
    title: string,
    projectId: string,
    priority: TicketPriority,
    type: TicketType
  ): Promise<void> => {
    try {
      const newTicket = await createTicket(title, projectId, priority, type);
      addTicket(newTicket);
    } catch (error) {
      throw new Error("Failed to create ticket");
    }
  };

  const onUpdateTicket = async (ticketId: string, updatedFields: TicketUpdateFields): Promise<void> => {
    try {
      await updateTicket(ticketId, updatedFields);
      updateTicketContext(ticketId, updatedFields);
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  };

  const onDeleteTicket = async (ticketId: string, projectId: string, epicId: string): Promise<void> => {
    try {
      await deleteTicket(ticketId, projectId);
      deleteTicketContext(ticketId);
      if (epicId) {
        deleteTicketIdFromEpic(epicId, ticketId); // delete ticket from epic
      }
    } catch (error) {
      throw new Error("Failed to delete ticket");
    }
  };

  const onAddTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await addTicketToEpic(ticketId, epicId);
      addTicketIdToEpic(epicId, ticketId);
      updateTicketContext(ticketId, { epicId });
    } catch (error) {
      throw new Error("Failed to add ticket to epic");
    }
  };

  const onRemoveTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await removeTicketFromEpic(ticketId, epicId);
      deleteTicketIdFromEpic(epicId, ticketId);
      updateTicketContext(ticketId, { epicId: "" });
    } catch (error) {
      throw new Error("Failed to remove ticket from epic");
    }
  };

  const onAddSubtaskToTicket = async (ticketId: string, title: string): Promise<void> => {
    try {
      const newSubtask = await addTicketSubtask(ticketId, title);
      addSubtaskIdToTicketContext(ticketId, newSubtask._id);
    } catch (error) {
      throw new Error("Failed to add subtask to ticket");
    }
  };

  const onDeleteSubtaskFromTicket = async (ticketId: string, subtaskId: string): Promise<void> => {
    try {
      await deleteTicketSubtask(subtaskId);
      removeSubtaskIdFromTicketContext(ticketId, subtaskId);
    } catch (error) {
      throw new Error("Failed to delete subtask from ticket");
    }
  };

  return {
    onAddTicket,
    onUpdateTicket,
    onDeleteTicket,
    onAddTicketToEpic,
    onRemoveTicketFromEpic,
    onAddSubtaskToTicket,
    onDeleteSubtaskFromTicket,
  };
};

export default useProductBacklog;
