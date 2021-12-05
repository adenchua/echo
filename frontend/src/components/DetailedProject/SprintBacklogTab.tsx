import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SprintEndIcon from "@mui/icons-material/RunningWithErrors";
import SprintStartIcon from "@mui/icons-material/Timelapse";
import { format, differenceInBusinessDays } from "date-fns";

import ProjectInterface from "../../types/ProjectInterface";
import SprintStartDialog from "../SprintStartDialog";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import SprintEndDialog from "../SprintEndDialog";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import Ticket from "../Ticket";
import { matchString } from "../../utils/matchString";

interface SprintBacklogTabProps {
  project: ProjectInterface;
}

const SprintBacklogTab = (props: SprintBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { sprintIds, _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const { activeSprint, onStartSprint, onEndSprint } = useSprintBacklog(sprintIds);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showEndSprintDialog, setShowEndSprintDialog] = useState<boolean>(false);
  const [showStartSprintDialog, setShowStartSprintDialog] = useState<boolean>(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const sprintTickets = tickets.filter((ticket) => ticket.isInSprint === true);

  const handleSetSelectedTicket = (ticketId: string) => {
    if (!selectedTicketId) {
      setSelectedTicketId(ticketId);
      return;
    }
    if (selectedTicketId === ticketId) {
      setSelectedTicketId(null); //de select
      return;
    }

    setSelectedTicketId(ticketId);
  };

  const renderSprintDetails = (): JSX.Element => {
    if (!activeSprint) {
      return <Typography variant='h5'>Sprint Backlog</Typography>;
    }

    const { number, startDate, endDate } = activeSprint;
    const formattedStartDate = startDate ? format(new Date(startDate), "LLL dd") : "Invalid Date";
    const formattedEndDate = endDate ? format(new Date(endDate), "LLL dd") : "Invalid Date";
    const dayDifference = differenceInBusinessDays(new Date(endDate), new Date());

    return (
      <div>
        <Typography variant='h5'>Sprint {number}</Typography>
        {dayDifference >= 0 && (
          <Typography variant='caption' color='grey.600' paragraph>
            {formattedStartDate} - {formattedEndDate} <span>&#8729;</span> {dayDifference} business days remaining
          </Typography>
        )}
        {dayDifference < 0 && (
          <Typography variant='caption' color={dayDifference > 0 ? "grey.600" : "error"} paragraph>
            {formattedStartDate} - {formattedEndDate} <span>&#8729;</span> Overdue
          </Typography>
        )}
      </div>
    );
  };

  const renderDrawer = () => {
    if (!selectedTicketId) {
      return null;
    }

    const ticket = tickets.find((ticket) => ticket._id === selectedTicketId);

    if (!ticket) {
      return null;
    }

    return (
      <TicketDetailsRightDrawer ticket={ticket} onClose={() => setSelectedTicketId(null)} isOpen={!!selectedTicketId} />
    );
  };

  return (
    <Box sx={{ marginRight: "240px" }}>
      <Box display='flex' alignItems='flex-start' justifyContent='space-between' mb={1}>
        {renderSprintDetails()}
        {(!activeSprint || activeSprint.hasEnded) && (
          <Button
            variant='contained'
            startIcon={<SprintStartIcon />}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setShowStartSprintDialog(true)}
          >
            Start Sprint
          </Button>
        )}
        {activeSprint && !activeSprint.hasEnded && (
          <Button
            variant='contained'
            startIcon={<SprintEndIcon />}
            sx={{ minWidth: "132px", whiteSpace: "nowrap" }}
            onClick={() => setShowEndSprintDialog(true)}
          >
            End Sprint
          </Button>
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
      {sprintTickets && sprintTickets.length === 0 && (
        <Typography variant='body2' color='GrayText'>
          There are no tickets in the backlog.
        </Typography>
      )}
      {sprintTickets?.map((ticket) => {
        const { _id: id, title } = ticket;
        if (matchString(searchInput, title)) {
          return (
            <Box key={id} onClick={() => handleSetSelectedTicket(id)}>
              <Ticket ticket={ticket} showSprintToggleCheckBox={false} bgGrey={id === selectedTicketId} />
            </Box>
          );
        }
        return null;
      })}
      <SprintEndDialog
        showEndSprintDialog={showEndSprintDialog}
        onClose={() => setShowEndSprintDialog(false)}
        projectId={projectId}
        sprintTickets={tickets}
        sprintId={activeSprint?._id}
        onEndSprint={onEndSprint}
      />
      <SprintStartDialog
        showStartSprintDialog={showStartSprintDialog}
        onClose={() => setShowStartSprintDialog(false)}
        onStartSprint={onStartSprint}
        projectId={projectId}
        sprintTicketsCount={tickets?.length}
      />
      {renderDrawer()}
    </Box>
  );
};

export default SprintBacklogTab;
