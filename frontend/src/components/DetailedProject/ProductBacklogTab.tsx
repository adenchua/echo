import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ProjectInterface from "../../types/ProjectInterface";
import Ticket from "../Ticket";
import CreateTicketButtonWithDialog from "../CreateTicketButtonWithDialog";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";
import { TicketsContext } from "../TicketsContextProvider";

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const renderMobileHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant='mobile' />;
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
      <TicketDetailsRightDrawer ticket={ticket} onClose={() => setSelectedTicketId(null)} isOpen={!!selectedTicketId} />
    );
  };

  return (
    <>
      <Box sx={{ marginRight: selectedTicketId ? "240px" : 0 }}>
        <Typography variant='h5' paragraph>
          Product Backlog
        </Typography>
        <Box display='flex' alignItems='center' gap={2} mb={3}>
          {renderDesktopHeaderButtons()}
          {renderMobileHeaderButtons()}
          <TextField
            placeholder='Search...'
            size='small'
            margin='none'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        {tickets.map((ticket) => {
          if (ticket.title.toLowerCase().includes(searchInput.toLowerCase())) {
            return (
              <Box key={ticket._id} onClick={() => handleSetSelectedTicket(ticket._id)}>
                <Ticket ticket={ticket} showSprintToggleCheckBox />
              </Box>
            );
          }
          return null;
        })}
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
