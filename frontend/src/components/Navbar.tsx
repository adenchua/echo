import React, { useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ProjectsIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MyTasksIcon from "@mui/icons-material/TaskAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation, useParams } from "react-router-dom";

import fetchAllProjectsByUser from "../api/projects/fetchAllProjectsByUser";
import { UserProjectsContext } from "./contexts/UserProjectsContextProvider";
import { useLocalStorage } from "../utils/useLocalStorage";

const navigationItems = [
  {
    icon: <HomeIcon fontSize={"small"} sx={{ color: "#FFF" }} />,
    text: "Home",
    link: "/home",
  },
  {
    icon: <MyTasksIcon fontSize={"small"} sx={{ color: "#FFF" }} />,
    text: "My Tasks",
    link: "/tasks",
  },
  {
    icon: <ProjectsIcon fontSize={"small"} sx={{ color: "#FFF" }} />,
    text: "Projects",
    link: "/projects",
  },
];

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const { id: selectedProjectId } = useParams<{ id: string }>();
  const { projects, handleSetProject } = useContext(UserProjectsContext);
  const { storedValue: userId } = useLocalStorage("user-id", "");

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const response = await fetchAllProjectsByUser(userId);
        handleSetProject(response);
      } catch (error) {
        // do nothing
      }
    };

    getUserProjects();
  }, [handleSetProject, userId]);

  return (
    <Box sx={{ bgcolor: "grey.800", height: "100%" }}>
      <Toolbar />
      <Divider />
      <List
        subheader={
          <ListSubheader component='div' sx={{ bgcolor: "grey.800", color: "#FFF" }}>
            Navigation
          </ListSubheader>
        }
      >
        {navigationItems.map(({ icon, text, link }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={link}
            dense
            selected={link === pathname}
            sx={{
              "&.Mui-selected": { borderLeft: "5px solid", borderColor: "primary.light" },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} sx={{ color: "#FFF" }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {projects && projects.length > 0 && (
        <List
          subheader={
            <ListSubheader component='div' sx={{ bgcolor: "grey.800", color: "#FFF" }}>
              My Projects
            </ListSubheader>
          }
        >
          {projects.map(({ _id: projectId, title }) => (
            <ListItem
              button
              key={projectId}
              dense
              component={Link}
              to={`/projects/id/${projectId}?tab=overview`}
              sx={{
                "&.Mui-selected": { borderLeft: "5px solid", borderColor: "primary.light" },
              }}
              selected={selectedProjectId === projectId}
            >
              <ListItemAvatar>
                <Avatar variant='rounded' sx={{ bgcolor: "transparent", height: 24, width: 24 }}>
                  <ProjectsIcon fontSize={"small"} sx={{ color: "#FFF" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} sx={{ color: "#FFF" }} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Navbar;
