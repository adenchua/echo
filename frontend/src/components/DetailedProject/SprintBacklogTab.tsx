import SprintStartIcon from "@mui/icons-material/EventAvailableOutlined";
import SprintEndIcon from "@mui/icons-material/EventRepeatOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { differenceInBusinessDays, format } from "date-fns";
import { useContext, useMemo, useState } from "react";

import { ActiveSprintContext } from "../../contexts/ActiveSprintContextProvider";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import Project from "../../types/Project";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";
import getFilteredTickets from "../../utils/getFilteredTickets";
import getSortedTickets from "../../utils/getSortedTickets";
import getTicketsByEpics from "../../utils/getTicketsByEpics";
import SprintEndDialog from "../SprintEndDialog";
import SprintStartDialog from "../SprintStartDialog";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import TicketSection from "../TicketSection";
import TicketSortSelectDropdown, { TicketSortType } from "../TicketSortSelectDropdown";
import TypographySprintInformation from "../common/TypographySprintInformation";

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
        <TypographySprintInformation>
          No Active Sprint <span>&#8729;</span> {sprintTickets.length} ticket(s)
        </TypographySprintInformation>
      );
    }

    const { number, startDate, endDate } = activeSprint;
    const formattedStartDate = startDate ? format(new Date(startDate), "LLL dd") : "Invalid Date";
    const formattedEndDate = endDate ? format(new Date(endDate), "LLL dd") : "Invalid Date";
    const dayDifference = differenceInBusinessDays(new Date(endDate), new Date());

    return (
      <Box display='flex' alignItems='baseline' gap={1}>
        <TypographySprintInformation>
          Sprint {number} <span>&#8729;</span>
        </TypographySprintInformation>
        {dayDifference >= 0 && (
          <TypographySprintInformation>
            {formattedStartDate} - {formattedEndDate}
            <span>&#8729;</span> {dayDifference} business day(s) remaining
          </TypographySprintInformation>
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

  const renderTicketNavbar = (): JSX.Element => (
    <div>
      <TicketNavbarWrapper isTicketSelected={!!selectedTicketId}>
        {renderSprintDetails()}
        <Box flexGrow={1} />
        {(!activeSprint || activeSprint.hasEnded) && (
          <Button
            size='small'
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
            startIcon={<SprintEndIcon />}
            color='error'
            sx={{ whiteSpace: "nowrap" }}
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
    </div>
  );

  return (
    <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
      {renderTicketNavbar()}
      <Box p={3} mt={5}>
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
