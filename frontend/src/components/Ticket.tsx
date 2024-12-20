import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { compareAsc, format } from "date-fns";
import { useEffect, useState } from "react";

import fetchUsersByIds from "../api/users/fetchUsersByIds";
import useLoad from "../hooks/useLoad";
import useProductBacklog from "../hooks/useProductBacklog";
import TicketInterface from "../types/Ticket";
import User from "../types/User";
import PriorityIcon from "./icons/PriorityIcon";
import StatusChipButton from "./StatusChipButton";
import StoryPointsChip from "./StoryPointsChip";
import TicketTypeIcon from "./icons/TicketTypeIcon";
import SnackbarError from "./common/SnackbarError";
import Tooltip from "./common/Tooltip";
import UserAvatar from "./common/UserAvatar";
import SprintActiveIcon from "./icons/SprintActiveIcon";
import SprintInactiveIcon from "./icons/SprintInactiveIcon";

interface TicketProps {
  ticket: TicketInterface;
  showSprintToggleCheckBox: boolean;
  bgGrey: boolean;
}

const Ticket = (props: TicketProps) => {
  const { ticket, showSprintToggleCheckBox, bgGrey } = props;
  const [assignee, setAssignee] = useState<User | null>(null);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { onUpdateTicket } = useProductBacklog();
  const {
    priority,
    title,
    type,
    isInSprint,
    _id: id,
    dueDate,
    status,
    assigneeId,
    ticketNumber,
    storyPoints,
  } = ticket;
  const formattedDueDate = dueDate ? format(new Date(dueDate), "LLL dd") : "";
  const isDue = dueDate && compareAsc(new Date(), new Date(dueDate)) === 1 ? true : false;

  useEffect(() => {
    const getAssigneeDetails = async () => {
      if (!assigneeId) {
        setAssignee(null); // prevent avatar from still showing on the ticket when assignee is removed
        return;
      }
      const [response] = await fetchUsersByIds([assigneeId]);
      setAssignee(response);
    };

    getAssigneeDetails();
  }, [assigneeId]);

  const handleToggleTicketInSprint = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsInSprintStatus = event.target.checked;
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(id, { isInSprint: updatedIsInSprintStatus });
      handleSetLoadingState("SUCCESS");
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <>
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
              icon={<SprintInactiveIcon color="disabled" />}
              checkedIcon={<SprintActiveIcon />}
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
        <Typography variant="caption" color="grey.500" noWrap sx={{ minWidth: 24 }}>
          {`#${ticketNumber}`}
        </Typography>
        <Typography noWrap>{title}</Typography>
        <Box flexGrow={1} />
        {status !== "completed" && (
          <Tooltip title="Due date">
            <Chip
              label={formattedDueDate}
              sx={{
                display: dueDate ? "" : "none",
                bgcolor: isDue ? "error.light" : "",
                color: isDue ? "#FFF" : "",
              }}
            />
          </Tooltip>
        )}
        {assignee && <UserAvatar username={assignee.username} displayName={assignee.displayName} />}
        <StatusChipButton status={status} size="medium" />
      </Paper>
      <SnackbarError
        isOpen={currentLoadState === "ERROR"}
        onClose={() => handleSetLoadingState("DEFAULT")}
      />
    </>
  );
};

export default Ticket;
