import { useContext } from "react";

import createStory from "../api/stories/createStory";
import updateTicket from "../api/stories/updateTicket";
import { PriorityType, StoryType, TicketUpdateFieldsType } from "../types/StoryInterface";
import { TicketsContext } from "../components/contexts/TicketsContextProvider";
import deleteTicket from "../api/stories/deleteTicket";
import addTicketToEpic from "../api/epics/addTicketToEpic";
import { EpicsContext } from "../components/contexts/EpicsContextProvider";
import removeTicketFromEpic from "../api/epics/removeTicketFromEpic";

const useProductBacklog = () => {
  const {
    addTicket,
    updateTicket: updateTicketContext,
    deleteTicket: deleteTicketContext,
  } = useContext(TicketsContext);
  const { addTicketIdToEpic, deleteTicketIdFromEpic } = useContext(EpicsContext);

  const onAddTicket = async (
    title: string,
    projectId: string,
    priority: PriorityType,
    type: StoryType
  ): Promise<void> => {
    try {
      const newTicket = await createStory(title, projectId, priority, type);
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

  const onDeleteTicket = async (ticketId: string, projectId: string): Promise<void> => {
    try {
      await deleteTicket(ticketId, projectId);
      deleteTicketContext(ticketId);
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  };

  const onAddTicketToEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await addTicketToEpic(ticketId, epicId);
      addTicketIdToEpic(epicId, ticketId); // update epic to have ticket id
      updateTicketContext(ticketId, { epicId }); // update ticket to have epic Id
    } catch (error) {
      throw new Error("Failed to add ticket to epic");
    }
  };

  const onRemoveTicketFromEpic = async (ticketId: string, epicId: string): Promise<void> => {
    try {
      await removeTicketFromEpic(ticketId, epicId);
      deleteTicketIdFromEpic(epicId, ticketId); // update epic to have ticket id
      updateTicketContext(ticketId, { epicId: "" }); // update ticket to have epic Id
    } catch (error) {
      throw new Error("Failed to remove ticket from epic");
    }
  };

  return { onAddTicket, onUpdateTicket, onDeleteTicket, onAddTicketToEpic, onRemoveTicketFromEpic };
};

export default useProductBacklog;
