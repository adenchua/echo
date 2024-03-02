import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { compareAsc, format } from "date-fns";
import { useEffect, useState } from "react";

import fetchUsersByIds from "../api/users/fetchUsersByIds";
import useProductBacklog from "../hooks/useProductBacklog";
import TicketInterface from "../types/Ticket";
import User from "../types/User";
import PriorityIcon from "./PriorityIcon";
import StatusChipButton from "./StatusChipButton";
import StoryPointsChip from "./StoryPointsChip";
import TicketTypeIcon from "./TicketTypeIcon";
import Tooltip from "./common/Tooltip";
import UserAvatar from "./common/UserAvatar";

interface TicketProps {
  ticket: TicketInterface;
  showSprintToggleCheckBox: boolean;
  bgGrey: boolean;
}

const Ticket = (props: TicketProps): JSX.Element => {
  const { ticket, showSprintToggleCheckBox, bgGrey } = props;
  const [assignee, setAssignee] = useState<User | null>(null);
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
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.5,
        px: 1,
        overflow: "hidden",
      }}
      elevation={0}
    >
      {showSprintToggleCheckBox && (
        <Tooltip title={isInSprint ? "Remove from sprint backlog" : "Put in sprint backlog"}>
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
      <PriorityIcon priority={priority} />
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
          sx={{
            display: dueDate ? "" : "none",
            bgcolor: isDue ? "error.light" : "",
            color: isDue ? "#FFF" : "",
          }}
        />
      )}
      {assignee && <UserAvatar username={assignee.username} displayName={assignee.displayName} />}
      <StatusChipButton status={status} size='medium' />
    </Paper>
  );
};

export default Ticket;
