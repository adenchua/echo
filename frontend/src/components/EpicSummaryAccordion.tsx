import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

import fetchTicketsByIds from "../api/tickets/fetchTicketsByIds";
import useLoad from "../hooks/useLoad";
import Epic from "../types/Epic";
import Ticket from "../types/Ticket";
import DeleteEpicDialog from "./DeleteEpicDialog";
import EpicSummaryAccordionTicket from "./EpicSummaryAccordionTicket";
import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import Tooltip from "./common/Tooltip";

interface EpicSummaryAccordionProps {
  epic: Epic;
}

const EpicSummaryAccordion = (props: EpicSummaryAccordionProps): JSX.Element => {
  const { epic } = props;
  const { title, ticketIds } = epic;
  const { currentLoadState, handleSetLoadingState } = useLoad();
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
        handleSetLoadingState("LOADING");
        const response = await fetchTicketsByIds(ticketIds);
        setTickets(response);
        handleSetLoadingState("DEFAULT");
      } catch (error) {
        handleSetLoadingState("ERROR");
      }
    };

    getTickets();
  }, [ticketIds, handleSetLoadingState]);

  return (
    <Accordion
      elevation={0}
      sx={{
        "& .MuiAccordionDetails-root": {
          padding: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosSharpIcon color="primary" sx={{ fontSize: "0.9rem", mt: 0.5 }} />
        }
        sx={{
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
          "& .MuiAccordionSummary-content": {
            ml: 2,
            gap: 2,
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
      >
        <Typography noWrap variant="body2">
          {title}
        </Typography>
        <Chip label={`${ticketIds.length} tickets`} size="small" />
        <Box flexGrow={1} />
        <Box sx={{ width: 180, flexShrink: 0 }}>
          <Typography variant="caption">Progress:</Typography>
          <ProgressBarWithPercentage value={epicProgressionPercentage} />
        </Box>
        <Tooltip title="Delete epic">
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => setIsDeleteEpicDialogOpened(true)}
            sx={{ ml: 4 }}
          >
            Delete epic
          </Button>
        </Tooltip>
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
        {currentLoadState !== "ERROR" && tickets && tickets.length === 0 && (
          <Box py={1} px={4}>
            <Typography variant="body2" color="textSecondary">
              There are no tickets tagged to this epic.
            </Typography>
          </Box>
        )}
        {tickets &&
          tickets.map((ticket) => <EpicSummaryAccordionTicket key={ticket._id} ticket={ticket} />)}
        {currentLoadState === "ERROR" && (
          <Box py={1} px={4}>
            <Typography color="error">
              Unable to retrieve tickets. Please try again later
            </Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default EpicSummaryAccordion;
