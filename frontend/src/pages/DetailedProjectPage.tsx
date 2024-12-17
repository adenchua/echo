import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import fetchEpics from "../api/epics/fetchEpics";
import fetchProject from "../api/projects/fetchProject";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import MembersTab from "../components/DetailedProject/MembersTab";
import OverviewTab from "../components/DetailedProject/OverviewTab";
import ProductBacklogTab from "../components/DetailedProject/ProductBacklogTab";
import SettingsTab from "../components/DetailedProject/SettingsTab";
import SprintBacklogTab from "../components/DetailedProject/SprintBacklogTab";
import TeamObjectivesTab from "../components/DetailedProject/TeamObjectivesTab";
import ToolbarContent from "../components/DetailedProject/ToolbarContent";
import ErrorBanner from "../components/common/ErrorBanner";
import Loading from "../components/common/Loading";
import PageLayoutWrapper from "../components/common/PageLayoutWrapper";
import { ActiveSprintContext } from "../contexts/ActiveSprintContextProvider";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import useLoad from "../hooks/useLoad";
import useQuery from "../hooks/useQuery";
import Project, { ProjectUpdateFieldsType } from "../types/Project";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";

const DetailedProjectPage = () => {
  // using this instead of useLocalStorage hook because theres a bug where cached value is used
  const loggedInUserId = window.localStorage.getItem(LOCAL_STORAGE_UID_KEY);
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const { currentLoadState, handleSetLoadingState } = useLoad("LOADING");
  const [project, setProject] = useState<Project | null>(null);
  const { handleSetTickets } = useContext(TicketsContext);
  const { handleSetMembers, handleSetAdmins } = useContext(ProjectMembersContext);
  const { handleSetEpics } = useContext(EpicsContext);
  const { handleSetActiveSprint, handleRemoveActiveSprint } = useContext(ActiveSprintContext);

  useEffect(() => {
    const getProject = async (): Promise<void> => {
      handleSetLoadingState("LOADING");

      try {
        if (!id) {
          handleSetLoadingState("ERROR");
          return;
        }

        const response = await fetchProject(id);
        const { backlogIds, adminIds, memberIds, epicIds, sprintIds } = response;

        const tickets = await fetchTicketsByIds(backlogIds);
        handleSetTickets(tickets);

        const epics = await fetchEpics(epicIds);
        handleSetEpics(epics);

        const sprints = await fetchSprintsByIds(sprintIds);
        const activeSprint = sprints.find((sprint) => sprint.hasEnded === false);
        if (activeSprint) {
          handleSetActiveSprint(activeSprint);
        } else {
          handleRemoveActiveSprint(); // cleanup in case next selected project has no active sprint
        }

        const adminResponse = await fetchUsersByIds(adminIds);
        const memberResponse = await fetchUsersByIds(memberIds);
        handleSetMembers(memberResponse);
        handleSetAdmins(adminResponse);

        setProject(response);

        handleSetLoadingState("DEFAULT");
      } catch (error) {
        handleSetLoadingState("ERROR");
      }
    };

    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateProjectFields = (updatedFields: ProjectUpdateFieldsType): void => {
    const updatedProject = _.merge({}, project, updatedFields);
    setProject(updatedProject);
  };

  if (!loggedInUserId) {
    return <Navigate to="/" />;
  }

  if (currentLoadState === "LOADING") {
    return <Loading />;
  }

  if (currentLoadState === "ERROR" || project == null) {
    return (
      <PageLayoutWrapper>
        <ErrorBanner />
      </PageLayoutWrapper>
    );
  }

  const renderTabContent = (): React.ReactNode => {
    const currentTabKey = query.get("tab");
    const availableTabs = [
      { tabKey: "overview", component: <OverviewTab project={project} /> },
      { tabKey: "product-backlog", component: <ProductBacklogTab project={project} /> },
      { tabKey: "sprint-backlog", component: <SprintBacklogTab project={project} /> },
      { tabKey: "epics", component: <TeamObjectivesTab project={project} /> },
      { tabKey: "members", component: <MembersTab project={project} /> },
      {
        tabKey: "settings",
        component: (
          <SettingsTab project={project} handleUpdateProjectFields={handleUpdateProjectFields} />
        ),
      },
    ];
    let selectedTab = availableTabs.find((element) => element.tabKey === currentTabKey);

    if (!selectedTab) {
      selectedTab = availableTabs[0]; // default to overview tab if nothing is clicked
    }

    return selectedTab.component;
  };

  return (
    <PageLayoutWrapper toolbarContent={<ToolbarContent project={project} />} disablePadding>
      {renderTabContent()}
    </PageLayoutWrapper>
  );
};

export default DetailedProjectPage;
