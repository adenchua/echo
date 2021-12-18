import React, { useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ProjectsIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation, useParams } from "react-router-dom";

import fetchAllProjectsByUser from "../api/projects/fetchAllProjectsByUser";
import { UserProjectsContext } from "./contexts/UserProjectsContextProvider";
import { UserAuthenticationContext } from "./contexts/UserAuthenticationContextProvider";

const navigationItems = [
  {
    icon: <HomeIcon sx={{ color: "#FFF" }} />,
    text: "Home",
    link: "/home",
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
  const { loggedInUserId, logoutUser } = useContext(UserAuthenticationContext);

  useEffect(() => {
    const getUserProjects = async () => {
      if (!loggedInUserId) {
        return;
      }

      try {
        const response = await fetchAllProjectsByUser(loggedInUserId);
        handleSetProject(response);
      } catch (error) {
        // do nothing
      }
    };

    getUserProjects();
  }, [handleSetProject, loggedInUserId]);

  return (
    <Box sx={{ bgcolor: "grey.800", height: "100%", display: "flex", flexDirection: "column", pb: 3 }}>
      <Toolbar component={Link} to='/home' sx={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant='h5' color='primary.light'>
          🔥
        </Typography>
        <Typography variant='h5' color='primary.light' sx={{ ml: 1 }}>
          echo.yl
        </Typography>
      </Toolbar>
      <Divider />
      <List
        subheader={
          <ListSubheader component='div' sx={{ bgcolor: "grey.800", color: "#FFF" }}>
            Navigation
          </ListSubheader>
        }
        sx={{ px: 1 }}
      >
        {navigationItems.map(({ icon, text, link }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={link}
            dense
            selected={link === pathname}
            sx={{
              "&.Mui-selected": {
                bgcolor: "primary.main",
                borderRadius: 0.5,
                "&:hover": { bgcolor: "primary.main" },
              },
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
          sx={{ px: 1 }}
        >
          {projects.map(({ _id: projectId, title }) => (
            <ListItemButton
              key={projectId}
              dense
              component={Link}
              to={`/projects/id/${projectId}?tab=overview`}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  borderRadius: 0.5,
                  "&:hover": { bgcolor: "primary.main" },
                },
              }}
              selected={selectedProjectId === projectId}
            >
              <ListItemAvatar>
                <Avatar variant='rounded' sx={{ bgcolor: "transparent", height: 24, width: 24 }}>
                  <ProjectsIcon fontSize={"small"} sx={{ color: "#FFF" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} sx={{ color: "#FFF" }} primaryTypographyProps={{ noWrap: true }} />
            </ListItemButton>
          ))}
        </List>
      )}
      <Box flexGrow={1} />
      <Box px={2}>
        <Button
          variant='outlined'
          onClick={logoutUser}
          fullWidth
          sx={{
            color: "#FFF",
            borderColor: "#FFF",
            "&:hover": { borderColor: "#FFF", bgcolor: "#FFF", color: "#111" },
          }}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
