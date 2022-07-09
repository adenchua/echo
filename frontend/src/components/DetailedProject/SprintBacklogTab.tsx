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
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import Project from "../../types/Project";
import SprintStartDialog from "../SprintStartDialog";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import SprintEndDialog from "../SprintEndDialog";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import TicketSortSelectDropdown, { TicketSortType } from "../TicketSortSelectDropdown";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import { ActiveSprintContext } from "../../contexts/ActiveSprintContextProvider";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";
import getFilteredTickets from "../../utils/getFilteredTickets";
import getSortedTickets from "../../utils/getSortedTickets";
import TicketSection from "../TicketSection";
import getTicketsByEpics from "../../utils/getTicketsByEpics";

interface SprintBacklogTabProps {
  project: Project;
}

const SprintBacklogTab = (props: SprintBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const { activeSprint } = useContext(ActiveSprintContext);
  const { onStartSprint, onEndSprint } = useSprintBacklog();
  const [searchInput, setSearchInput] = useState<string>("");
  const [showEndSprintDialog, setShowEndSprintDialog] = useState<boolean>(false);
  const [showStartSprintDialog, setShowStartSprintDialog] = useState<boolean>(false);
  const [filterSelection, setFilterSelection] = useState<TicketFilterType>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [sortSelection, setSortSelection] = useState<TicketSortType>("priority-dsc");
  const sprintTickets = tickets.filter((ticket) => ticket.isInSprint === true);

  const filteredTickets = useMemo(() => {
    return getFilteredTickets(filterSelection, sprintTickets);
  }, [filterSelection, sprintTickets]);

  const sortedTickets = useMemo(() => {
    return getSortedTickets(sortSelection, filteredTickets);
  }, [sortSelection, filteredTickets]);

  const displayedTicketsByEpics = useMemo(() => {
    return getTicketsByEpics(sortedTickets);
    //temp fix to get sort working
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortSelection, sortedTickets]);

  const handleFilterSelection = (newFilter: TicketFilterType): void => {
    setFilterSelection(newFilter);
  };

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
      return (
        <Typography variant='caption' color='grey.500' fontStyle='italic'>
          No Active Sprint <span>&#8729;</span> {sprintTickets.length} ticket(s)
        </Typography>
      );
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
          <Typography variant='caption' color='grey.500' fontStyle='italic'>
            {formattedStartDate} - {formattedEndDate}
            <Box sx={{ display: { xs: "none", lg: "inline" } }}>
              <span>&#8729;</span> {dayDifference} business day(s) remaining
            </Box>
          </Typography>
        )}
        {dayDifference < 0 && (
          <Typography variant='caption' color={dayDifference > 0 ? "grey.500" : "error"} fontStyle='italic'>
            {formattedStartDate} - {formattedEndDate}{" "}
            <Box sx={{ display: { xs: "none", lg: "inline" } }}>
              <span>&#8729;</span> {Math.abs(dayDifference)} day(s) overdue
            </Box>
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

  const renderMobileTicketNavbar = (): JSX.Element => (
    <Box sx={{ display: { xs: "block", lg: "none" } }}>
      <TicketNavbarWrapper>
        {renderSprintDetails()}
        {(!activeSprint || activeSprint.hasEnded) && (
          <IconButton
            onClick={() => setShowStartSprintDialog(true)}
            color='primary'
            size='small'
            sx={{ border: "1px solid", borderColor: "primary.main" }}
          >
            <SprintStartIcon fontSize='small' />
          </IconButton>
        )}
        {activeSprint && !activeSprint.hasEnded && (
          <IconButton
            onClick={() => setShowEndSprintDialog(true)}
            color='error'
            size='small'
            sx={{ border: "1px solid", borderColor: "error.main" }}
          >
            <SprintEndIcon fontSize='small' />
          </IconButton>
        )}
        <TicketFilter onSelectHandler={handleFilterSelection} />
        <TicketSortSelectDropdown sortSelection={sortSelection} onChangeHandler={handleSortSelectionOnChange} />
        <TextField
          size='small'
          margin='none'
          variant='filled'
          inputProps={{ style: { padding: 7, fontSize: 14 } }}
          placeholder='search'
          type='search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </TicketNavbarWrapper>
    </Box>
  );

  const renderDesktopTicketNavbar = (): JSX.Element => (
    <Box sx={{ display: { xs: "none", lg: "block" } }}>
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
        <TicketFilter onSelectHandler={handleFilterSelection} />
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
    </Box>
  );

  return (
    <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
      {renderMobileTicketNavbar()}
      {renderDesktopTicketNavbar()}
      <Box p={3}>
        {sprintTickets && sprintTickets.length === 0 && (
          <Typography variant='body2' color='GrayText'>
            There are no tickets in the backlog.
          </Typography>
        )}
        {displayedTicketsByEpics &&
          displayedTicketsByEpics.map((displayedTicketsByEpic) => {
            const { epicId, tickets: displayedTickets } = displayedTicketsByEpic;

            if (epicId === "others" && displayedTickets.length === 0) {
              return null; // prevent empty others section from showing if no tickets
            }

            return (
              <Box mb={5} key={epicId}>
                <TicketSection
                  tickets={displayedTickets}
                  searchInput={searchInput}
                  epicId={epicId}
                  onSelectTicket={handleSetSelectedTicket}
                  selectedTicketId={selectedTicketId}
                />
              </Box>
            );
          })}
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
