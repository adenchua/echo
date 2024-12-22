import { JSX, useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router";
import checkSession from "../api/authentication/checkSession";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchSession(): Promise<void> {
      try {
        await checkSession();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
    fetchSession();
  }, [location]);

  // session expired, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
