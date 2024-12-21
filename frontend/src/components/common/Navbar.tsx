import ProjectsIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { JSX, useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router";

import fetchAllProjectsByUser from "../../api/projects/fetchAllProjectsByUser";
import { UserProjectsContext } from "../../contexts/UserProjectsContextProvider";
import useLoad from "../../hooks/useLoad";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { APP_VERSION, LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import LogoutButton from "../LogoutButton";
import NavbarListItem from "./NavbarListItem";
import SnackbarError from "./SnackbarError";

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
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { projects, handleSetProject } = useContext(UserProjectsContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  useEffect(() => {
    const getUserProjects = async (): Promise<void> => {
      if (!loggedInUserId) {
        return;
      }

      try {
        handleSetLoadingState("LOADING");
        const response = await fetchAllProjectsByUser(loggedInUserId);
        handleSetProject(response);
        handleSetLoadingState("DEFAULT");
      } catch {
        handleSetLoadingState("ERROR");
      }
    };

    getUserProjects();
  }, [handleSetProject, loggedInUserId, handleSetLoadingState]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "grey.800",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          pb: 2,
        }}
      >
        <Toolbar component={Link} to="/home" sx={{ textDecoration: "none", color: "inherit" }}>
          <Box display="flex" alignItems="baseline" gap={1}>
            <Typography variant="h4" color="primary.light">
              echo<span style={{ color: "orange" }}>.yl</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#FFF" }}>
              v.{APP_VERSION}
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div" sx={{ bgcolor: "grey.800", color: "#FFF" }}>
              Navigation
            </ListSubheader>
          }
          sx={{ px: 1 }}
        >
          {navigationItems.map(({ icon, text, link }) => (
            <NavbarListItem
              linkTo={link}
              buttonText={text}
              icon={icon}
              isSelected={link === pathname}
              key={text}
            />
          ))}
        </List>
        <Divider />
        {projects && projects.length > 0 && (
          <List
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: "grey.800", color: "#FFF" }}>
                My Projects
              </ListSubheader>
            }
            sx={{ px: 1 }}
          >
            {projects.map(({ _id: projectId, title }) => (
              <NavbarListItem
                key={title}
                linkTo={`/projects/id/${projectId}?tab=overview`}
                buttonText={title}
                icon={<ProjectsIcon fontSize={"small"} sx={{ color: "#FFF" }} />}
                isSelected={selectedProjectId === projectId}
              />
            ))}
          </List>
        )}
        <Box flexGrow={1} />
        <Box px={2}>
          <LogoutButton />
        </Box>
      </Box>
      <SnackbarError
        isOpen={currentLoadState === "ERROR"}
        onClose={() => handleSetLoadingState("DEFAULT")}
        text="An error occurred while trying to fetch your projects. Please try again later"
      />
    </>
  );
};

export default Navbar;
