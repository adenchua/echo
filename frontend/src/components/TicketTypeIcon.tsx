import React from "react";
import BugIcon from "@mui/icons-material/BugReport";
import TaskIcon from "@mui/icons-material/Task";
import UserStoryIcon from "@mui/icons-material/AutoStories";

import { StoryType } from "../types/StoryInterface";

interface TicketTypeIconProps {
  type: StoryType;
  fontSize?: "small" | "inherit" | "large" | "medium";
}

const TicketTypeIcon = (props: TicketTypeIconProps): JSX.Element => {
  const { type, fontSize = "small" } = props;

  switch (type) {
    case "bug":
      return <BugIcon fontSize={fontSize} color='error' />;
    case "story":
      return <UserStoryIcon fontSize={fontSize} color='info' />;
    case "task":
      return <TaskIcon fontSize={fontSize} color='secondary' />;
    default:
      return <div />;
  }
};

export default TicketTypeIcon;
