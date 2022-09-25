import TaskIcon from "@mui/icons-material/TaskOutlined";
import BugIcon from "@mui/icons-material/BugReportOutlined";
import UserStoryIcon from "@mui/icons-material/HistoryEduOutlined";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { TicketType } from "../types/Ticket";

interface FormTicketTypeToggleButtonsProps {
  value: TicketType;
  onChangeHandler: any;
}

const FormTicketTypeToggleButtons = (props: FormTicketTypeToggleButtonsProps): JSX.Element => {
  const { value, onChangeHandler } = props;

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChangeHandler} size='small'>
      <ToggleButton value={"task"} color='secondary' sx={{ textTransform: "none" }}>
        <TaskIcon fontSize='small' />
        Task
      </ToggleButton>
      <ToggleButton value={"story"} color='info' sx={{ textTransform: "none" }}>
        <UserStoryIcon fontSize='small' />
        User Story
      </ToggleButton>
      <ToggleButton value={"bug"} color='error' sx={{ textTransform: "none" }}>
        <BugIcon fontSize='small' />
        Bug
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormTicketTypeToggleButtons;
