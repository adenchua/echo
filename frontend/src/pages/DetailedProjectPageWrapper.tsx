import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserAuthenticationContext } from "../contexts/UserAuthenticationContextProvider";
import ProjectMembersContextProvider from "../contexts/ProjectMembersContextProvider";
import TicketsContextProvider from "../contexts/TicketsContextProvider";
import DetailedProjectPage from "./DetailedProjectPage";
import EpicsContextProvider from "../contexts/EpicsContextProvider";
import ActiveSprintContextProvider from "../contexts/ActiveSprintContextProvider";

const DetailedProjectPageWrapper = (): JSX.Element => {
  const { isLoggedIn } = useContext(UserAuthenticationContext);

  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <ActiveSprintContextProvider>
      <EpicsContextProvider>
        <TicketsContextProvider>
          <ProjectMembersContextProvider>
            <DetailedProjectPage />
          </ProjectMembersContextProvider>
        </TicketsContextProvider>
      </EpicsContextProvider>
    </ActiveSprintContextProvider>
  );
};

export default DetailedProjectPageWrapper;
