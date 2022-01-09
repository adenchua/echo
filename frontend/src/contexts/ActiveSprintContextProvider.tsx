import React, { createContext, useState, ReactNode, useCallback } from "react";

import SprintInterface from "../types/SprintInterface";

interface ActiveSprintContextProviderProps {
  children: ReactNode;
}

type ActiveSprintContextStateType = {
  activeSprint: SprintInterface | null;
  handleSetActiveSprint: (newActiveSprint: SprintInterface) => void;
  handleRemoveActiveSprint: () => void;
};

const activeContextDefaultState: ActiveSprintContextStateType = {
  activeSprint: null,
  handleRemoveActiveSprint: () => {},
  handleSetActiveSprint: () => {},
};

export const ActiveSprintContext = createContext<ActiveSprintContextStateType>(activeContextDefaultState);

const ActiveSprintContextProvider = ({ children }: ActiveSprintContextProviderProps): JSX.Element => {
  const [activeSprint, setActiveSprint] = useState<SprintInterface | null>(null);

  const handleSetActiveSprint = useCallback((newActiveSprint: SprintInterface) => {
    setActiveSprint(newActiveSprint);
  }, []);

  const handleRemoveActiveSprint = useCallback(() => {
    setActiveSprint(null);
  }, []);

  return (
    <ActiveSprintContext.Provider value={{ activeSprint, handleSetActiveSprint, handleRemoveActiveSprint }}>
      {children}
    </ActiveSprintContext.Provider>
  );
};

export default ActiveSprintContextProvider;
