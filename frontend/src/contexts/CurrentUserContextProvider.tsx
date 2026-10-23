import { createContext, useState, ReactNode, useCallback, JSX } from "react";

import checkSession from "../api/authentication/checkSession";
import SessionUser from "../types/SessionUser";

interface CurrentUserContextProviderProps {
  children: ReactNode;
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type CurrentUserContextStateType = {
  currentUser: SessionUser | null;
  authStatus: AuthStatus;
  refreshCurrentUser: () => Promise<void>;
  clearCurrentUser: () => void;
};

const currentUserContextDefaultValues: CurrentUserContextStateType = {
  currentUser: null,
  authStatus: "loading",
  refreshCurrentUser: async () => {},
  clearCurrentUser: () => {},
};

export const CurrentUserContext = createContext<CurrentUserContextStateType>(
  currentUserContextDefaultValues,
);

const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  // asks the server who is logged in, as the session cookie is the only source of truth
  const refreshCurrentUser = useCallback(async (): Promise<void> => {
    try {
      const user = await checkSession();
      setCurrentUser(user);
      setAuthStatus("authenticated");
    } catch {
      setCurrentUser(null);
      setAuthStatus("unauthenticated");
    }
  }, []);

  const clearCurrentUser = useCallback((): void => {
    setCurrentUser(null);
    setAuthStatus("unauthenticated");
  }, []);

  return (
    <CurrentUserContext value={{ currentUser, authStatus, refreshCurrentUser, clearCurrentUser }}>
      {children}
    </CurrentUserContext>
  );
};

export default CurrentUserContextProvider;
