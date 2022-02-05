import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { format, compareAsc } from "date-fns";

import TicketInterface from "../types/TicketInterface";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";
import useProductBacklog from "../hooks/useProductBacklog";
import StatusChipButton from "./StatusChipButton";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import UserInterface from "../types/UserInterface";
import StoryPointsChip from "./StoryPointsChip";

interface TicketProps {
  ticket: TicketInterface;
  showSprintToggleCheckBox: boolean;
  bgGrey: boolean;
}

const Ticket = (props: TicketProps): JSX.Element => {
  const { ticket, showSprintToggleCheckBox, bgGrey } = props;
  const [assignee, setAssignee] = useState<UserInterface | null>(null);
  const { onUpdateTicket } = useProductBacklog();
  const { priority, title, type, isInSprint, _id: id, dueDate, status, assigneeId, ticketNumber, storyPoints } = ticket;
  const formattedDueDate = dueDate ? format(new Date(dueDate), "LLL dd") : "";
  const isDue = dueDate && compareAsc(new Date(), new Date(dueDate)) === 1 ? true : false;

  useEffect(() => {
    const getAssigneeDetails = async () => {
      if (!assigneeId) {
        return;
      }
      const [response] = await fetchUsersByIds([assigneeId]);
      setAssignee(response);
    };

    getAssigneeDetails();
  }, [assigneeId]);

  const handleToggleTicketInSprint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsInSprintStatus = event.target.checked;
    onUpdateTicket(id, { isInSprint: updatedIsInSprintStatus });
  };

  return (
    <Paper
      sx={{
        backgroundColor: bgGrey ? "grey.200" : "",
        "&:hover": {
          backgroundColor: "grey.200",
        },
        borderBottom: "1px solid",
        borderColor: "grey.300",
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
      {showSprintToggleCheckBox && (
        <Tooltip title={isInSprint ? "Remove from sprint backlog" : "Put in sprint backlog"} disableInteractive>
          <Checkbox
            size='small'
            sx={{
              padding: 0,
            }}
            disableRipple
            checked={isInSprint}
            onChange={handleToggleTicketInSprint}
          />
        </Tooltip>
      )}
      <PriorityIcon priority={priority} hideMedium />
      <TicketTypeIcon type={type} />
      <StoryPointsChip storyPoints={storyPoints} />
      <Typography variant='caption' color='grey.500' noWrap sx={{ minWidth: 24 }}>
        {`#${ticketNumber}`}
      </Typography>
      <Typography variant='body2' noWrap>
        {title}
      </Typography>
      <Box flexGrow={1} />
      {status !== "completed" && (
        <Chip
          label={formattedDueDate}
          size='small'
          sx={{
            display: dueDate ? "" : "none",
            bgcolor: isDue ? "error.light" : "",
            color: isDue ? "#FFF" : "",
          }}
        />
      )}
      {assignee && (
        <Avatar
          style={{
            height: 32,
            width: 32,
            display: assigneeId ? "" : "none",
          }}
          src={getUserAvatarSVG(assignee.username)}
        />
      )}
      <StatusChipButton status={status} size='medium' />
    </Paper>
  );
};

export default Ticket;
