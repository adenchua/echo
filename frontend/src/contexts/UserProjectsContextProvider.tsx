import React, { createContext, useState, ReactNode, useCallback } from "react";
import _ from "lodash";

import Project, { ProjectUpdateFieldsType } from "../types/Project";

interface UserProjectsContextProviderProps {
  children: ReactNode;
}

type UserProjectsContextStateType = {
  projects: Project[];
  addProject: (project: Project) => void;
  handleSetProject: (projects: Project[]) => void;
  updateProject: (projectId: string, updatedFields: ProjectUpdateFieldsType) => void;
};

const userProjectsContextDefaultValues: UserProjectsContextStateType = {
  projects: [],
  addProject: () => {},
  handleSetProject: () => {},
  updateProject: () => {},
};

export const UserProjectsContext = createContext<UserProjectsContextStateType>(userProjectsContextDefaultValues);

const UserProjectsContextProvider = ({ children }: UserProjectsContextProviderProps): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = useCallback((newProject: Project): void => {
    setProjects((prevState) => [...prevState, newProject]);
  }, []);

  const handleSetProject = useCallback((newProjects: Project[]): void => {
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
