import { createContext, useState, ReactNode, useCallback } from "react";

import User from "../types/User";

interface ProjectMembersContextProviderProps {
  children: ReactNode;
}

type ProjectMembersStateType = {
  members: User[];
  admins: User[];
  handleSetMembers: (newMembers: User[]) => void;
  handleSetAdmins: (newAdmins: User[]) => void;
  handleAddMembers: (newMembers: User[]) => void;
  handleRemoveMember: (memberToRemove: User) => void;
  handlePromoteMember: (memberToPromote: User) => void;
};

const projectMembersDefaultState: ProjectMembersStateType = {
  members: [],
  admins: [],
  handleSetAdmins: () => {},
  handleSetMembers: () => {},
  handleAddMembers: () => {},
  handleRemoveMember: () => {},
  handlePromoteMember: () => {},
};

export const ProjectMembersContext = createContext<ProjectMembersStateType>(
  projectMembersDefaultState,
);

const ProjectMembersContextProvider = ({
  children,
}: ProjectMembersContextProviderProps): JSX.Element => {
  const [members, setMembers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  const handleSetMembers = useCallback((newMembers: User[]): void => {
    setMembers(newMembers);
  }, []);

  const handleSetAdmins = useCallback((newAdmins: User[]): void => {
    setAdmins(newAdmins);
  }, []);

  const handleAddMembers = useCallback((newMembers: User[]): void => {
    setMembers((prevState) => [...prevState, ...newMembers]);
  }, []);

  const handleRemoveMember = useCallback(
    (memberToRemove: User): void => {
      const remainingMembers = members.filter((member) => member._id !== memberToRemove._id);
      setMembers(remainingMembers);
    },
    [members],
  );

  const handlePromoteMember = useCallback(
    (memberToPromote: User): void => {
      const remainingMembers = members.filter((member) => member._id !== memberToPromote._id);
      setMembers(remainingMembers);
      setAdmins((prevState) => [...prevState, memberToPromote]);
    },
    [members],
  );

  return (
    <ProjectMembersContext.Provider
      value={{
        members,
        admins,
        handleSetAdmins,
        handleSetMembers,
        handleAddMembers,
        handleRemoveMember,
        handlePromoteMember,
      }}
    >
      {children}
    </ProjectMembersContext.Provider>
  );
};

export default ProjectMembersContextProvider;
