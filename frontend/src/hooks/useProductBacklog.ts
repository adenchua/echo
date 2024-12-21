import { useContext } from "react";

import addTicketToEpic from "../api/epics/addTicketToEpic";
import removeTicketFromEpic from "../api/epics/removeTicketFromEpic";
import addTicketSubtask from "../api/tickets/addTicketSubtask";
import createTicket from "../api/tickets/createTicket";
import deleteTicket from "../api/tickets/deleteTicket";
import deleteTicketSubtask from "../api/tickets/deleteTicketSubtask";
import updateTicket from "../api/tickets/updateTicket";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import { TicketPriority, TicketType, TicketUpdateFields } from "../types/Ticket";

interface HookResponse {
  onAddTicket: (
    title: string,
    projectId: string,
    priority: TicketPriority,
    type: TicketType,
    epicId?: string,
  ) => Promise<void>;
  onUpdateTicket: (ticketId: string, updatedFields: TicketUpdateFields) => Promise<void>;
  onDeleteTicket: (ticketId: string, projectId: string, epicId: string) => Promise<void>;
  onAddTicketToEpic: (ticketId: string, epicId: string) => Promise<void>;
  onRemoveTicketFromEpic: (ticketId: string, epicId: string) => Promise<void>;
  onAddSubtaskToTicket: (ticketId: string, title: string) => Promise<void>;
  onDeleteSubtaskFromTicket: (ticketId: string, title: string) => Promise<void>;
}

const useProductBacklog = (): HookResponse => {
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
    type: TicketType,
    epicId?: string,
  ): Promise<void> => {
    try {
      const newTicket = await createTicket(title, projectId, priority, type);
      addTicket(newTicket);

      // if epic id provided, link ticket with epic
      if (epicId) {
        await onAddTicketToEpic(newTicket._id, epicId);
      }
    } catch {
      throw new Error("Failed to create ticket");
    }
  };

  const onUpdateTicket = async (
    ticketId: string,
    updatedFields: TicketUpdateFields,
  ): Promise<void> => {
    try {
      await updateTicket(ticketId, updatedFields);
      updateTicketContext(ticketId, updatedFields);
    } catch {
      throw new Error("Failed to update ticket");
    }
  };

  const onDeleteTicket = async (
    ticketId: string,
    projectId: string,
    epicId: string,
  ): Promise<void> => {
    try {
      await deleteTicket(ticketId, projectId);
      deleteTicketContext(ticketId);
      if (epicId) {
        deleteTicketIdFromEpic(epicId, ticketId); // delete ticket from epic
      }
    } catch {
      throw new Error("Failed to delete ticket");
    }
  };

  const onAddTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await addTicketToEpic(ticketId, epicId);
      addTicketIdToEpic(epicId, ticketId);
      updateTicketContext(ticketId, { epicId });
    } catch {
      throw new Error("Failed to add ticket to epic");
    }
  };

  const onRemoveTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await removeTicketFromEpic(ticketId, epicId);
      deleteTicketIdFromEpic(epicId, ticketId);
      updateTicketContext(ticketId, { epicId: "" });
    } catch {
      throw new Error("Failed to remove ticket from epic");
    }
  };

  const onAddSubtaskToTicket = async (ticketId: string, title: string): Promise<void> => {
    try {
      const newSubtask = await addTicketSubtask(ticketId, title);
      addSubtaskIdToTicketContext(ticketId, newSubtask._id);
    } catch {
      throw new Error("Failed to add subtask to ticket");
    }
  };

  const onDeleteSubtaskFromTicket = async (ticketId: string, subtaskId: string): Promise<void> => {
    try {
      await deleteTicketSubtask(subtaskId);
      removeSubtaskIdFromTicketContext(ticketId, subtaskId);
    } catch {
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
