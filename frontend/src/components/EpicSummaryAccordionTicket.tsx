import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import SprintIcon from "@mui/icons-material/RunCircleOutlined";
import FilledSprintIcon from "@mui/icons-material/RunCircle";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FilledCheckIcon from "@mui/icons-material/CheckCircle";

import TicketTypeIcon from "./TicketTypeIcon";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import Ticket from "../types/Ticket";
import User from "../types/User";
import fetchUsersByIds from "../api/users/fetchUsersByIds";

interface EpicSummaryAccordionTicketProps {
  ticket: Ticket;
}

const EpicSummaryAccordionTicket = (props: EpicSummaryAccordionTicketProps): JSX.Element => {
  const { ticket } = props;
  const { title, ticketNumber, isInSprint, status, type, assigneeId } = ticket;

  const [assignee, setAssignee] = useState<User | null>(null);

  useEffect(() => {
    const getAssigneeDetails = async () => {
      if (!assigneeId) {
        setAssignee(null);
        return;
      }
      const [response] = await fetchUsersByIds([assigneeId]);
      setAssignee(response);
    };

    getAssigneeDetails();
  }, [assigneeId]);

  return (
    <Paper
      square
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "grey.300",
        py: 1,
        px: 4,
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&: last-child": { borderBottom: 0 },
      }}
    >
      {status !== "completed" && (
        <Tooltip title='Not done' disableInteractive>
          <CheckIcon color='disabled' />
        </Tooltip>
      )}
      {status === "completed" && (
        <Tooltip title='Done' disableInteractive>
          <FilledCheckIcon sx={{ color: "success.light" }} />
        </Tooltip>
      )}
      {isInSprint && (
        <Tooltip title='In sprint' disableInteractive>
          <FilledSprintIcon sx={{ color: "warning.light" }} />
        </Tooltip>
      )}
      {!isInSprint && (
        <Tooltip title='Not in sprint' disableInteractive>
          <SprintIcon color='disabled' />
        </Tooltip>
      )}
      <TicketTypeIcon type={type} />
      <Typography variant='caption' color='grey.500' noWrap sx={{ flexShrink: 0 }}>
        {`#${ticketNumber}`}
      </Typography>
      <Typography variant='body2' noWrap>
        {title}
      </Typography>
      <Box flexGrow={1} />
      {assignee && (
        <Avatar
          style={{
            height: 20,
            width: 20,
          }}
          src={getUserAvatarSVG(assignee.username)}
        />
      )}
    </Paper>
  );
};

export default EpicSummaryAccordionTicket;
