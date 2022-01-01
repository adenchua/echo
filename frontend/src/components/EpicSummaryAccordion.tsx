import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SprintIcon from "@mui/icons-material/RunCircleOutlined";
import FilledSprintIcon from "@mui/icons-material/RunCircle";
import CheckIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FilledCheckIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";

import ProgressBarWithPercentage from "./ProgressBarWithPercentage";
import TicketTypeIcon from "./TicketTypeIcon";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";

const EpicSummaryAccordion = (): JSX.Element => {
  const renderTicket = (): JSX.Element => {
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
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
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

  return (
    <Accordion
      square
      elevation={0}
      sx={{
        "& .MuiAccordionDetails-root": {
          padding: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon color='primary' sx={{ fontSize: "0.9rem", mt: 0.5 }} />}
        sx={{
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
          },
          "& .MuiAccordionSummary-content": {
            ml: 1,
            gap: 5,
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
      >
        <Typography noWrap>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
        <Box flexGrow={1} />
        <Box sx={{ width: 180, flexShrink: 0 }}>
          <ProgressBarWithPercentage value={45} />
        </Box>
        <Typography fontSize={14} color='textSecondary' noWrap sx={{ flexShrink: 0 }}>
          14 Jan - 24 Oct
        </Typography>
        <IconButton size='small' color='primary'>
          <MoreVertIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "1px solid",
          borderColor: "grey.300",
        }}
      >
        {renderTicket()}
        {renderTicket()}
        {renderTicket()}
        {renderTicket()}
        {renderTicket()}
      </AccordionDetails>
    </Accordion>
  );
};

export default EpicSummaryAccordion;
