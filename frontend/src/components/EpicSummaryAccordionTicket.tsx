import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import SprintIcon from "@mui/icons-material/RunCircleOutlined";
import FilledSprintIcon from "@mui/icons-material/RunCircle";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FilledCheckIcon from "@mui/icons-material/CheckCircle";

import TicketTypeIcon from "./TicketTypeIcon";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";

const EpicSummaryAccordionTicket = (): JSX.Element => {
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
      <CheckIcon color='disabled' />
      <FilledCheckIcon sx={{ color: "success.light" }} />
      <SprintIcon color='disabled' />
      <FilledSprintIcon sx={{ color: "warning.light" }} />
      <TicketTypeIcon type='task' />
      <Typography variant='caption' color='grey.500' noWrap sx={{ flexShrink: 0 }}>
        {`#41`}
      </Typography>
      <Typography variant='body2' noWrap>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
      <Box flexGrow={1} />
      <Avatar
        style={{
          height: 20,
          width: 20,
        }}
        src={getUserAvatarSVG("animalmother")}
      />
    </Paper>
  );
};

export default EpicSummaryAccordionTicket;
