import { useState, useCallback, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLessOutlined";

import { matchString } from "../utils/matchString";
import Ticket from "./Ticket";
import TicketInterface from "../types/Ticket";
import { EpicsContext } from "../contexts/EpicsContextProvider";

interface TicketSectionProps {
  tickets: TicketInterface[];
  epicId: string;
  searchInput: string;
  onSelectTicket: (ticketId: string) => void;
  selectedTicketId: string | null;
}

const TicketSection = (props: TicketSectionProps): JSX.Element => {
  const { tickets, epicId, searchInput, onSelectTicket, selectedTicketId } = props;
  const [showTickets, setShowTickets] = useState<boolean>(true);
  const { epics } = useContext(EpicsContext);

  const getEpicDisplayTitle = useCallback(
    (epicId: string): string => {
      const [matchedEpic] = epics.filter((epic) => epic._id === epicId);

      if (matchedEpic) {
        return matchedEpic.title;
      }

      return "Others";
    },
    [epics]
  );

  return (
    <>
      <Box display='flex' alignItems='center' mb={1} gap={1}>
        {!showTickets && (
          <IconButton size='small' edge='start' onClick={() => setShowTickets(true)}>
            <ExpandMoreIcon />
          </IconButton>
        )}
        {showTickets && (
          <IconButton size='small' edge='start' onClick={() => setShowTickets(false)}>
            <ExpandLessIcon />
          </IconButton>
        )}
        <Typography noWrap>{getEpicDisplayTitle(epicId)}</Typography>
      </Box>
      {showTickets && (
        <Box sx={{ border: "1px solid", borderColor: "grey.300", borderBottom: 0 }}>
          {tickets.map((ticket) => {
            if (matchString(searchInput, ticket.title)) {
              return (
                <Box key={ticket._id} onClick={() => onSelectTicket(ticket._id)}>
                  <Ticket ticket={ticket} showSprintToggleCheckBox bgGrey={ticket._id === selectedTicketId} />
                </Box>
              );
            }
            return null;
          })}
        </Box>
      )}
    </>
  );
};

export default TicketSection;
