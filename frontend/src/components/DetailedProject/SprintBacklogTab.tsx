import React, { useContext, useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SprintEndIcon from "@mui/icons-material/DirectionsWalk";
import InputBase from "@mui/material/InputBase";
import SprintStartIcon from "@mui/icons-material/DirectionsRun";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import { format, differenceInBusinessDays } from "date-fns";

import ProjectInterface from "../../types/ProjectInterface";
import SprintStartDialog from "../SprintStartDialog";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import SprintEndDialog from "../SprintEndDialog";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import Ticket from "../Ticket";
import { matchString } from "../../utils/matchString";
import TicketSortSelectDropdown, { priorityMap, TicketSortType } from "../TicketSortSelectDropdown";
import TicketNavbarWrapper from "../TicketNavbarWrapper";

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
  const [sortSelection, setSortSelection] = useState<TicketSortType>("priority-dsc");
  const sprintTickets = tickets.filter((ticket) => ticket.isInSprint === true);

  const sortedTickets = useMemo(() => {
    switch (sortSelection) {
      case "priority-dsc":
        return sprintTickets.sort((a, b) => {
          const aPriorityType = priorityMap[a.priority];
          const bPriorityType = priorityMap[b.priority];
          return bPriorityType - aPriorityType;
        });
      case "creation-asc":
        return sprintTickets.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      default:
        return sprintTickets; // invalid sort order
    }
  }, [sortSelection, sprintTickets]);

  const handleSortSelectionOnChange = (e: SelectChangeEvent): void => {
    setSortSelection(e.target.value as TicketSortType);
  };

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
      return <div />;
    }

    const { number, startDate, endDate } = activeSprint;
    const formattedStartDate = startDate ? format(new Date(startDate), "LLL dd") : "Invalid Date";
    const formattedEndDate = endDate ? format(new Date(endDate), "LLL dd") : "Invalid Date";
    const dayDifference = differenceInBusinessDays(new Date(endDate), new Date());

    return (
      <Box display='flex' alignItems='baseline' gap={1}>
        <Typography variant='body2'>
          Sprint {number} <span>&#8729;</span>
        </Typography>
        {dayDifference >= 0 && (
          <Typography variant='caption' color='grey.500'>
            {formattedStartDate} - {formattedEndDate} <span>&#8729;</span> {dayDifference} business day(s) remaining
          </Typography>
        )}
        {dayDifference < 0 && (
          <Typography variant='caption' color={dayDifference > 0 ? "grey.500" : "error"}>
            {formattedStartDate} - {formattedEndDate} <span>&#8729;</span> {Math.abs(dayDifference)} day(s) overdue
          </Typography>
        )}
      </Box>
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
      <TicketDetailsRightDrawer
        ticket={ticket}
        onClose={() => setSelectedTicketId(null)}
        isOpen={!!selectedTicketId}
        projectId={projectId}
      />
    );
  };

  return (
    <Box sx={{ mr: selectedTicketId ? "240px" : "" }}>
      <TicketNavbarWrapper>
        {renderSprintDetails()}
        <Box flexGrow={1} />
        {(!activeSprint || activeSprint.hasEnded) && (
          <Button
            size='small'
            variant='outlined'
            startIcon={<SprintStartIcon />}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setShowStartSprintDialog(true)}
          >
            Start Sprint
          </Button>
        )}
        {activeSprint && !activeSprint.hasEnded && (
          <Button
            size='small'
            variant='outlined'
            startIcon={<SprintEndIcon />}
            color='error'
            sx={{ minWidth: "132px", whiteSpace: "nowrap" }}
            onClick={() => setShowEndSprintDialog(true)}
          >
            End Sprint
          </Button>
        )}
        <TicketSortSelectDropdown sortSelection={sortSelection} onChangeHandler={handleSortSelectionOnChange} />
        <InputBase
          sx={{
            borderLeft: "1px solid",
            borderColor: "grey.300",
            px: 1,
            "& .MuiInputBase-input": {
              ml: 0.5,
              fontSize: 14,
            },
          }}
          startAdornment={<SearchIcon fontSize='small' color='disabled' />}
          size='small'
          placeholder='Search...'
          type='search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </TicketNavbarWrapper>
      <Box p={3}>
        {sprintTickets && sprintTickets.length === 0 && (
          <Typography variant='body2' color='GrayText'>
            There are no tickets in the backlog.
          </Typography>
        )}
        {sortedTickets && sortedTickets.length > 0 && (
          <Box sx={{ border: "1px solid", borderColor: "grey.300", borderBottom: 0 }}>
            {sortedTickets.map((ticket) => {
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
          </Box>
        )}
      </Box>
      <SprintEndDialog
        showEndSprintDialog={showEndSprintDialog}
        onClose={() => setShowEndSprintDialog(false)}
        projectId={projectId}
        sprintTickets={sprintTickets}
        sprintId={activeSprint?._id}
        onEndSprint={onEndSprint}
      />
      <SprintStartDialog
        showStartSprintDialog={showStartSprintDialog}
        onClose={() => setShowStartSprintDialog(false)}
        onStartSprint={onStartSprint}
        projectId={projectId}
        sprintTicketsCount={sprintTickets.length}
      />
      {renderDrawer()}
    </Box>
  );
};

export default SprintBacklogTab;
