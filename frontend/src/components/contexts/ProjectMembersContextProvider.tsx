import React, { createContext, useState, ReactNode, useCallback } from "react";

import UserInterface from "../../types/UserInterface";

interface ProjectMembersContextProviderProps {
  children: ReactNode;
}

type ProjectMembersStateType = {
  members: UserInterface[];
  admins: UserInterface[];
  handleSetMembers: (newMembers: UserInterface[]) => void;
  handleSetAdmins: (newAdmins: UserInterface[]) => void;
  handleAddMembers: (newMembers: UserInterface[]) => void;
  handleRemoveMember: (memberToRemove: UserInterface) => void;
};

const projectMembersDefaultState: ProjectMembersStateType = {
  members: [],
  admins: [],
  handleSetAdmins: () => {},
  handleSetMembers: () => {},
  handleAddMembers: () => {},
  handleRemoveMember: () => {},
};

export const ProjectMembersContext = createContext<ProjectMembersStateType>(projectMembersDefaultState);

const ProjectMembersContextProvider = ({ children }: ProjectMembersContextProviderProps): JSX.Element => {
  const [members, setMembers] = useState<UserInterface[]>([]);
  const [admins, setAdmins] = useState<UserInterface[]>([]);

  const handleSetMembers = useCallback((newMembers: UserInterface[]): void => {
    setMembers(newMembers);
  }, []);

  const handleSetAdmins = useCallback((newAdmins: UserInterface[]): void => {
    setAdmins(newAdmins);
  }, []);

  const handleAddMembers = useCallback((newMembers: UserInterface[]): void => {
    setMembers((prevState) => [...prevState, ...newMembers]);
  }, []);

  const handleRemoveMember = useCallback(
    (memberToRemove: UserInterface): void => {
      const remainingMembers = members.filter((member) => member._id !== memberToRemove._id);
      setMembers(remainingMembers);
    },
    [members]
  );

  return (
    <ProjectMembersContext.Provider
      value={{ members, admins, handleSetAdmins, handleSetMembers, handleAddMembers, handleRemoveMember }}
    >
      {children}
    </ProjectMembersContext.Provider>
  );
};

export default ProjectMembersContextProvider;
