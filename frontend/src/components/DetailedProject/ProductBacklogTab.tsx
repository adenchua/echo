import React, { useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";

import ProjectInterface from "../../types/ProjectInterface";
import Ticket from "../Ticket";
import CreateTicketButtonWithDialog from "../CreateTicketButtonWithDialog";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import { matchString } from "../../utils/matchString";
import TicketSortSelectDropdown, { priorityMap, TicketSortType } from "../TicketSortSelectDropdown";

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

  const sortedTickets = useMemo(() => {
    switch (sortSelection) {
      case "priority-dsc":
        return tickets.sort((a, b) => {
          const aPriorityType = priorityMap[a.priority];
          const bPriorityType = priorityMap[b.priority];
          return bPriorityType - aPriorityType;
        });
      case "creation-asc":
        return tickets.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      case "creation-dsc":
        return tickets.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
      default:
        return tickets; // invalid sort order
    }
  }, [sortSelection, tickets]);

  const handleSortSelectionOnChange = (e: SelectChangeEvent): void => {
    setSortSelection(e.target.value as TicketSortType);
  };

  const renderDesktopHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant='desktop' />;
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
      <Box sx={{ mr: selectedTicketId ? "240px" : "" }}>
        <Typography variant='h5' paragraph>
          {`Product Backlog (${tickets.length})`}
        </Typography>
        <Box display='flex' gap={2} mb={3} maxHeight={40}>
          {renderDesktopHeaderButtons()}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
              style: {
                borderRadius: 0,
                maxHeight: "100%",
              },
            }}
            placeholder='Search...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <TicketSortSelectDropdown sortSelection={sortSelection} onChangeHandler={handleSortSelectionOnChange} />
        </Box>
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
    </>
  );
};

export default ProductBacklogTab;
