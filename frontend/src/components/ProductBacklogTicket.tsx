import React from "react";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { format } from "date-fns";

import StoryInterface, { TicketUpdateFieldsType } from "../types/StoryInterface";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";
import UpdateTicketButtonWithDialog from "./UpdateTicketButtonWithDialog";

interface ProductBacklogTicketProps {
  ticket: StoryInterface;
  onUpdateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => Promise<void>;
}

const ProductBacklogTicket = (props: ProductBacklogTicketProps): JSX.Element => {
  const { ticket, onUpdateTicket } = props;
  const { priority, title, type, isInSprint, _id: id, dueDate } = ticket;
  const formattedDueDate = dueDate ? format(new Date(dueDate), "LLL dd") : "";

  const handleToggleTicketInSprint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsInSprintStatus = event.target.checked;
    onUpdateTicket(id, { isInSprint: updatedIsInSprintStatus });
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
          gap: 0.5,
          px: 1,
        }}
        square
        elevation={0}
      >
        <Checkbox size='small' checked={isInSprint} onChange={handleToggleTicketInSprint} />
        <IconButton size='small'>
          <PriorityIcon priority={priority} />
        </IconButton>
        <IconButton size='small' color='error' disabled>
          <TicketTypeIcon type={type} />
        </IconButton>
        <Typography variant='body2' noWrap>
          {title}
        </Typography>
        <Box flexGrow={1} />
        <Chip label={formattedDueDate} size='small' sx={{ display: dueDate ? "" : "none" }} />
        <UpdateTicketButtonWithDialog ticket={ticket} onUpdateTicket={onUpdateTicket} showStatusButtons={false} />
      </Paper>
    );
  };

  const renderMobileTicket = (): JSX.Element => {
    return (
      <Paper sx={{ marginBottom: 1, padding: 1 }} elevation={0}>
        <Box display='flex' alignItems='center' gap={1} mb={1}>
          <PriorityIcon priority={priority} />
          <TicketTypeIcon type={type} />
          <Box flexGrow={1} />
          <Chip label='In Sprint' size='small' />
        </Box>
        <Typography variant='body2'>{title}</Typography>
      </Paper>
    );
  };
  return (
    <>
      <Hidden mdDown>{renderDesktopTicket()}</Hidden>
      <Hidden mdUp>{renderMobileTicket()}</Hidden>
    </>
  );
};

export default ProductBacklogTicket;
