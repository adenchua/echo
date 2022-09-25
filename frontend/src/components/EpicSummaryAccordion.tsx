import { useState, useEffect, useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Chip from "@mui/material/Chip";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { format } from "date-fns";

import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import EpicSummaryAccordionTicket from "./EpicSummaryAccordionTicket";
import Epic from "../types/Epic";
import Ticket from "../types/Ticket";
import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import DeleteEpicDialog from "./DeleteEpicDialog";

interface EpicSummaryAccordionProps {
  epic: Epic;
}

const EpicSummaryAccordion = (props: EpicSummaryAccordionProps): JSX.Element => {
  const { epic } = props;
  const { title, ticketIds, startDate, endDate } = epic;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isDeleteEpicDialogOpened, setIsDeleteEpicDialogOpened] = useState<boolean>(false);

  const epicProgressionPercentage = useMemo(() => {
    let completedCount = 0;

    if (ticketIds.length === 0) {
      return 0; // prevent divison by 0
    }

    tickets.forEach((ticket) => {
      if (ticket.status === "completed") {
        completedCount += 1;
      }
    });

    return Math.floor((completedCount / ticketIds.length) * 100);
  }, [ticketIds, tickets]);

  useEffect(() => {
    const getTickets = async (): Promise<void> => {
      try {
        const response = await fetchTicketsByIds(ticketIds);
        setTickets(response);
      } catch (error) {
        // do nothing
      }
    };

    getTickets();
  }, [ticketIds]);

  const getDateString = (startDate: string, endDate: string): string => {
    if (!startDate && !endDate) {
      return "-";
    }

    const formattedStartDate = startDate ? format(new Date(startDate), "dd MMM") : "N.A.";
    const formattedEndDate = endDate ? format(new Date(endDate), "dd MMM") : "N.A.";

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <Accordion
      square
      elevation={0}
      sx={{
        "& .MuiAccordionDetails-root": {
          padding: 0,
        },
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon color='primary' sx={{ fontSize: "0.9rem", mt: 0.5 }} />}
        sx={{
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
          "& .MuiAccordionSummary-content": {
            ml: 2,
            gap: 5,
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
      >
        <Typography noWrap variant='body2'>
          {title}
        </Typography>
        <Chip label={ticketIds.length} size='small' />
        <Box flexGrow={1} />
        <Box sx={{ width: 180, flexShrink: 0 }}>
          <ProgressBarWithPercentage value={epicProgressionPercentage} />
        </Box>
        <Typography fontSize={14} color='textSecondary' noWrap sx={{ flexShrink: 0, minWidth: 120 }} align='center'>
          {getDateString(startDate, endDate)}
        </Typography>
        <IconButton size='small' color='error' sx={{ padding: 0 }} onClick={() => setIsDeleteEpicDialogOpened(true)}>
          <DeleteIcon />
        </IconButton>
        <DeleteEpicDialog
          isDialogOpened={isDeleteEpicDialogOpened}
          onClose={() => setIsDeleteEpicDialogOpened(false)}
          epic={epic}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "1px solid",
          borderColor: "grey.300",
        }}
      >
        {tickets && tickets.length === 0 && (
          <Box py={1} px={4}>
            <Typography variant='body2' color='textSecondary'>
              There are no tickets tagged to this epic.
            </Typography>
          </Box>
        )}
        {tickets && tickets.map((ticket) => <EpicSummaryAccordionTicket key={ticket._id} ticket={ticket} />)}
      </AccordionDetails>
    </Accordion>
  );
};

export default EpicSummaryAccordion;
