import React from "react";
import BugIcon from "@mui/icons-material/BugReportOutlined";
import TaskIcon from "@mui/icons-material/TaskOutlined";
import UserStoryIcon from "@mui/icons-material/HistoryEduOutlined";
import Tooltip from "@mui/material/Tooltip";

import { TicketType } from "../types/TicketInterface";

interface TicketTypeIconProps {
  type: TicketType;
  fontSize?: "small" | "inherit" | "large" | "medium";
}

const TicketTypeIcon = (props: TicketTypeIconProps): JSX.Element => {
  const { type, fontSize = "small" } = props;

  switch (type) {
    case "bug":
      return (
        <Tooltip title='Bug' disableInteractive>
          <BugIcon fontSize={fontSize} color='error' />
        </Tooltip>
      );
    case "story":
      return (
        <Tooltip title='User Story' disableInteractive>
          <UserStoryIcon fontSize={fontSize} color='info' />
        </Tooltip>
      );
    case "task":
      return (
        <Tooltip title='Task' disableInteractive>
          <TaskIcon fontSize={fontSize} color='secondary' />
        </Tooltip>
      );
    default:
      return <div />;
  }
};

export default TicketTypeIcon;
