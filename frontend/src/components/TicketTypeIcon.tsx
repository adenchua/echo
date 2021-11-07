import React from "react";
import BugIcon from "@mui/icons-material/BugReport";
import TaskIcon from "@mui/icons-material/Task";
import UserStoryIcon from "@mui/icons-material/AutoStories";

import { StoryType } from "../types/StoryInterface";

interface TicketTypeIconProps {
  type: StoryType;
}

const TicketTypeIcon = (props: TicketTypeIconProps): JSX.Element => {
  const { type } = props;

  switch (type) {
    case "bug":
      return <BugIcon fontSize='small' color='error' />;
    case "story":
      return <UserStoryIcon fontSize='small' color='info' />;
    case "task":
      return <TaskIcon fontSize='small' color='secondary' />;
    default:
      return <div />;
  }
};

export default TicketTypeIcon;
