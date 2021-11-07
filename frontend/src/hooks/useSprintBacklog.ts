import { useEffect, useState } from "react";
import _ from "lodash";

import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";
import updateTicket from "../api/stories/updateTicket";
import StoryInterface, { TicketUpdateFieldsType } from "../types/StoryInterface";
import SprintInterface from "../types/SprintInterface";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";

const useSprintBacklog = (storyIds: string[] = [], sprintIds: string[] = []) => {
  const [tickets, setTickets] = useState<StoryInterface[]>([]);
  const [sprint, setSprint] = useState<SprintInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const getTickets = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchStoriesByIds(storyIds);
        const sprintTickets = response.filter((ticket) => ticket.isInSprint === true);
        if (isMounted) {
          setTickets(sprintTickets);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getSprints = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchSprintsByIds(sprintIds);
        const [currentSprint] = response.sort((a, b) => a.number - b.number);
        if (isMounted) {
          setSprint(currentSprint);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    getTickets();
    getSprints();

    return () => {
      isMounted = false;
    };
  }, [storyIds, sprintIds]);

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

  return { tickets, isLoading, onUpdateTicket, sprint };
};

export default useSprintBacklog;
