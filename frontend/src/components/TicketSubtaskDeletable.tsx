import { HighlightOffOutlined as DeleteIcon } from "@mui/icons-material";
import { Box, DialogContentText, Typography } from "@mui/material";
import { useState } from "react";

import Subtask from "../types/Subtask";
import DangerActionDialog from "./common/DangerActionDialog";
import Tooltip from "./common/Tooltip";

interface TicketSubtaskDeletableProps {
  subtask: Subtask;
  onDeleteSubtask: (subtaskId: string) => Promise<void>;
}

const TicketSubtaskDeletable = (props: TicketSubtaskDeletableProps): JSX.Element => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const { subtask, onDeleteSubtask } = props;
  const { _id: id, title } = subtask;

  return (
    <>
      <Tooltip title="Delete subtask">
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "error.dark",
            },
            color: "#00000077",
          }}
          onClick={() => {
            setShowConfirmationDialog(true);
          }}
        >
          <DeleteIcon fontSize="small" color="inherit" />
          <Typography variant="body2" noWrap color="inherit">
            {title}
          </Typography>
        </Box>
      </Tooltip>
      <DangerActionDialog
        isOpen={showConfirmationDialog}
        dialogContent={<DialogContentText>{title}</DialogContentText>}
        onClose={() => setShowConfirmationDialog(false)}
        title="Confirm delete subtask"
        titleIcon={<DeleteIcon />}
        disableActionButton={false}
        onAccept={() => onDeleteSubtask(id)}
        acceptButtonText="Delete subtask"
      />
    </>
  );
};

export default TicketSubtaskDeletable;
