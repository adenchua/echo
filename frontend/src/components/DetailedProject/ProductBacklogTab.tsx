import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import ProjectInterface from '../../types/ProjectInterface';
import Ticket from '../Ticket';
import CreateTicketButtonWithDialog from '../CreateTicketButtonWithDialog';
import TicketDetailsRightDrawer from '../TicketDetailsRightDrawer';
import { TicketsContext } from '../contexts/TicketsContextProvider';
import { matchString } from '../../utils/matchString';

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { tickets } = useContext(TicketsContext);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const renderMobileHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant="mobile" />;
  };

  const renderDesktopHeaderButtons = (): JSX.Element => {
    return <CreateTicketButtonWithDialog projectId={projectId} variant="desktop" />;
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
      <Box sx={{ marginRight: '240px' }}>
        <Typography variant="h5" paragraph>
          Product Backlog
        </Typography>
        <Box display="flex" gap={2} mb={3}>
          {renderDesktopHeaderButtons()}
          {renderMobileHeaderButtons()}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              style: {
                borderRadius: 0,
              },
            }}
            placeholder="Search..."
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        {tickets && tickets.length > 0 && (
          <Box sx={{ border: '1px solid', borderColor: 'grey.300', borderBottom: 0 }}>
            {tickets.map((ticket) => {
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
          <Typography variant="body2" color="GrayText">
            There are no tickets in the backlog.
          </Typography>
        )}
      </Box>
      {renderDrawer()}
    </>
  );
};

export default ProductBacklogTab;
