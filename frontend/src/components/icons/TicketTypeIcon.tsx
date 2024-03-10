import BugIcon from "@mui/icons-material/BugReportOutlined";
import UserStoryIcon from "@mui/icons-material/HistoryEduOutlined";
import TaskIcon from "@mui/icons-material/TaskOutlined";

import { TicketType } from "../../types/Ticket";
import Tooltip from "../common/Tooltip";

interface TicketTypeIconProps {
  type: TicketType;
  fontSize?: "small" | "inherit" | "large" | "medium";
}

const TicketTypeIcon = (props: TicketTypeIconProps): JSX.Element => {
  const { type, fontSize = "small" } = props;

  switch (type) {
    case "bug":
      return (
        <Tooltip title='Bug'>
          <BugIcon fontSize={fontSize} color='error' />
        </Tooltip>
      );
    case "story":
      return (
        <Tooltip title='User Story'>
          <UserStoryIcon fontSize={fontSize} color='info' />
        </Tooltip>
      );
    case "task":
      return (
        <Tooltip title='Task'>
          <TaskIcon fontSize={fontSize} color='secondary' />
        </Tooltip>
      );
    default:
      return <div />;
  }
};

export default TicketTypeIcon;
