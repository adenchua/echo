import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { format } from "date-fns";

import StoryInterface, { TicketUpdateFieldsType } from "../types/StoryInterface";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";
import UpdateTicketButtonWithDialog from "./UpdateTicketButtonWithDialog";
import StatusChipButton from "./StatusChipButton";

interface SprintBacklogTicketProps {
  ticket: StoryInterface;
  onUpdateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => Promise<void>;
}

const SprintBacklogTicket = (props: SprintBacklogTicketProps): JSX.Element => {
  const { ticket, onUpdateTicket } = props;
  const { title, priority, type, status, dueDate, assigneeId } = ticket;
  const formattedDueDate = dueDate ? format(new Date(dueDate), "LLL dd") : "";

  const renderMobileTicket = (): JSX.Element => {
    return (
      <Paper sx={{ p: 1, mb: 2 }}>
        <Box display='flex' alignItems='center' mb={1}>
          <IconButton size='small' edge='start'>
            <PriorityIcon priority={priority} />
          </IconButton>
          <TicketTypeIcon type={type} />
          <Box flexGrow={1} />
          <Chip label={formattedDueDate} size='small' sx={{ display: dueDate ? "" : "none" }} />
        </Box>
        <Typography variant='body2'>{title}</Typography>
        <Divider sx={{ mt: 1, mb: 1 }} light />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Avatar style={{ height: 32, width: 32, display: assigneeId ? "" : "none" }}>?</Avatar>
          <Box flexGrow={1} />
          <StatusChipButton status={status} size='small' />
        </Box>
      </Paper>
    );
  };

  const renderDesktopTicket = (): JSX.Element => {
    return (
      <Paper
        sx={{
          "&:hover": {
            backgroundColor: "grey.50",
          },
          borderBottom: "1px solid",
          borderColor: "grey.200",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          py: 0.5,
          px: 1,
          overflowX: "hidden",
        }}
        square
        elevation={0}
      >
        <IconButton size='small'>
          <PriorityIcon priority={priority} />
        </IconButton>
        <TicketTypeIcon type={type} />
        <Typography variant='body2' noWrap>
          {title}
        </Typography>
        <Box flexGrow={1} />
        <Avatar style={{ height: 32, width: 32, display: assigneeId ? "" : "none" }}>?</Avatar>
        <Chip label={formattedDueDate} sx={{ display: dueDate ? "" : "none" }} size='small' />
        <StatusChipButton status={status} size='medium' />
        <UpdateTicketButtonWithDialog ticket={ticket} onUpdateTicket={onUpdateTicket} showStatusButtons />
      </Paper>
    );
  };

  return (
    <>
      <Hidden mdUp>{renderMobileTicket()}</Hidden>
      <Hidden mdDown>{renderDesktopTicket()}</Hidden>
    </>
  );
};

export default SprintBacklogTicket;
