import React, { createContext, useState, ReactNode, useCallback } from "react";

import EpicInterface from "../../types/EpicInterface";

interface EpicsContextProviderProps {
  children: ReactNode;
}

type EpicsContextStateType = {
  epics: EpicInterface[];
  addEpic: (epics: EpicInterface) => void;
  handleSetEpics: (epics: EpicInterface[]) => void;
};

const epicContextDefaultProps: EpicsContextStateType = {
  epics: [],
  addEpic: () => {},
  handleSetEpics: () => {},
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

  return <EpicsContext.Provider value={{ epics, addEpic, handleSetEpics }}>{children}</EpicsContext.Provider>;
};

export default EpicsContextProvider;
