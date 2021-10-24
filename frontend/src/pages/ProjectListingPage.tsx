import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";

import PageLayoutWrapper from "../components/PageLayoutWrapper";
import ProjectInterface from "../types/ProjectInterface";
import ProjectListingItem from "../components/ProjectListingItem";

const ProjectListingPage = (): JSX.Element => {
  const [projects] = useState<ProjectInterface[]>([]);

  const renderTitleHeaders = (): JSX.Element => {
    return (
      <Box mb={1} p={1} display='flex' alignItems='center' gap={2}>
        <Typography variant='body2' sx={{ width: "236px" }}>
          Project
        </Typography>
        <Typography variant='body2' sx={{ width: "82px" }} noWrap>
          Sprint
        </Typography>
        <Hidden smDown>
          <Typography variant='body2'>Current Tasks</Typography>
          <Box flexGrow={1} />
          <Typography variant='body2' mr={11}>
            Members
          </Typography>
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
        <Button startIcon={<AddIcon />} variant='outlined'>
          Add Project
        </Button>
        <TextField
          size='small'
          margin='none'
          placeholder='Search'
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
        return <ProjectListingItem project={project} />;
      })}
    </PageLayoutWrapper>
  );
};

export default ProjectListingPage;
