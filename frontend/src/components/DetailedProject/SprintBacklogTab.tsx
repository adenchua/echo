import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SprintEndIcon from "@mui/icons-material/RunningWithErrors";
import SprintIcon from "@mui/icons-material/Timelapse";
import TextField from "@mui/material/TextField";

import ProjectInterface from "../../types/ProjectInterface";
import SprintBacklogTicket from "../SprintBacklogTicket";
import useSprintBacklog from "../../hooks/useSprintBacklog";

interface SprintBacklogTabProps {
  project: ProjectInterface;
}

const SprintBacklogTab = (props: SprintBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { backlogIds, sprintIds } = project;
  const { tickets, isLoading, sprint } = useSprintBacklog(backlogIds, sprintIds);
  const [searchInput, setSearchInput] = useState<string>("");

  const renderStartSprintButton = (): JSX.Element => (
    <Button variant='contained' startIcon={<SprintIcon />} sx={{ whiteSpace: "nowrap" }}>
      Start Sprint
    </Button>
  );

  const renderEndSprintButton = (): JSX.Element => (
    <Button
      variant='outlined'
      startIcon={<SprintEndIcon />}
      color='error'
      sx={{ minWidth: "132px", whiteSpace: "nowrap" }}
    >
      End Sprint
    </Button>
  );

  const renderSprintDetails = (): JSX.Element => {
    if (!sprint) {
      return <div />;
    }

    const { number, startDate, endDate } = sprint;
    return (
      <div>
        <Typography variant='h5'>Sprint {number}</Typography>
        <Typography variant='caption' color='grey.600' paragraph>
          {startDate} - {endDate} <span>&#183;</span> 14 days remaining
        </Typography>
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Box display='flex' alignItems='flex-start' justifyContent='space-between' mb={3}>
        {renderSprintDetails()}
        {(!sprint || sprint.hasEnded) && renderStartSprintButton()}
        {sprint && !sprint.hasEnded && renderEndSprintButton()}
      </Box>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <TextField
          placeholder='Search...'
          size='small'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Box>
      {tickets?.map((ticket) => {
        const { _id: id, title } = ticket;
        if (title.toLowerCase().includes(searchInput.toLowerCase())) {
          return <SprintBacklogTicket key={id} ticket={ticket} />;
        }
        return null;
      })}
    </div>
  );
};

export default SprintBacklogTab;
