import { HighlightOffOutlined as DeleteIcon } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

import Subtask from "../types/Subtask";
import Tooltip from "./common/Tooltip";

interface TicketSubtaskDeletableProps {
  subtask: Subtask;
  onDeleteSubtask: (subtaskId: string) => Promise<void>;
}

const TicketSubtaskDeletable = (props: TicketSubtaskDeletableProps): JSX.Element => {
  const { subtask, onDeleteSubtask } = props;
  const { _id: id, title } = subtask;

  return (
    <Tooltip title='Delete subtask'>
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "error.dark",
          },
          color: "#00000077",
        }}
        onClick={() => {
          if (window.confirm("Delete subtask?")) {
            onDeleteSubtask(id);
          }
        }}
      >
        <DeleteIcon fontSize='small' color='inherit' />
        <Typography variant='body2' noWrap color='inherit'>
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default TicketSubtaskDeletable;
