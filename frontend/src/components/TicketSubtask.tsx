import { CheckCircleOutlined } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

import Subtask from "../types/Subtask";
import Tooltip from "./common/Tooltip";

interface TicketSubtaskProps {
  subtask: Subtask;
  onToggleCompletion: (subtaskId: string) => void;
}

const TicketSubtask = (props: TicketSubtaskProps) => {
  const { subtask, onToggleCompletion } = props;
  const { _id: id, title, isCompleted } = subtask;

  return (
    <Tooltip title={isCompleted ? "Mark as undone" : "Mark as done"}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          "&:hover": {
            cursor: "pointer",
            textDecoration: isCompleted ? "none" : "line-through",
          },
          color: isCompleted ? "primary.main" : "Gray",
          textDecoration: isCompleted ? "line-through" : "none",
        }}
        onClick={() => onToggleCompletion(id)}
      >
        {<CheckCircleOutlined fontSize="small" color="inherit" />}
        <Typography variant="body2" noWrap color="inherit">
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default TicketSubtask;
