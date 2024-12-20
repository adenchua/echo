import { useContext } from "react";

import endSprint from "../api/sprints/endSprint";
import startSprint from "../api/sprints/startSprint";
import { ActiveSprintContext } from "../contexts/ActiveSprintContextProvider";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import Sprint from "../types/Sprint";

interface HookInterface {
  onStartSprint: (projectId: string, endDate: Date | null) => Promise<Sprint>;
  onEndSprint: (projectId: string, sprintId: string) => Promise<Sprint>;
}

const useSprintBacklog = (): HookInterface => {
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
    } catch {
      throw new Error("Failed to start sprint");
    }
  };

  const onEndSprint = async (projectId: string, sprintId: string): Promise<Sprint> => {
    try {
      const completedSprint = await endSprint(projectId, sprintId);
      handleRemoveActiveSprint();
      removeCompletedTickets();
      return completedSprint;
    } catch {
      throw new Error("Failed to end sprint");
    }
  };

  return { onStartSprint, onEndSprint };
};

export default useSprintBacklog;
