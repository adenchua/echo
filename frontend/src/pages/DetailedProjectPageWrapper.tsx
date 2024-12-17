import ProjectMembersContextProvider from "../contexts/ProjectMembersContextProvider";
import TicketsContextProvider from "../contexts/TicketsContextProvider";
import DetailedProjectPage from "./DetailedProjectPage";
import EpicsContextProvider from "../contexts/EpicsContextProvider";
import ActiveSprintContextProvider from "../contexts/ActiveSprintContextProvider";

const DetailedProjectPageWrapper = () => {
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
