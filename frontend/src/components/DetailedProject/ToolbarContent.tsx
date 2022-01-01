import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ProjectIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import ProjectInterface from "../../types/ProjectInterface";
import useQuery from "../../hooks/useQuery";

interface ToolbarContentProps {
  project: ProjectInterface;
}

const ToolbarContent = (props: ToolbarContentProps): JSX.Element => {
  const { project } = props;
  const query = useQuery();
  const { title } = project;

  const renderTabLink = (displayedTitle: string, tabKey: string): JSX.Element => {
    const isTabSelected = query.get("tab") === tabKey;
    return (
      <Link component={RouterLink} to={`/projects/id/${project._id}?tab=${tabKey}`} underline='none'>
        <Typography variant='caption' color={isTabSelected ? "primary.main" : "grey.500"} component='div'>
          {displayedTitle}
        </Typography>
      </Link>
    );
  };

  return (
    <Box display='flex' gap={2} alignItems='center' overflow='auto'>
      <Avatar variant='rounded'>
        <ProjectIcon />
      </Avatar>
      <div>
        <Typography noWrap>{title}</Typography>
        <Box display='flex' gap={3} whiteSpace='nowrap'>
          {renderTabLink("Overview", "overview")}
          {renderTabLink("Product Backlog", "product-backlog")}
          {renderTabLink("Sprint Backlog", "sprint-backlog")}
          {renderTabLink("Team Objectives", "objectives")}
          {renderTabLink("Members", "members")}
          {renderTabLink("Settings", "settings")}
        </Box>
      </div>
    </Box>
  );
};

export default ToolbarContent;
