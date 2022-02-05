import React, { useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import ProjectInterface from "../../types/ProjectInterface";
import Ticket from "../Ticket";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import { TicketsContext } from "../../contexts/TicketsContextProvider";
import { matchString } from "../../utils/matchString";
import TicketSortSelectDropdown, { priorityMap, TicketSortType } from "../TicketSortSelectDropdown";
import TicketNavbarWrapper from "../TicketNavbarWrapper";
import CreateTicketForm from "../CreateTicketForm";
import TicketFilter, { TicketFilterType } from "../TicketFilter";
import { TICKET_DRAWER_WIDTH } from "../../utils/constants";

interface ProductBacklogTabProps {
  project: ProjectInterface;
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
    if (!filterSelection) {
      return tickets;
    }
    const [filterKeyType, filterValue] = filterSelection.split("-");
    switch (filterKeyType) {
      case "assignee":
        return tickets.filter((ticket) => ticket.assigneeId === filterValue);
      case "not_status":
        return tickets.filter((ticket) => ticket.status !== filterValue);
      case "status":
        return tickets.filter((ticket) => ticket.status === filterValue);
      case "epic":
        return tickets.filter((ticket) => ticket.epicId === filterValue);
      default:
        return tickets; // invalid filter
    }
  }, [filterSelection, tickets]);

  const sortedTickets = useMemo(() => {
    switch (sortSelection) {
      case "priority-dsc":
        return filteredTickets.sort((a, b) => {
          const aPriorityType = priorityMap[a.priority];
          const bPriorityType = priorityMap[b.priority];
          return bPriorityType - aPriorityType;
        });
      case "creation-asc":
        return filteredTickets.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      default:
        return filteredTickets; // invalid sort order
    }
  }, [sortSelection, filteredTickets]);

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

  return (
    <>
      <Box sx={{ mr: selectedTicketId ? `${TICKET_DRAWER_WIDTH}px` : "" }}>
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
        <Box p={3}>
          {showTicketCreationForm && (
            <Box mb={4}>
              <CreateTicketForm projectId={projectId} onClose={() => setShowTicketCreationForm(false)} />
            </Box>
          )}
          {sortedTickets && sortedTickets.length > 0 && (
            <Box sx={{ border: "1px solid", borderColor: "grey.300", borderBottom: 0 }}>
              {sortedTickets.map((ticket) => {
                if (matchString(searchInput, ticket.title)) {
                  return (
                    <Box key={ticket._id} onClick={() => handleSetSelectedTicket(ticket._id)}>
                      <Ticket ticket={ticket} showSprintToggleCheckBox bgGrey={ticket._id === selectedTicketId} />
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          )}
          {tickets && tickets.length === 0 && (
            <Typography variant='body2' color='GrayText'>
              There are no tickets in the backlog.
            </Typography>
          )}
        </Box>
        {renderDrawer()}
      </Box>
    </>
  );
};

export default ProductBacklogTab;
