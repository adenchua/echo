import React, { useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ProjectsIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MyTasksIcon from "@mui/icons-material/TaskAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import { ListItem, ListItemAvatar } from "@mui/material";

import fetchAllProjectsByUser from "../api/projects/fetchAllProjectsByUser";
import { TEMP_ADMIN_ID } from "../utils/constants";
import { UserProjectsContext } from "./contexts/UserProjectsContextProvider";

const navigationItems = [
  {
    icon: <HomeIcon fontSize={"small"} color='primary' />,
    text: "Home",
    link: "/home",
  },
  {
    icon: <MyTasksIcon fontSize={"small"} color='primary' />,
    text: "My Tasks",
    link: "/tasks",
  },
  {
    icon: <ProjectsIcon fontSize={"small"} color='primary' />,
    text: "Projects",
    link: "/projects",
  },
];

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const { projects, handleSetProject } = useContext(UserProjectsContext);

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const response = await fetchAllProjectsByUser(TEMP_ADMIN_ID);
        handleSetProject(response);
      } catch (error) {
        // do nothing
      }
    };

    getUserProjects();
  }, [handleSetProject]);

  return (
    <>
      <Toolbar />
      <Divider />
      <List subheader={<ListSubheader component='div'>Navigation</ListSubheader>}>
        {navigationItems.map(({ icon, text, link }) => (
          <ListItemButton key={text} component={Link} to={link} dense selected={link === pathname}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} sx={{ color: "primary.main" }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {projects && projects.length > 0 && (
        <List subheader={<ListSubheader component='div'>My Projects</ListSubheader>}>
          {projects.map(({ _id: projectId, title }) => (
            <ListItem button key={projectId} dense component={Link} to={`/projects/id/${projectId}?tab=overview`}>
              <ListItemAvatar>
                <Avatar variant='rounded' sx={{ bgcolor: "transparent", height: 24, width: 24 }}>
                  <ProjectsIcon fontSize={"small"} color='primary' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} sx={{ color: "primary.main" }} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Navbar;
