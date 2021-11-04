import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SprintEndIcon from "@mui/icons-material/RunningWithErrors";
import SprintIcon from "@mui/icons-material/Timelapse";
import TextField from "@mui/material/TextField";

import ProjectInterface from "../../types/ProjectInterface";
import SprintBacklogTicket from "../SprintBacklogTicket";

interface SprintBacklogTabProps {
  project: ProjectInterface;
}

const SprintBacklogTab = (props: SprintBacklogTabProps): JSX.Element => {
  const renderStartSprintButton = (): JSX.Element => (
    <Button variant='contained' startIcon={<SprintIcon />}>
      Start Sprint
    </Button>
  );

  const renderEndSprintButton = (): JSX.Element => (
    <Button variant='outlined' startIcon={<SprintEndIcon />} color='error' sx={{ minWidth: "132px" }}>
      End Sprint
    </Button>
  );

  return (
    <div>
      <Box display='flex' alignItems='center' justifyContent='space-between' mb={3}>
        <div>
          <Typography variant='h5'>Sprint 2</Typography>
          <Typography variant='caption' color='grey.600' paragraph>
            14 Dec - 18 Dec <span>&#183;</span> 14 days remaining
          </Typography>
        </div>
        {renderStartSprintButton()}
      </Box>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <TextField placeholder='Search...' size='small' />
      </Box>
      <SprintBacklogTicket />
      <SprintBacklogTicket />
      <SprintBacklogTicket />
      <SprintBacklogTicket />
    </div>
  );
};

export default SprintBacklogTab;
