import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import StoryInterface, { StatusType } from "../types/StoryInterface";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";

type MuiChipSizeType = "small" | "medium" | undefined;

interface SprintBacklogTicketProps {
  ticket: StoryInterface;
}

const SprintBacklogTicket = (props: SprintBacklogTicketProps): JSX.Element => {
  const { ticket } = props;
  const { title, priority, type, status, dueDate, assigneeId } = ticket;

  const renderStatusChip = (status: StatusType, size: MuiChipSizeType = "medium"): JSX.Element => {
    const CHIP_MIN_WIDTH = "92px";

    switch (status) {
      case "todo":
        return <Chip label='To Do' sx={{ minWidth: CHIP_MIN_WIDTH }} size={size} />;
      case "progress":
        return (
          <Chip
            label='In Progress'
            sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "warning.light", color: "#FFF" }}
            size={size}
          />
        );
      case "review":
        return <Chip label='Review' sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "#ba68c8", color: "#FFF" }} size={size} />;
      case "stuck":
        return (
          <Chip label='Stuck' sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "error.light", color: "#FFF" }} size={size} />
        );
      case "hold":
        return <Chip label='Hold' sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "grey.600", color: "#FFF" }} size={size} />;
      case "completed":
        return (
          <Chip label='Done' sx={{ minWidth: CHIP_MIN_WIDTH, bgcolor: "success.light", color: "#FFF" }} size={size} />
        );
      default:
        return <Chip label='Unknown' sx={{ minWidth: CHIP_MIN_WIDTH }} size={size} />;
    }
  };

  const renderMobileTicket = (): JSX.Element => {
    return (
      <Paper sx={{ p: 1, mb: 2 }}>
        <Box display='flex' alignItems='center' mb={1}>
          <IconButton size='small' edge='start'>
            <PriorityIcon priority={priority} />
          </IconButton>
          <TicketTypeIcon type={type} />
          <Box flexGrow={1} />
          <Chip label='-' size='small' sx={{ display: dueDate ? "" : "none" }} />
        </Box>
        <Typography variant='body2'>{title}</Typography>
        <Divider sx={{ mt: 1, mb: 1 }} light />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Avatar style={{ height: 32, width: 32, display: assigneeId ? "" : "none" }}>?</Avatar>
          <Box flexGrow={1} />
          {renderStatusChip(status)}
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
          gap: 4,
          py: 1,
          px: 2,
          overflowX: "hidden",
        }}
        square
        elevation={0}
      >
        <Box display='flex' alignItems='center' gap={0.5}>
          <IconButton size='small'>
            <PriorityIcon priority={priority} />
          </IconButton>
          <TicketTypeIcon type={type} />
        </Box>
        <Box sx={{ maxWidth: { xl: "1220px", lg: "700px", md: "320px" }, flexShrink: 1 }}>
          <Typography variant='body2' noWrap>
            {title}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Avatar style={{ height: 32, width: 32, display: assigneeId ? "" : "none" }}>?</Avatar>
        <Chip label='-' sx={{ display: dueDate ? "" : "none" }} />
        {renderStatusChip(status)}
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
