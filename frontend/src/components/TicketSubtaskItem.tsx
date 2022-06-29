import React from "react";
import { CheckCircleOutlined, CheckCircle as FilledCheckIcon } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

import Subtask from "../types/Subtask";

interface TicketSubtaskItemProps {
  subtask: Subtask;
  onToggleCompletion: (subtaskId: string) => void;
}

const TicketSubtaskItem = (props: TicketSubtaskItemProps): JSX.Element => {
  const { subtask, onToggleCompletion } = props;
  const { _id: id, title, isCompleted } = subtask;

  return (
    <Box display='flex' alignItems='center' gap={1}>
      {!isCompleted && (
        <CheckCircleOutlined
          fontSize='small'
          color='disabled'
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "success.light",
            },
          }}
          onClick={() => onToggleCompletion(id)}
        />
      )}
      {isCompleted && (
        <FilledCheckIcon
          fontSize='small'
          sx={{
            color: "success.light",
            "&:hover": {
              cursor: "pointer",
              color: "#00000044",
            },
          }}
          onClick={() => onToggleCompletion(id)}
        />
      )}
      <Typography variant='body2' noWrap sx={{ color: isCompleted ? "success.light" : "#00000077" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default TicketSubtaskItem;
