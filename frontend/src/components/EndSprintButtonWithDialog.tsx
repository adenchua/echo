import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import SprintEndIcon from "@mui/icons-material/RunningWithErrors";

import StoryInterface from "../types/StoryInterface";

interface EndSprintButtonWithDialogProps {
  onEndSprint: (projectId: string, sprintId: string) => Promise<void>;
  projectId: string;
  sprintId: string;
  sprintTickets: StoryInterface[];
}

const EndSprintButtonWithDialog = (props: EndSprintButtonWithDialogProps): JSX.Element => {
  const { onEndSprint, projectId, sprintId, sprintTickets } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const completedTickets = sprintTickets.filter((ticket) => ticket.status === "completed");

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setShowError(false);
    setIsLoading(false);
  };

  const handleEndSprint = async (): Promise<void> => {
    try {
      setShowError(false);
      setIsLoading(true);
      await onEndSprint(projectId, sprintId);
      handleClose();
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant='contained'
        startIcon={<SprintEndIcon />}
        sx={{ minWidth: "132px", whiteSpace: "nowrap" }}
        onClick={() => setIsDialogOpen(true)}
      >
        End Sprint
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle
          sx={{
            borderTop: "8px solid",
            borderColor: "warning.light",
            color: "warning.light",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar variant='rounded' sx={{ bgcolor: "warning.light" }}>
            <SprintEndIcon />
          </Avatar>
          End Sprint
        </DialogTitle>
        <DialogContent dividers>
          {showError && (
            <Typography sx={{ mb: 3, fontSize: 14 }} color='error'>
              Failed to end the sprint. Please try again later.
            </Typography>
          )}
          <DialogContentText sx={{ mb: 3, fontSize: 14 }}>
            <b>{`${completedTickets.length} of ${sprintTickets.length}`}</b> ticket(s) completed in this sprint. Are you
            sure you want to end this sprint?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey.500" }} color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleEndSprint}
            sx={{ color: "warning.light" }}
            color='inherit'
            startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          >
            {isLoading ? "Ending Sprint..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EndSprintButtonWithDialog;
