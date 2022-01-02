import React, { createContext, useState, ReactNode, useCallback } from "react";

import EpicInterface from "../../types/EpicInterface";

interface EpicsContextProviderProps {
  children: ReactNode;
}

type EpicsContextStateType = {
  epics: EpicInterface[];
  addEpic: (epics: EpicInterface) => void;
  handleSetEpics: (epics: EpicInterface[]) => void;
  addTicketIdToEpic: (epicId: string, ticketId: string) => void;
};

const epicContextDefaultProps: EpicsContextStateType = {
  epics: [],
  addEpic: () => {},
  handleSetEpics: () => {},
  addTicketIdToEpic: () => {},
};

export const EpicsContext = createContext<EpicsContextStateType>(epicContextDefaultProps);

const EpicsContextProvider = ({ children }: EpicsContextProviderProps): JSX.Element => {
  const [epics, setEpics] = useState<EpicInterface[]>([]);

  const addEpic = useCallback((newEpic: EpicInterface): void => {
    setEpics((prevState) => [...prevState, newEpic]);
  }, []);

  const handleSetEpics = useCallback((newEpics: EpicInterface[]): void => {
    setEpics(newEpics);
  }, []);

  const addTicketIdToEpic = useCallback((epicId: string, ticketId: string): void => {
    setEpics((prevState) =>
      prevState.map((epic) => {
        if (epic._id === epicId) {
          if (!epic.ticketIds.includes(ticketId)) {
            epic.ticketIds.push(ticketId);
          }
        }
        return epic;
      })
    );
  }, []);

  return (
    <EpicsContext.Provider value={{ epics, addEpic, handleSetEpics, addTicketIdToEpic }}>
      {children}
    </EpicsContext.Provider>
  );
};

export default EpicsContextProvider;
