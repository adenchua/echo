import React from "react";
import { HighlightOffOutlined as DeleteIcon } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

import Subtask from "../types/Subtask";

interface TicketSubtaskDeletableProps {
  subtask: Subtask;
  onDeleteSubtask: (subtaskId: string) => Promise<void>;
}

const TicketSubtaskDeletable = (props: TicketSubtaskDeletableProps): JSX.Element => {
  const { subtask, onDeleteSubtask } = props;
  const { _id: id, title } = subtask;

  return (
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
      onClick={() => onDeleteSubtask(id)}
    >
      <DeleteIcon fontSize='small' color='inherit' />
      <Typography variant='body2' noWrap color='inherit'>
        {title}
      </Typography>
    </Box>
  );
};

export default TicketSubtaskDeletable;
