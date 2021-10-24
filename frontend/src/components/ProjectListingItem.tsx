import React, { useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Hidden from "@mui/material/Hidden";
import ProjectIcon from "@mui/icons-material/Folder";

import ProjectInterface from "../types/ProjectInterface";
import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import SprintInterface from "../types/SprintInterface";

interface ProjectListingItemProps {
  project: ProjectInterface;
}

const ProjectListingItem = (props: ProjectListingItemProps): JSX.Element => {
  const { project } = props;
  const { title, type, sprints } = project;

  const getSprintStatus = (sprints: SprintInterface[]): string => {
    let status = "--"; // if no active sprint
    sprints.forEach((sprint) => {
      if (sprint.hasEnded === false) {
        status = "Ongoing";
      }
    });
    return status;
  };

  const getSprintProgressPercentage = useCallback((sprints: SprintInterface[]): number => {
    const [activeSprint] = sprints.filter((sprint) => (sprint.hasEnded = false));

    // no active sprint, return 0 progress as default
    if (!activeSprint) {
      return 0;
    }
    let completedStoryCount = 0;
    const totalStoriesCount = activeSprint.incompleteStories.length;

    activeSprint.incompleteStories.forEach((story) => {
      if (story.status === "completed") {
        completedStoryCount += 1;
      }
    });

    const result = Number(Math.floor((completedStoryCount / totalStoriesCount) * 100).toFixed());

    return result;
  }, []);

  return (
    <Paper sx={{ padding: 1, mb: 0.5, display: "flex", alignItems: "center", gap: 2 }} square elevation={0}>
      <Avatar sx={{ height: "48px", width: "48px" }} variant='rounded'>
        <ProjectIcon />
      </Avatar>
      <Box sx={{ mr: 4, maxWidth: "140px" }}>
        <Typography variant='subtitle2' noWrap>
          {title}
        </Typography>
        <Typography variant='caption' sx={{ color: "GrayText" }} noWrap>
          {type}
        </Typography>
      </Box>
      <Typography variant='body2' mr={4} sx={{ color: "primary.main" }}>
        {getSprintStatus(sprints)}
      </Typography>
      <Hidden smDown>
        <Box sx={{ width: "160px" }}>
          <ProgressBarWithPercentage value={getSprintProgressPercentage(sprints)} />
        </Box>
        <Box flexGrow={1} />
        <AvatarGroup max={4}>
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </Hidden>
    </Paper>
  );
};

export default ProjectListingItem;
