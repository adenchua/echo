import React, { useEffect, useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import _ from "lodash";

import PageLayoutWrapper from "../components/common/PageLayoutWrapper";
import ProjectInterface, { ProjectUpdateFieldsType } from "../types/ProjectInterface";
import fetchProject from "../api/projects/fetchProject";
import ErrorBanner from "../components/common/ErrorBanner";
import ToolbarContent from "../components/DetailedProject/ToolbarContent";
import useQuery from "../hooks/useQuery";
import OverviewTab from "../components/DetailedProject/OverviewTab";
import ProductBacklogTab from "../components/DetailedProject/ProductBacklogTab";
import SprintBacklogTab from "../components/DetailedProject/SprintBacklogTab";
import Loading from "../components/common/Loading";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import MembersTab from "../components/DetailedProject/MembersTab";
import SettingsTab from "../components/DetailedProject/SettingsTab";
import TeamObjectivesTab from "../components/DetailedProject/TeamObjectivesTab";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import fetchEpics from "../api/epics/fetchEpics";
import { ActiveSprintContext } from "../contexts/ActiveSprintContextProvider";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";

const DetailedProjectPage = (): JSX.Element => {
  // using this instead of useLocalStorage hook because theres a bug where cached value is used
  const loggedInUserId = window.localStorage.getItem(LOCAL_STORAGE_UID_KEY);
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const { handleSetTickets } = useContext(TicketsContext);
  const { handleSetMembers, handleSetAdmins } = useContext(ProjectMembersContext);
  const { handleSetEpics } = useContext(EpicsContext);
  const { handleSetActiveSprint, handleRemoveActiveSprint } = useContext(ActiveSprintContext);

  useEffect(() => {
    const getTickets = async (ticketIds: string[]): Promise<void> => {
      try {
        const response = await fetchTicketsByIds(ticketIds);
        handleSetTickets(response);
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getEpics = async (epicIds: string[]): Promise<void> => {
      try {
        const response = await fetchEpics(epicIds);
        handleSetEpics(response);
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getActiveSprint = async (sprintIds: string[]): Promise<void> => {
      try {
        const response = await fetchSprintsByIds(sprintIds);
        const activeSprint = response.find((sprint) => sprint.hasEnded === false);
        if (activeSprint) {
          handleSetActiveSprint(activeSprint);
          return;
        }
        handleRemoveActiveSprint(); // cleanup in case next selected project has no active sprint
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getProject = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchProject(id);
        const { backlogIds, adminIds, memberIds, epicIds, sprintIds } = response;
        getTickets(backlogIds);
        getEpics(epicIds);
        getActiveSprint(sprintIds);
        getProjectMembersAndAdmins(adminIds, memberIds);
        setProject(response);
        setIsLoading(false);
      } catch (error) {
        //do nothing
      }
    };

    const getProjectMembersAndAdmins = async (adminIds: string[], memberIds: string[]) => {
      try {
        const adminResponse = await fetchUsersByIds(adminIds);
        const memberResponse = await fetchUsersByIds(memberIds);
        handleSetMembers(memberResponse);
        handleSetAdmins(adminResponse);
      } catch (error) {
        // do nothing
      }
    };

    getProject();
  }, [
    id,
    handleSetTickets,
    handleSetAdmins,
    handleSetMembers,
    handleSetEpics,
    handleSetActiveSprint,
    handleRemoveActiveSprint,
  ]);

  const handleUpdateProjectFields = (updatedFields: ProjectUpdateFieldsType): void => {
    const updatedProject = _.merge({}, project, updatedFields);
    setProject(updatedProject);
  };

  if (!loggedInUserId) {
    return <Redirect to='/' />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!project) {
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
      { tabKey: "objectives", component: <TeamObjectivesTab project={project} /> },
      { tabKey: "members", component: <MembersTab project={project} /> },
      {
        tabKey: "settings",
        component: <SettingsTab project={project} handleUpdateProjectFields={handleUpdateProjectFields} />,
      },
    ];
    const selectedTab = availableTabs.find((element) => element.tabKey === currentTabKey);

    if (!selectedTab) {
      return <ErrorBanner />;
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
