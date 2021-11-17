import { useContext, useEffect, useState } from "react";

import SprintInterface from "../types/SprintInterface";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import startSprint from "../api/sprints/startSprint";
import endSprint from "../api/sprints/endSprint";
import { TicketsContext } from "../components/contexts/TicketsContextProvider";

const useSprintBacklog = (sprintIds: string[] = []) => {
  const [activeSprint, setActiveSprint] = useState<SprintInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { removeCompletedTickets } = useContext(TicketsContext);

  useEffect(() => {
    let isMounted = true;

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

    getActiveSprint();

    return () => {
      isMounted = false;
    };
  }, [sprintIds]);

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
      removeCompletedTickets();
      return completedSprint;
    } catch (error) {
      throw new Error("Failed to end sprint");
    }
  };

  return { isLoading, activeSprint, onStartSprint, onEndSprint };
};

export default useSprintBacklog;
