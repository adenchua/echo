import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import fetchUsersByIds from "../api/users/fetchUsersByIds";
import Ticket from "../types/Ticket";
import User from "../types/User";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import TicketTypeIcon from "./TicketTypeIcon";
import Tooltip from "./common/Tooltip";
import SprintActiveIcon from "./icons/SprintActiveIcon";
import SprintInactiveIcon from "./icons/SprintInactiveIcon";
import StatusChipButton from "./StatusChipButton";

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
      <Tooltip title='Done'>
        <>
          <StatusChipButton status={status} size='small' />
        </>
      </Tooltip>
      {isInSprint && (
        <Tooltip title='In sprint'>
          <SprintActiveIcon sx={{ color: "warning.light" }} />
        </Tooltip>
      )}
      {!isInSprint && (
        <Tooltip title='Not in sprint'>
          <SprintInactiveIcon color='disabled' />
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
