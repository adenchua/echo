import _ from "lodash";
import { useEffect, useState } from "react";
import createStory from "../api/stories/createStory";
import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";
import updateTicket from "../api/stories/updateTicket";
import StoryInterface, { PriorityType, StoryType, TicketUpdateFieldsType } from "../types/StoryInterface";

const useProductBacklog = (storyIds: string[] = []) => {
  const [tickets, setTickets] = useState<StoryInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const getTickets = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchStoriesByIds(storyIds);
        if (isMounted) {
          setTickets(response);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    getTickets();

    return () => {
      isMounted = false;
    };
  }, [storyIds]);

  const onAddTicket = async (
    title: string,
    projectId: string,
    priority: PriorityType,
    type: StoryType
  ): Promise<void> => {
    try {
      const newTicket = await createStory(title, projectId, priority, type);
      setTickets((prevState) => [...prevState, newTicket]);
    } catch (error) {
      throw new Error("Failed to create ticket");
    }
  };

  const onUpdateTicket = async (ticketId: string, updatedFields: TicketUpdateFieldsType): Promise<void> => {
    try {
      await updateTicket(ticketId, updatedFields);
      setTickets((prevState) =>
        prevState.map((ticket) => {
          if (ticket._id === ticketId) {
            ticket = _.merge({}, ticket, updatedFields);
          }
          return ticket;
        })
      );
    } catch (error) {
      throw new Error("Failed to update ticket");
    }
  };

  return { tickets, isLoading, onAddTicket, onUpdateTicket };
};

export default useProductBacklog;
