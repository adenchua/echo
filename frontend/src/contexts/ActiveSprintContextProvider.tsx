import { createContext, useState, ReactNode, useCallback } from "react";

import Sprint from "../types/Sprint";

interface ActiveSprintContextProviderProps {
  children: ReactNode;
}

type ActiveSprintContextStateType = {
  activeSprint: Sprint | null;
  handleSetActiveSprint: (newActiveSprint: Sprint) => void;
  handleRemoveActiveSprint: () => void;
};

const activeContextDefaultState: ActiveSprintContextStateType = {
  activeSprint: null,
  handleRemoveActiveSprint: () => {},
  handleSetActiveSprint: () => {},
};

export const ActiveSprintContext =
  createContext<ActiveSprintContextStateType>(activeContextDefaultState);

const ActiveSprintContextProvider = ({
  children,
}: ActiveSprintContextProviderProps): JSX.Element => {
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);

  const handleSetActiveSprint = useCallback((newActiveSprint: Sprint) => {
    setActiveSprint(newActiveSprint);
  }, []);

  const handleRemoveActiveSprint = useCallback(() => {
    setActiveSprint(null);
  }, []);

  return (
    <ActiveSprintContext.Provider
      value={{ activeSprint, handleSetActiveSprint, handleRemoveActiveSprint }}
    >
      {children}
    </ActiveSprintContext.Provider>
  );
};

export default ActiveSprintContextProvider;
