import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import { JSX, useContext, useMemo, useState } from "react";

import OfflineBacklogGenerator from "../../classes/OfflineBacklogGenerator";
import { EpicsContext } from "../../contexts/EpicsContextProvider";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import Project from "../../types/Project";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";
import download from "../../utils/downloadHtmlDoc";
import getFilteredTickets from "../../utils/getFilteredTickets";
import getSortedTickets from "../../utils/getSortedTickets";
import getTicketsByEpics from "../../utils/getTicketsByEpics";
import { pluralize } from "../../utils/stringUtils";
import AddTicketButtonWithDialog from "../AddTicketButtonWithDialog";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import TicketSection from "../TicketSection";
import TicketSortSelectDropdown, { TicketSortType } from "../TicketSortSelectDropdown";
import Button from "../common/Button";
import SearchBar from "../common/SearchBar";
import SecondaryText from "../common/SecondaryText";
import TypographySprintInformation from "../common/TypographySprintInformation";
import DownloadIcon from "../icons/DownloadIcon";

interface ProductBacklogTabProps {
  project: Project;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const { usersMap } = useContext(ProjectMembersContext);
  const { epicsMap } = useContext(EpicsContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [sortSelection, setSortSelection] = useState<TicketSortType>("priority-dsc");
  const [filterSelection, setFilterSelection] = useState<TicketFilterType>(null);

  const filteredTickets = useMemo(() => {
    return getFilteredTickets(filterSelection, tickets);
  }, [filterSelection, tickets]);

  const sortedTickets = useMemo(() => {
    return getSortedTickets(sortSelection, filteredTickets);
  }, [sortSelection, filteredTickets]);

  const displayedTicketsByEpics = useMemo(() => {
    return getTicketsByEpics(sortedTickets);
  }, [sortedTickets, sortSelection]);

  const handleFilterSelection = (newFilter: TicketFilterType): void => {
    setFilterSelection(newFilter);
  };

  const handleSortSelectionOnChange = (e: SelectChangeEvent): void => {
    setSortSelection(e.target.value as TicketSortType);
  };

  const handleSetSelectedTicket = (ticketId: string): void => {
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

  const renderDrawer = (): JSX.Element | null => {
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
        <TypographySprintInformation>
          Product Backlog <span>&#8729;</span>{" "}
          {`${tickets.length} ${pluralize("ticket", "tickets", tickets.length)}`}
        </TypographySprintInformation>
        <Box flexGrow={1} />
        <AddTicketButtonWithDialog projectId={projectId} />
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
      true,
      usersMap,
      epicsMap,
    );

    return offlineBacklogGenerator.generateHtmlDocument();
  };

  return (
    <>
      <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
        {renderTicketNavbar()}
        <Box p={3} mt={8}>
          {tickets && tickets.length > 0 && (
            <Button
              onClick={() => download(`${project.title}-product-backlog.html`, getHtmlString())}
              startIcon={<DownloadIcon />}
              color="secondary"
              sx={{ mb: 4 }}
            >
              Download copy (.html)
            </Button>
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
          {tickets && tickets.length === 0 && (
            <SecondaryText>There are no tickets in the backlog.</SecondaryText>
          )}
        </Box>
      </Box>
      {renderDrawer()}
    </>
  );
};

export default ProductBacklogTab;
