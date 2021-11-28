import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Hidden from "@mui/material/Hidden";
import ProjectIcon from "@mui/icons-material/GitHub";
import _ from "lodash";

import ProjectInterface from "../types/ProjectInterface";
import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import SprintInterface from "../types/SprintInterface";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import UserInterface from "../types/UserInterface";
import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import fetchStoriesByIds from "../api/stories/fetchStoriesByIds";

interface ProjectListingItemProps {
  project: ProjectInterface;
}

const ProjectListingItem = (props: ProjectListingItemProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId, title, type, sprintIds, adminIds, memberIds, backlogIds } = project;
  const [sprints, setSprints] = useState<SprintInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [activeSprintProgressPercentage, setActiveSprintProgressPercentage] = useState<number>(0);

  useEffect(() => {
    const getSprintsAndProgress = async () => {
      try {
        const response = await fetchSprintsByIds(sprintIds);
        setSprints(response);
        getActiveSprintProgressPercentage(response);
      } catch (error) {}
    };

    const getUsers = async () => {
      try {
        const response = await fetchUsersByIds([...adminIds, ...memberIds]);
        setUsers(response);
      } catch (error) {}
    };

    const getActiveSprintProgressPercentage = async (sprints: SprintInterface[]) => {
      try {
        const activeSprint = sprints.find((sprint) => sprint.hasEnded === false);
        if (!activeSprint) {
          setActiveSprintProgressPercentage(0);
          return;
        }
        let completedStoryCount = 0;
        const stories = await fetchStoriesByIds(backlogIds);
        const ticketsInSprint = stories.filter((story) => story.isInSprint === true);
        ticketsInSprint.forEach((ticket) => {
          const { status } = ticket;
          if (status === "completed") {
            completedStoryCount += 1;
          }
        });
        const result = Number(Math.floor((completedStoryCount / ticketsInSprint.length) * 100).toFixed());
        setActiveSprintProgressPercentage(result);
      } catch (error) {}
    };

    getSprintsAndProgress();
    getUsers();
  }, [backlogIds, sprintIds, adminIds, memberIds]);

  const renderSprintStatusSpan = (sprints: SprintInterface[]): JSX.Element => {
    let span = (
      <Typography component='span' fontSize='inherit' sx={{ color: "warning.main" }}>
        Stopped
      </Typography>
    ); // if no active sprint
    sprints.forEach((sprint) => {
      if (sprint.hasEnded === false) {
        span = (
          <Typography component='span' fontSize='inherit' sx={{ color: "primary.main" }}>
            Ongoing
          </Typography>
        );
      }
    });
    return span;
  };

  const renderAvatarGroups = (users: UserInterface[]): JSX.Element => {
    const shuffledUsers = _.shuffle(users); // so that same members do not always appear first
    return (
      <AvatarGroup max={4} sx={{ flexShrink: 1 }}>
        {shuffledUsers.map((user) => {
          const { username, _id: userId, displayName } = user;
          return (
            <Avatar key={userId} src={getUserAvatarSVG(username)}>
              {displayName}
            </Avatar>
          );
        })}
      </AvatarGroup>
    );
  };

  return (
    <Paper
      sx={{ padding: 1, mb: 0.5, display: "flex", alignItems: "center", gap: 8, overflowX: "hidden" }}
      square
      elevation={0}
      key={projectId}
    >
      <Box display='flex' gap={2}>
        <Avatar sx={{ height: "48px", width: "48px" }} variant='rounded'>
          <ProjectIcon />
        </Avatar>
        <Box sx={{ width: "200px" }}>
          <Typography variant='subtitle2' noWrap color='primary.main'>
            {title}
          </Typography>
          <Typography variant='caption' sx={{ color: "GrayText" }} noWrap>
            {type}
          </Typography>
        </Box>
      </Box>
      <Typography variant='body2' sx={{ width: "64px" }} noWrap>
        {renderSprintStatusSpan(sprints)}
      </Typography>
      <Hidden smDown>
        <Box sx={{ width: "160px" }}>
          <ProgressBarWithPercentage value={activeSprintProgressPercentage} />
        </Box>
        {renderAvatarGroups(users)}
      </Hidden>
    </Paper>
  );
};

export default ProjectListingItem;
