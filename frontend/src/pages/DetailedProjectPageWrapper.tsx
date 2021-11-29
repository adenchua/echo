import React from "react";
import ProjectMembersContextProvider from "../components/contexts/ProjectMembersContextProvider";
import TicketsContextProvider from "../components/contexts/TicketsContextProvider";
import DetailedProjectPage from "./DetailedProjectPage";

const DetailedProjectPageWrapper = (): JSX.Element => {
  return (
    <TicketsContextProvider>
      <ProjectMembersContextProvider>
        <DetailedProjectPage />
      </ProjectMembersContextProvider>
    </TicketsContextProvider>
  );
};

export default DetailedProjectPageWrapper;
