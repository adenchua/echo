import { useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

import Project from "../../types/Project";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import TicketSortSelectDropdown, { TicketSortType } from "../TicketSortSelectDropdown";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import CreateTicketForm from "../CreateTicketForm";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";
import getFilteredTickets from "../../utils/getFilteredTickets";
import getSortedTickets from "../../utils/getSortedTickets";
import getTicketsByEpics from "../../utils/getTicketsByEpics";
import TicketSection from "../TicketSection";

interface ProductBacklogTabProps {
  project: Project;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [sortSelection, setSortSelection] = useState<TicketSortType>("priority-dsc");
  const [filterSelection, setFilterSelection] = useState<TicketFilterType>(null);
  const [showTicketCreationForm, setShowTicketCreationForm] = useState<boolean>(false);

  const filteredTickets = useMemo(() => {
    return getFilteredTickets(filterSelection, tickets);
  }, [filterSelection, tickets]);

  const sortedTickets = useMemo(() => {
    return getSortedTickets(sortSelection, filteredTickets);
  }, [sortSelection, filteredTickets]);

  const displayedTicketsByEpics = useMemo(() => {
    return getTicketsByEpics(sortedTickets);
    //temp fix to get sort working
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <IconButton
          onClick={() => setShowTicketCreationForm(true)}
          color='primary'
          size='small'
          sx={{ border: "1px solid", borderColor: "primary.main" }}
        >
          <AddIcon fontSize='small' />
        </IconButton>
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
        <Typography color='grey.500' variant='caption' fontStyle='italic'>
          Product Backlog <span>&#8729;</span> {`${tickets.length} ticket(s)`}
        </Typography>
        <Box flexGrow={1} />
        <Button
          startIcon={<AddIcon fontSize='small' />}
          sx={{ display: { xs: "none", sm: "flex" } }}
          onClick={() => setShowTicketCreationForm(true)}
          size='small'
        >
          Add Ticket
        </Button>
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
    <>
      <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
        {renderMobileTicketNavbar()}
        {renderDesktopTicketNavbar()}
        <Box p={3}>
          {showTicketCreationForm && (
            <Box mb={4}>
              <CreateTicketForm projectId={projectId} onClose={() => setShowTicketCreationForm(false)} />
            </Box>
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
            <Typography variant='body2' color='GrayText'>
              There are no tickets in the backlog.
            </Typography>
          )}
        </Box>
      </Box>
      {renderDrawer()}
    </>
  );
};

export default ProductBacklogTab;
