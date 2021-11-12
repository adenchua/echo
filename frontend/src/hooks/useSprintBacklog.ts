import { useEffect, useState } from "react";
import _ from "lodash";

import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";
import updateTicket from "../api/stories/updateTicket";
import StoryInterface, { TicketUpdateFieldsType } from "../types/StoryInterface";
import SprintInterface from "../types/SprintInterface";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import startSprint from "../api/sprints/startSprint";
import endSprint from "../api/sprints/endSprint";

const useSprintBacklog = (storyIds: string[] = [], sprintIds: string[] = []) => {
  const [tickets, setTickets] = useState<StoryInterface[]>([]);
  const [activeSprint, setActiveSprint] = useState<SprintInterface | null>(null);
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

    const getActiveSprint = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchSprintsByIds(sprintIds);
        const activeSprint = response.find((sprint) => sprint.hasEnded === false);
        if (isMounted) {
          if (activeSprint) {
            setActiveSprint(activeSprint);
          }
          setIsLoading(false);
        }
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    getTickets();
    getActiveSprint();

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

  const onStartSprint = async (projectId: string, endDate: Date | null): Promise<SprintInterface> => {
    try {
      if (!endDate) {
        throw new Error("No end date specified");
      }
      const newSprint = await startSprint(projectId, endDate.toISOString());
      setActiveSprint(newSprint);
      return newSprint;
    } catch (error) {
      throw new Error("Failed to start sprint");
    }
  };

  const onEndSprint = async (projectId: string, sprintId: string): Promise<SprintInterface> => {
    try {
      const completedSprint = await endSprint(projectId, sprintId);
      setActiveSprint(null);
      const incompleteTickets = tickets.filter((ticket) => ticket.status !== "completed");
      setTickets(incompleteTickets);
      return completedSprint;
    } catch (error) {
      throw new Error("Failed to end sprint");
    }
  };

  return { tickets, isLoading, onUpdateTicket, activeSprint, onStartSprint, onEndSprint };
};

export default useSprintBacklog;
