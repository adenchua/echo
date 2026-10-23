import { JSX, use, useEffect } from "react";

import { Navigate, useLocation } from "react-router";
import { CurrentUserContext } from "../contexts/CurrentUserContextProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element | null => {
  const { children } = props;
  const { authStatus, refreshCurrentUser } = use(CurrentUserContext);
  const location = useLocation();

  // re-validate the session on every navigation so that an expired session is caught
  useEffect(() => {
    refreshCurrentUser();
  }, [location, refreshCurrentUser]);

  // wait for the first session check before rendering any protected page
  if (authStatus === "loading") {
    return null;
  }

  // session expired, redirect to login page
  // redirect flag to show timed out dialog
  if (authStatus === "unauthenticated") {
    return <Navigate to="/?redirect=1" />;
  }

  return children;
};

export default ProtectedRoute;
