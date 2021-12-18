import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthenticationContext } from "../components/contexts/UserAuthenticationContextProvider";
import ProjectMembersContextProvider from "../components/contexts/ProjectMembersContextProvider";
import TicketsContextProvider from "../components/contexts/TicketsContextProvider";
import DetailedProjectPage from "./DetailedProjectPage";

const DetailedProjectPageWrapper = (): JSX.Element => {
  const { isLoggedIn } = useContext(UserAuthenticationContext);

  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <TicketsContextProvider>
      <ProjectMembersContextProvider>
        <DetailedProjectPage />
      </ProjectMembersContextProvider>
    </TicketsContextProvider>
  );
};

export default DetailedProjectPageWrapper;
