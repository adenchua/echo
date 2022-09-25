import { createContext, useState, ReactNode, useCallback } from "react";

import Epic from "../types/Epic";

interface EpicsContextProviderProps {
  children: ReactNode;
}

type EpicsContextStateType = {
  epics: Epic[];
  addEpic: (newEpic: Epic) => void;
  handleSetEpics: (epics: Epic[]) => void;
  addTicketIdToEpic: (epicId: string, ticketId: string) => void;
  deleteTicketIdFromEpic: (epicId: string, ticketId: string) => void;
  deleteEpic: (epicId: string) => void;
};

const epicContextDefaultProps: EpicsContextStateType = {
  epics: [],
  addEpic: () => {},
  handleSetEpics: () => {},
  addTicketIdToEpic: () => {},
  deleteTicketIdFromEpic: () => {},
  deleteEpic: () => {},
};

export const EpicsContext = createContext<EpicsContextStateType>(epicContextDefaultProps);

const EpicsContextProvider = ({ children }: EpicsContextProviderProps): JSX.Element => {
  const [epics, setEpics] = useState<Epic[]>([]);

  const addEpic = useCallback((newEpic: Epic): void => {
    setEpics((prevState) => [...prevState, newEpic]);
  }, []);

  const deleteEpic = useCallback((epicId: string): void => {
    setEpics((prevState) => prevState.filter((epic) => epic._id !== epicId));
  }, []);

  const handleSetEpics = useCallback((newEpics: Epic[]): void => {
    setEpics(newEpics);
  }, []);

  const addTicketIdToEpic = useCallback((epicId: string, ticketId: string): void => {
    // remove ticket id from all epics
    setEpics((prevState) =>
      prevState.map((epic) => {
        if (epic.ticketIds.includes(ticketId)) {
          epic.ticketIds = epic.ticketIds.filter((_ticketId) => _ticketId !== ticketId);
        }
        return epic;
      })
    );

    // add ticket id to the new epic
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

  const deleteTicketIdFromEpic = useCallback((epicId: string, ticketId: string): void => {
    setEpics((prevState) =>
      prevState.map((epic) => {
        if (epic._id === epicId) {
          if (epic.ticketIds.includes(ticketId)) {
            epic.ticketIds = epic.ticketIds.filter((_ticketId) => _ticketId !== ticketId);
          }
        }
        return epic;
      })
    );
  }, []);

  return (
    <EpicsContext.Provider
      value={{ epics, addEpic, handleSetEpics, addTicketIdToEpic, deleteTicketIdFromEpic, deleteEpic }}
    >
      {children}
    </EpicsContext.Provider>
  );
};

export default EpicsContextProvider;
