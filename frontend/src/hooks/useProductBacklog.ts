import { useContext } from "react";

import createStory from "../api/stories/createStory";
import updateTicket from "../api/stories/updateTicket";
import { PriorityType, StoryType, TicketUpdateFieldsType } from "../types/StoryInterface";
import { TicketsContext } from "../components/contexts/TicketsContextProvider";
import deleteTicket from "../api/stories/deleteTicket";

const useProductBacklog = () => {
  const {
    addTicket,
    updateTicket: updateTicketContext,
    deleteTicket: deleteTicketContext,
  } = useContext(TicketsContext);

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

  const onDeleteTicket = async (ticketId: string): Promise<void> => {
    try {
      await deleteTicket(ticketId);
      deleteTicketContext(ticketId);
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  };

  return { onAddTicket, onUpdateTicket, onDeleteTicket };
};

export default useProductBacklog;
