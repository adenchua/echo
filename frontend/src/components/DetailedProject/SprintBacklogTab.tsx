import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import { differenceInBusinessDays, format } from "date-fns";
import { useContext, useMemo, useState } from "react";

import OfflineBacklogGenerator from "../../classes/OfflineBacklogGenerator";
import { ActiveSprintContext } from "../../contexts/ActiveSprintContextProvider";
import { EpicsContext } from "../../contexts/EpicsContextProvider";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import useSprintBacklog from "../../hooks/useSprintBacklog";
import Project from "../../types/Project";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";
import download from "../../utils/downloadHtmlDoc";
import getFilteredTickets from "../../utils/getFilteredTickets";
import getSortedTickets from "../../utils/getSortedTickets";
import getTicketsByEpics from "../../utils/getTicketsByEpics";
import { pluralize } from "../../utils/stringUtils";
import SprintEndDialog from "../SprintEndDialog";
import SprintStartDialog from "../SprintStartDialog";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import TicketSection from "../TicketSection";
import TicketSortSelectDropdown, { TicketSortType } from "../TicketSortSelectDropdown";
import SearchBar from "../common/SearchBar";
import SecondaryText from "../common/SecondaryText";
import TypographySprintInformation from "../common/TypographySprintInformation";
import DownloadIcon from "../icons/DownloadIcon";
import EndSprintIcon from "../icons/EndSprintIcon";
import StartSprintIcon from "../icons/StartSprintIcon";

interface SprintBacklogTabProps {
  project: Project;
}

const SprintBacklogTab = (props: SprintBacklogTabProps) => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const { usersMap } = useContext(ProjectMembersContext);
  const { epicsMap } = useContext(EpicsContext);
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

  const renderSprintDetails = () => {
    if (!activeSprint) {
      return (
        <TypographySprintInformation>
          No Active Sprint <span>&#8729;</span> {sprintTickets.length}{" "}
          {pluralize("ticket", "tickets", sprintTickets.length)}
        </TypographySprintInformation>
      );
    }

    const { number, startDate, endDate } = activeSprint;
    const formattedStartDate = startDate ? format(new Date(startDate), "dd LLL") : "Invalid Date";
    const formattedEndDate = endDate ? format(new Date(endDate), "dd LLL") : "Invalid Date";
    const dayDifference = differenceInBusinessDays(new Date(endDate), new Date());

    return (
      <Box display="flex" alignItems="baseline" gap={1}>
        <TypographySprintInformation>Sprint {number}</TypographySprintInformation>
        <TypographySprintInformation>
          <span>&#8729;</span> {formattedStartDate} to {formattedEndDate}
        </TypographySprintInformation>
        {dayDifference >= 0 && (
          <TypographySprintInformation>
            <span>&#8729;</span> {dayDifference} business {pluralize("day", "days", dayDifference)}{" "}
            remaining
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

  const renderTicketNavbar = () => (
    <div>
      <TicketNavbarWrapper isTicketSelected={!!selectedTicketId}>
        {renderSprintDetails()}
        <Box flexGrow={1} />
        {(!activeSprint || activeSprint.hasEnded) && (
          <Button
            size="small"
            startIcon={<StartSprintIcon />}
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setShowStartSprintDialog(true)}
          >
            Start Sprint
          </Button>
        )}
        {activeSprint && !activeSprint.hasEnded && (
          <Button
            size="small"
            startIcon={<EndSprintIcon />}
            color="error"
            sx={{ whiteSpace: "nowrap" }}
            onClick={() => setShowEndSprintDialog(true)}
          >
            End Sprint
          </Button>
        )}
        <TicketFilter onSelectHandler={handleFilterSelection} />
        <TicketSortSelectDropdown
          sortSelection={sortSelection}
          onChangeHandler={handleSortSelectionOnChange}
        />
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search tickets"
        />
      </TicketNavbarWrapper>
    </div>
  );

  const getHtmlString = (): string => {
    const offlineBacklogGenerator = new OfflineBacklogGenerator(
      displayedTicketsByEpics,
      project.title,
      false,
      usersMap,
      epicsMap,
    );

    return offlineBacklogGenerator.generateHtmlDocument();
  };

  return (
    <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
      {renderTicketNavbar()}
      <Box p={3} mt={5}>
        {sprintTickets && sprintTickets.length > 0 && (
          <Button
            onClick={() => download(`${project.title}-sprint-backlog.html`, getHtmlString())}
            startIcon={<DownloadIcon />}
          >
            Download for offline (.html)
          </Button>
        )}
        {sprintTickets && sprintTickets.length === 0 && (
          <SecondaryText>There are no tickets in the backlog.</SecondaryText>
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
