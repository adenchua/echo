import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";
import Tooltip from "@mui/material/Tooltip";

import { TicketPriority } from "../types/Ticket";
import HighestPriorityIcon from "./HighestPriorityIcon";

interface PriorityIconProps {
  priority: TicketPriority;
  hideMedium: boolean;
  fontSize?: "medium" | "small" | "inherit" | "large";
}

const PriorityIcon = (props: PriorityIconProps): JSX.Element => {
  const { priority, hideMedium, fontSize = "small" } = props;

  switch (priority) {
    case "low":
      return (
        <Tooltip title='Low Priority' disableInteractive>
          <LowPriorityIcon fontSize={fontSize} color='success' />
        </Tooltip>
      );
    case "medium":
      return (
        <Tooltip title='Medium Priority' disableInteractive>
          <MediumPriorityIcon
            fontSize={fontSize}
            color='warning'
            sx={{ visibility: hideMedium ? "hidden" : "initial" }}
          />
        </Tooltip>
      );
    case "high":
      return (
        <Tooltip title='High Priority' disableInteractive>
          <HighPriorityIcon fontSize={fontSize} color='error' />
        </Tooltip>
      );
    case "highest":
      return <HighestPriorityIcon fontSize={fontSize} color='error' />;
    default:
      return <div />;
  }
};

export default PriorityIcon;
