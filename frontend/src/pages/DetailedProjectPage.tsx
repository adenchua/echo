import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import _ from "lodash";

import { UserAuthenticationContext } from "../components/contexts/UserAuthenticationContextProvider";
import PageLayoutWrapper from "../components/PageLayoutWrapper";
import ProjectInterface, { ProjectUpdateFieldsType } from "../types/ProjectInterface";
import fetchProject from "../api/projects/fetchProject";
import ErrorBanner from "../components/ErrorBanner";
import ToolbarContent from "../components/DetailedProject/ToolbarContent";
import useQuery from "../hooks/useQuery";
import OverviewTab from "../components/DetailedProject/OverviewTab";
import ProductBacklogTab from "../components/DetailedProject/ProductBacklogTab";
import SprintBacklogTab from "../components/DetailedProject/SprintBacklogTab";
import Loading from "../components/Loading";
import { TicketsContext } from "../components/contexts/TicketsContextProvider";
import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import { ProjectMembersContext } from "../components/contexts/ProjectMembersContextProvider";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import MembersTab from "../components/DetailedProject/MembersTab";
import SettingsTab from "../components/DetailedProject/SettingsTab";
import TeamObjectivesTab from "../components/DetailedProject/TeamObjectivesTab";
import { EpicsContext } from "../components/contexts/EpicsContextProvider";
import fetchEpics from "../api/epics/fetchEpics";

const DetailedProjectPage = (): JSX.Element => {
  const { isLoggedIn } = useContext(UserAuthenticationContext);
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const { handleSetTickets } = useContext(TicketsContext);
  const { handleSetMembers, handleSetAdmins } = useContext(ProjectMembersContext);
  const { handleSetEpics } = useContext(EpicsContext);

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

    const getProject = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchProject(id);
        const { backlogIds, adminIds, memberIds, epicIds } = response;
        getTickets(backlogIds);
        getEpics(epicIds);
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
  }, [id, handleSetTickets, handleSetAdmins, handleSetMembers, handleSetEpics]);

  const handleUpdateProjectFields = (updatedFields: ProjectUpdateFieldsType): void => {
    const updatedProject = _.merge({}, project, updatedFields);
    setProject(updatedProject);
  };

  if (!isLoggedIn) {
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
    <PageLayoutWrapper toolbarContent={<ToolbarContent project={project} />}>{renderTabContent()}</PageLayoutWrapper>
  );
};

export default DetailedProjectPage;
