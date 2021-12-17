import React, { createContext, useState, ReactNode, useCallback } from "react";
import _ from "lodash";

import ProjectInterface, { ProjectUpdateFieldsType } from "../../types/ProjectInterface";

interface UserProjectsContextProviderProps {
  children: ReactNode;
}

type UserProjectsContextStateType = {
  projects: ProjectInterface[];
  addProject: (project: ProjectInterface) => void;
  handleSetProject: (projects: ProjectInterface[]) => void;
  updateProject: (projectId: string, updatedFields: ProjectUpdateFieldsType) => void;
};

const ticketContextDefaultValues: UserProjectsContextStateType = {
  projects: [],
  addProject: () => {},
  handleSetProject: () => {},
  updateProject: () => {},
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

  const updateProject = useCallback((projectId: string, updatedFields: ProjectUpdateFieldsType): void => {
    setProjects((prevState) =>
      prevState.map((project) => {
        if (project._id === projectId) {
          project = _.merge({}, project, updatedFields);
        }
        return project;
      })
    );
  }, []);

  return (
    <UserProjectsContext.Provider value={{ projects, addProject, handleSetProject, updateProject }}>
      {children}
    </UserProjectsContext.Provider>
  );
};

export default UserProjectsContextProvider;
