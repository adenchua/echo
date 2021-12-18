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
import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";
import { ProjectMembersContext } from "../components/contexts/ProjectMembersContextProvider";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import MembersTab from "../components/DetailedProject/MembersTab";
import SettingsTab from "../components/DetailedProject/SettingsTab";

const DetailedProjectPage = (): JSX.Element => {
  const { isLoggedIn } = useContext(UserAuthenticationContext);
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const { handleSetTickets } = useContext(TicketsContext);
  const { handleSetMembers, handleSetAdmins } = useContext(ProjectMembersContext);

  useEffect(() => {
    const getTickets = async (storyIds: string[]): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchStoriesByIds(storyIds);
        handleSetTickets(response);
        setIsLoading(false);
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getProject = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchProject(id);
        const { backlogIds, adminIds, memberIds } = response;
        getTickets(backlogIds);
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
  }, [id, handleSetTickets, handleSetAdmins, handleSetMembers]);

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
