import { CheckCircleOutlined } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

import Subtask from "../types/Subtask";

interface TicketSubtaskProps {
  subtask: Subtask;
  onToggleCompletion: (subtaskId: string) => void;
}

const TicketSubtask = (props: TicketSubtaskProps): JSX.Element => {
  const { subtask, onToggleCompletion } = props;
  const { _id: id, title, isCompleted } = subtask;

  return (
    <Box
      display='flex'
      alignItems='center'
      gap={1}
      sx={{
        "&:hover": {
          cursor: "pointer",
          color: isCompleted ? "#00000099" : "success.main",
        },
        color: isCompleted ? "success.light" : "#00000077",
      }}
      onClick={() => onToggleCompletion(id)}
    >
      <CheckCircleOutlined fontSize='small' color='inherit' />
      <Typography variant='body2' noWrap color='inherit'>
        {title}
      </Typography>
    </Box>
  );
};

export default TicketSubtask;
