import ProjectIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import fetchSprintsByIds from "../api/sprints/fetchSprintsByIds";
import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import Project from "../types/Project";
import Sprint from "../types/Sprint";
import User from "../types/User";
import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import UserAvatar from "./common/UserAvatar";

interface ProjectListingItemProps {
  project: Project;
}

const ProjectListingItem = (props: ProjectListingItemProps) => {
  const { project } = props;
  const { _id: projectId, title, type, sprintIds, adminIds, memberIds, backlogIds } = project;
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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

    const getActiveSprintProgressPercentage = async (sprints: Sprint[]) => {
      try {
        const activeSprint = sprints.find((sprint) => sprint.hasEnded === false);
        if (!activeSprint) {
          setActiveSprintProgressPercentage(0);
          return;
        }
        let completedTicketCount = 0;
        const tickets = await fetchTicketsByIds(backlogIds);
        const ticketsInSprint = tickets.filter((ticket) => ticket.isInSprint === true);
        ticketsInSprint.forEach((ticket) => {
          const { status } = ticket;
          if (status === "completed") {
            completedTicketCount += 1;
          }
        });
        const result = Number(
          Math.floor((completedTicketCount / ticketsInSprint.length) * 100).toFixed(),
        );
        setActiveSprintProgressPercentage(result);
      } catch (error) {}
    };

    getSprintsAndProgress();
    getUsers();
  }, [backlogIds, sprintIds, adminIds, memberIds]);

  const renderSprintStatusSpan = (sprints: Sprint[]) => {
    let span = (
      <Typography component="span" fontSize="inherit" sx={{ color: "error.main" }}>
        Stopped
      </Typography>
    ); // if no active sprint
    sprints.forEach((sprint) => {
      if (sprint.hasEnded === false) {
        span = (
          <Typography component="span" fontSize="inherit" sx={{ color: "primary.main" }}>
            Ongoing
          </Typography>
        );
      }
    });
    return span;
  };

  const renderAvatarGroups = (users: User[]) => {
    return (
      <AvatarGroup
        sx={{
          "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 16 },
        }}
      >
        {users.map((user) => {
          const { username, _id: userId, displayName } = user;
          return <UserAvatar key={userId} username={username} displayName={displayName} />;
        })}
      </AvatarGroup>
    );
  };

  return (
    <Paper
      sx={{ padding: 1, mb: 1, display: "flex", alignItems: "center", gap: 7, overflowX: "hidden" }}
      elevation={0}
      key={projectId}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ height: 40, width: 40 }} variant="rounded">
          <ProjectIcon />
        </Avatar>
        <Box sx={{ width: "200px" }}>
          <Typography variant="body2" noWrap lineHeight="16px">
            {title} <br /> <span style={{ fontSize: 12, color: "#969892" }}>{type}</span>
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ width: "64px" }} noWrap>
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
