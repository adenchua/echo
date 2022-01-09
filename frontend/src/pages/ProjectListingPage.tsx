import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { Link as RouterLink, Redirect } from "react-router-dom";

import PageLayoutWrapper from "../components/PageLayoutWrapper";
import ProjectInterface from "../types/ProjectInterface";
import ProjectListingItem from "../components/ProjectListingItem";
import CreateProjectButtonWithDialog from "../components/CreateProjectButtonWithDialog";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";
import { matchString } from "../utils/matchString";
import { UserAuthenticationContext } from "../contexts/UserAuthenticationContextProvider";

const ProjectListingPage = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { projects } = useContext(UserProjectsContext);
  const { isLoggedIn } = useContext(UserAuthenticationContext);

  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  const renderTitleHeaders = (): JSX.Element => {
    return (
      <Box mb={1} p={1} display='flex' alignItems='center' gap={8}>
        <Typography variant='body2' sx={{ width: "242px" }}>
          Project
        </Typography>
        <Typography variant='body2' sx={{ width: "64px" }} noWrap>
          Sprint
        </Typography>
        <Hidden smDown>
          <Typography variant='body2' sx={{ width: "160px" }}>
            Current Tasks
          </Typography>
          <Typography variant='body2'>Members</Typography>
        </Hidden>
      </Box>
    );
  };

  const renderNoProjectsMessage = (): JSX.Element => (
    <Typography variant='body2' sx={{ color: "GrayText", fontStyle: "italic" }}>
      There are no projects listed.
    </Typography>
  );

  return (
    <PageLayoutWrapper>
      <Typography variant='h5' paragraph>
        Projects
      </Typography>
      <Box display='flex' gap={2}>
        <CreateProjectButtonWithDialog />
        <TextField
          size='small'
          margin='none'
          placeholder='Search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              borderRadius: 0,
            },
          }}
        />
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }} />
      {projects.length > 0 && renderTitleHeaders()}
      {projects.length === 0 && renderNoProjectsMessage()}
      {projects.map((project: ProjectInterface) => {
        if (matchString(searchInput, project.title)) {
          return (
            <Link
              component={RouterLink}
              to={`/projects/id/${project._id}?tab=overview`}
              key={project._id}
              underline='none'
            >
              <ProjectListingItem project={project} />
            </Link>
          );
        }
        return null;
      })}
    </PageLayoutWrapper>
  );
};

export default ProjectListingPage;
