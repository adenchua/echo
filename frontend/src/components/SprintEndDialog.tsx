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
import TickIcon from "@mui/icons-material/Check";

import StoryInterface from "../types/StoryInterface";
import SprintInterface from "../types/SprintInterface";

interface SprintEndDialogProps {
  showEndSprintDialog: boolean;
  onClose: () => void;
  onEndSprint: (projectId: string, sprintId: string) => Promise<SprintInterface>;
  projectId: string;
  sprintId: string | undefined;
  sprintTickets: StoryInterface[];
}

const SprintEndDialog = (props: SprintEndDialogProps): JSX.Element => {
  const { onEndSprint, projectId, sprintId, sprintTickets, showEndSprintDialog, onClose } = props;
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completedSprint, setCompletedSprint] = useState<SprintInterface | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const completedTickets = sprintTickets.filter((ticket) => ticket.status === "completed");

  const handleClose = (): void => {
    onClose();
    setShowSuccessMessage(false);
    setShowError(false);
    setIsLoading(false);
  };

  const handleEndSprint = async (): Promise<void> => {
    if (!sprintId) {
      return;
    }

    try {
      setShowError(false);
      setIsLoading(true);
      const response = await onEndSprint(projectId, sprintId);
      setCompletedSprint(response);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuccessDialogContent = (): JSX.Element => {
    let numberOfCompletedTickets = 0;
    let numberOfIncompleteTickets = 0;
    let completionRate = 0;

    if (completedSprint) {
      numberOfCompletedTickets = completedSprint.completedStoryIds.length;
      numberOfIncompleteTickets = completedSprint.incompleteStoryIds.length;
      completionRate = Math.floor(
        (numberOfCompletedTickets / (numberOfCompletedTickets + numberOfIncompleteTickets)) * 100
      );
    }

    return (
      <>
        <DialogTitle
          sx={{
            borderTop: "8px solid",
            borderColor: "success.light",
            color: "success.light",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar variant='rounded' sx={{ bgcolor: "success.light" }}>
            <TickIcon />
          </Avatar>
          Successful!
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ fontSize: 14 }}>
            Congratulations on ending sprint {completedSprint?.number}! Here's a quick breakdown on the sprint: <br />{" "}
            <br />
            Completed Tickets:{" "}
            <b>
              {numberOfCompletedTickets} ({completionRate.toFixed(1)}%)
            </b>{" "}
            <br />
            Incomplete Tickets: <b>{numberOfIncompleteTickets}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "success.light" }} color='inherit' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </>
    );
  };

  const renderDialogContent = (): JSX.Element => (
    <>
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
    </>
  );

  return (
    <Dialog open={showEndSprintDialog} onClose={handleClose} maxWidth='sm' fullWidth>
      {showSuccessMessage && renderSuccessDialogContent()}
      {!showSuccessMessage && renderDialogContent()}
    </Dialog>
  );
};

export default SprintEndDialog;