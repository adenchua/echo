import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { format, differenceInBusinessDays } from "date-fns";

import ProjectInterface from "../../types/ProjectInterface";
import StartSprintButtonWithDialog from "../StartSprintButtonWithDialog";
import SprintBacklogTicket from "../SprintBacklogTicket";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import EndSprintButtonWithDialog from "../EndSprintButtonWithDialog";

interface SprintBacklogTabProps {
  project: ProjectInterface;
}

const SprintBacklogTab = (props: SprintBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { backlogIds, sprintIds, _id: projectId } = project;
  const { tickets, isLoading, activeSprint, onUpdateTicket, onStartSprint, onEndSprint } = useSprintBacklog(
    backlogIds,
    sprintIds
  );
  const [searchInput, setSearchInput] = useState<string>("");

  const renderSprintDetails = (): JSX.Element => {
    if (!activeSprint) {
      return <Typography variant='h5'>Sprint Backlog</Typography>;
    }

    const { number, startDate, endDate } = activeSprint;
    const formattedStartDate = startDate ? format(new Date(startDate), "LLL dd") : "Invalid Date";
    const formattedEndDate = endDate ? format(new Date(endDate), "LLL dd") : "Invalid Date";
    const dayDifference = differenceInBusinessDays(new Date(endDate), new Date(startDate));

    return (
      <div>
        <Typography variant='h5'>Sprint {number}</Typography>
        <Typography variant='caption' color={dayDifference > 0 ? "grey.600" : "error"} paragraph>
          {formattedStartDate} - {formattedEndDate} <span>&#8729;</span> {dayDifference} business days remaining
        </Typography>
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Box display='flex' alignItems='flex-start' justifyContent='space-between' mb={1}>
        {renderSprintDetails()}
        {(!activeSprint || activeSprint.hasEnded) && (
          <StartSprintButtonWithDialog
            onStartSprint={onStartSprint}
            projectId={projectId}
            sprintTicketsCount={tickets?.length}
          />
        )}
        {activeSprint && !activeSprint.hasEnded && (
          <EndSprintButtonWithDialog
            projectId={projectId}
            sprintTickets={tickets}
            sprintId={activeSprint._id}
            onEndSprint={onEndSprint}
          />
        )}
      </Box>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        <TextField
          placeholder='Search...'
          size='small'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Box>
      {tickets && tickets.length === 0 && (
        <Typography variant='body2' color='GrayText'>
          There are no tickets in the backlog.
        </Typography>
      )}
      {tickets?.map((ticket) => {
        const { _id: id, title } = ticket;
        if (title.toLowerCase().includes(searchInput.toLowerCase())) {
          return <SprintBacklogTicket key={id} ticket={ticket} onUpdateTicket={onUpdateTicket} />;
        }
        return null;
      })}
    </div>
  );
};

export default SprintBacklogTab;
