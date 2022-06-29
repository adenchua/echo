import { useContext } from "react";

import createTicket from "../api/tickets/createTicket";
import updateTicket from "../api/tickets/updateTicket";
import { PriorityType, TicketType, TicketUpdateFieldsType } from "../types/TicketInterface";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import deleteTicket from "../api/tickets/deleteTicket";
import addTicketToEpic from "../api/epics/addTicketToEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import removeTicketFromEpic from "../api/epics/removeTicketFromEpic";
import addTicketSubtask from "../api/tickets/addTicketSubtask";

const useProductBacklog = () => {
  const {
    addTicket,
    updateTicket: updateTicketContext,
    deleteTicket: deleteTicketContext,
    addSubtaskIdToTicket: addSubtaskIdToTicketContext,
  } = useContext(TicketsContext);
  const { addTicketIdToEpic, deleteTicketIdFromEpic } = useContext(EpicsContext);

  const onAddTicket = async (
    title: string,
    projectId: string,
    priority: PriorityType,
    type: TicketType
  ): Promise<void> => {
    try {
      const newTicket = await createTicket(title, projectId, priority, type);
      addTicket(newTicket);
    } catch (error) {
      throw new Error("Failed to create ticket");
    }
  };

  const onUpdateTicket = async (ticketId: string, updatedFields: TicketUpdateFieldsType): Promise<void> => {
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
      throw new Error("Failed to update ticket");
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

  return {
    onAddTicket,
    onUpdateTicket,
    onDeleteTicket,
    onAddTicketToEpic,
    onRemoveTicketFromEpic,
    onAddSubtaskToTicket,
  };
};

export default useProductBacklog;
