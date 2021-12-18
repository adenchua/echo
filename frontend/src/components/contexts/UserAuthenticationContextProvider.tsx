import React, { createContext, useState, ReactNode, useCallback, useMemo } from "react";

interface UserAuthenticationContextProviderProps {
  children: ReactNode;
}

type UserAuthenticationContextStateType = {
  loggedInUserId: string | null;
  isLoggedIn: boolean;
  loginUser: (userId: string) => void;
  logoutUser: () => void;
};

const ticketContextDefaultValues: UserAuthenticationContextStateType = {
  loggedInUserId: null,
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
};

export const UserAuthenticationContext = createContext<UserAuthenticationContextStateType>(ticketContextDefaultValues);

const UserAuthenticationContextProvider = ({ children }: UserAuthenticationContextProviderProps): JSX.Element => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const isLoggedIn: boolean = useMemo(() => (loggedInUserId ? true : false), [loggedInUserId]);

  const loginUser = useCallback((userId: string): void => {
    if (userId) {
      setLoggedInUserId(userId);
    }
  }, []);

  const logoutUser = useCallback((): void => {
    setLoggedInUserId(null);
  }, []);

  return (
    <UserAuthenticationContext.Provider value={{ loggedInUserId, isLoggedIn, loginUser, logoutUser }}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export default UserAuthenticationContextProvider;
