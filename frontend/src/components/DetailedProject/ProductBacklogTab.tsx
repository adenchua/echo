import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ProjectInterface from "../../types/ProjectInterface";
import ProductBacklogTicket from "../ProductBacklogTicket";
import useProductBacklog from "../../hooks/useProductBacklog";
import CreateTicketButtonWithDialog from "../CreateTicketButtonWithDialog";
import StoryInterface from "../../types/StoryInterface";
import TicketDetailsRightDrawer from "../TicketDetailsRightDrawer";

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { backlogIds, _id: projectId } = project;
  const { tickets, isLoading, onAddTicket, onUpdateTicket } = useProductBacklog(backlogIds);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<StoryInterface | null>(null);

  const renderMobileHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant='mobile' onAddTicket={onAddTicket} />;
  };

  const renderDesktopHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant='desktop' onAddTicket={onAddTicket} />;
  };

  const handleSetSelectedTicket = (ticket: StoryInterface) => {
    if (!selectedTicket) {
      setSelectedTicket(ticket);
      return;
    }
    if (ticket._id === selectedTicket._id) {
      setSelectedTicket(null); //de select
      return;
    }

    setSelectedTicket(ticket);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box sx={{ marginRight: selectedTicket ? "240px" : 0 }}>
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
              <Box key={ticket._id} onClick={() => handleSetSelectedTicket(ticket)}>
                <ProductBacklogTicket ticket={ticket} onUpdateTicket={onUpdateTicket} />
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
      {selectedTicket && (
        <TicketDetailsRightDrawer
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdateTicket={onUpdateTicket}
          isOpen={!!selectedTicket}
        />
      )}
    </>
  );
};

export default ProductBacklogTab;
