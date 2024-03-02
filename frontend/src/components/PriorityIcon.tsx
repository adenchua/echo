import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";
import MediumPriorityIcon from "@mui/icons-material/Remove";

import { TicketPriority } from "../types/Ticket";
import HighestPriorityIcon from "./HighestPriorityIcon";
import Tooltip from "./common/Tooltip";

interface PriorityIconProps {
  priority: TicketPriority;
  fontSize?: "medium" | "small" | "inherit" | "large";
}

const PriorityIcon = (props: PriorityIconProps): JSX.Element => {
  const { priority, fontSize = "small" } = props;

  switch (priority) {
    case "low":
      return (
        <Tooltip title='Low Priority'>
          <LowPriorityIcon fontSize={fontSize} color='success' />
        </Tooltip>
      );
    case "medium":
      return (
        <Tooltip title='Medium Priority'>
          <MediumPriorityIcon fontSize={fontSize} color='warning' />
        </Tooltip>
      );
    case "high":
      return (
        <Tooltip title='High Priority'>
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
