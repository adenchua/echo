import React, { createContext, useState, ReactNode, useCallback } from "react";

import ProjectInterface from "../../types/ProjectInterface";

interface UserProjectsContextProviderProps {
  children: ReactNode;
}

type UserProjectsContextStateType = {
  projects: ProjectInterface[];
  addProject: (project: ProjectInterface) => void;
  handleSetProject: (projects: ProjectInterface[]) => void;
};

const ticketContextDefaultValues: UserProjectsContextStateType = {
  projects: [],
  addProject: () => {},
  handleSetProject: () => {},
};

export const UserProjectsContext = createContext<UserProjectsContextStateType>(ticketContextDefaultValues);

const UserProjectsContextProvider = ({ children }: UserProjectsContextProviderProps): JSX.Element => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  const addProject = useCallback((newProject: ProjectInterface): void => {
    setProjects((prevState) => [...prevState, newProject]);
  }, []);

  const handleSetProject = useCallback((newProjects: ProjectInterface[]): void => {
    setProjects(newProjects);
  }, []);

  return (
    <UserProjectsContext.Provider value={{ projects, addProject, handleSetProject }}>
      {children}
    </UserProjectsContext.Provider>
  );
};

export default UserProjectsContextProvider;
