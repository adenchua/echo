import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import PageLayoutWrapper from "../components/PageLayoutWrapper";
import ProjectInterface from "../types/ProjectInterface";
import ProjectListingItem from "../components/ProjectListingItem";
import CreateProjectButtonWithDialog from "../components/CreateProjectButtonWithDialog";
import useProjects from "../hooks/useProjects";
import Loading from "../components/Loading";

const ProjectListingPage = (): JSX.Element => {
  const { projects, isLoading, handleAddProject } = useProjects();
  const [searchInput, setSearchInput] = useState<string>("");

  const renderTitleHeaders = (): JSX.Element => {
    return (
      <Box mb={1} p={1} display='flex' alignItems='center' gap={8}>
        <Typography variant='body2' sx={{ width: "264px" }}>
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayoutWrapper>
      <Typography variant='h5' paragraph>
        Projects
      </Typography>
      <Box display='flex' gap={2}>
        <CreateProjectButtonWithDialog onAddProject={handleAddProject} />
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
          }}
        />
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }} />
      {projects.length > 0 && renderTitleHeaders()}
      {projects.length === 0 && renderNoProjectsMessage()}
      {projects.map((project: ProjectInterface) => {
        if (project.title.toLowerCase().includes(searchInput.toLowerCase())) {
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
