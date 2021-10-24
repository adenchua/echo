import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ProjectsIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import MyTasksIcon from "@mui/icons-material/TaskAlt";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  {
    icon: <HomeIcon fontSize={"small"} />,
    text: "Home",
    link: "/home",
  },
  {
    icon: <MyTasksIcon fontSize={"small"} />,
    text: "My Tasks",
    link: "/tasks",
  },
  {
    icon: <ProjectsIcon fontSize={"small"} />,
    text: "Projects",
    link: "/projects",
  },
];

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();
  return (
    <>
      <Toolbar />
      <Divider />
      <List subheader={<ListSubheader component='div'>Navigation</ListSubheader>}>
        {navigationItems.map(({ icon, text, link }) => (
          <ListItemButton key={text} component={Link} to={link} dense selected={link === pathname}>
            <ListItemAvatar>
              <Avatar variant='rounded' sx={{ bgcolor: "primary.main", height: 24, width: 24 }}>
                {icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={text} sx={{ color: "primary.main" }} />
          </ListItemButton>
        ))}
      </List>{" "}
      <Divider />
      <List subheader={<ListSubheader component='div'>My Projects</ListSubheader>}>
        {navigationItems.map(({ icon, text, link }) => (
          <ListItem button key={text} dense>
            <ListItemAvatar>
              <Avatar variant='rounded' sx={{ bgcolor: "primary.main", height: 24, width: 24 }}>
                {icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={text} sx={{ color: "primary.main" }} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Navbar;
