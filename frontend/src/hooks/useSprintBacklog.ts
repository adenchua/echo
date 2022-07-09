import { useContext } from "react";

import Sprint from "../types/Sprint";
import startSprint from "../api/sprints/startSprint";
import endSprint from "../api/sprints/endSprint";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import { ActiveSprintContext } from "../contexts/ActiveSprintContextProvider";

const useSprintBacklog = () => {
  const { removeCompletedTickets } = useContext(TicketsContext);
  const { handleRemoveActiveSprint, handleSetActiveSprint } = useContext(ActiveSprintContext);

  const onStartSprint = async (projectId: string, endDate: Date | null): Promise<Sprint> => {
    try {
      if (!endDate) {
        throw new Error("No end date specified");
      }
      const newSprint = await startSprint(projectId, endDate.toISOString());
      handleSetActiveSprint(newSprint);
      return newSprint;
    } catch (error) {
      throw new Error("Failed to start sprint");
    }
  };

  const onEndSprint = async (projectId: string, sprintId: string): Promise<Sprint> => {
    try {
      const completedSprint = await endSprint(projectId, sprintId);
      handleRemoveActiveSprint();
      removeCompletedTickets();
      return completedSprint;
    } catch (error) {
      throw new Error("Failed to end sprint");
    }
  };

  return { onStartSprint, onEndSprint };
};

export default useSprintBacklog;
