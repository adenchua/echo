import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import PageLayoutWrapper from "../components/PageLayoutWrapper";
import ProjectInterface from "../types/ProjectInterface";
import fetchProject from "../api/projects/fetchProject";
import ErrorBanner from "../components/ErrorBanner";
import ToolbarContent from "../components/DetailedProject/ToolbarContent";
import useQuery from "../hooks/useQuery";
import OverviewTab from "../components/DetailedProject/OverviewTab";
import ProductBacklogTab from "../components/DetailedProject/ProductBacklogTab";
import SprintBacklogTab from "../components/DetailedProject/SprintBacklogTab";
import Loading from "../components/Loading";
import { TicketsContext } from "../components/TicketsContextProvider";
import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";

const DetailedProjectPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const query = useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const { addTickets } = useContext(TicketsContext);

  useEffect(() => {
    const getTickets = async (storyIds: string[]): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchStoriesByIds(storyIds);
        addTickets(response);
        setIsLoading(false);
      } catch (error) {
        alert("Something went wrong. Please try again later.");
      }
    };

    const getProject = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchProject(id);
        const { backlogIds } = response;
        getTickets(backlogIds);
        setProject(response);
        setIsLoading(false);
      } catch (error) {
        //do nothing
      }
    };

    getProject();
  }, [id]);

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
