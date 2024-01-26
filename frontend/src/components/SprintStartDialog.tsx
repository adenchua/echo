import SprintIcon from "@mui/icons-material/EventAvailableOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { differenceInCalendarDays, format, isValid } from "date-fns";
import { useEffect, useState } from "react";

import Sprint from "../types/Sprint";
import { sleep } from "../utils/sleep";
import { DateCalendar } from "@mui/x-date-pickers";

interface SprintStartDialogProps {
  showStartSprintDialog: boolean;
  onClose: () => void;
  onStartSprint: (projectId: string, endDate: Date | null) => Promise<Sprint>;
  projectId: string;
  sprintTicketsCount: number;
}

const SprintStartDialog = (props: SprintStartDialogProps): JSX.Element => {
  const { onStartSprint, projectId, sprintTicketsCount, showStartSprintDialog, onClose } = props;
  const [endDateInput, setEndDateInput] = useState<Date | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newSprint, setNewSprint] = useState<Sprint | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    // return dialog to original state upon opening
    if (showStartSprintDialog) {
      setShowError(false);
      setEndDateInput(null);
      setIsLoading(false);
      setShowSuccessMessage(false);
    }
  }, [showStartSprintDialog]);

  const handleClose = (): void => {
    onClose();
  };

  const handleStartSprint = async (): Promise<void> => {
    try {
      setShowError(false);
      setIsLoading(true);
      await sleep(1000);
      const response = await onStartSprint(projectId, endDateInput);
      setNewSprint(response);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuccessMessageContent = (): JSX.Element => {
    if (!newSprint) {
      return <div />;
    }

    const { endDate, number, startDate } = newSprint;

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
            <SprintIcon />
          </Avatar>
          Sprint {number} has begun!
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ fontSize: 14 }}>
            Sprint Dates:{" "}
            <b>
              {format(new Date(startDate), "dd MMM")} - {format(new Date(endDate), "dd MMM")} (
              {differenceInCalendarDays(new Date(endDate), new Date(startDate))} Days)
            </b>
            <br />
            Total Tickets: <b>{sprintTicketsCount}</b>
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
          <SprintIcon />
        </Avatar>
        Start Sprint
      </DialogTitle>
      <DialogContent dividers>
        {showError && (
          <Typography sx={{ mb: 4, fontSize: 14 }} color='error'>
            Failed to start a new sprint. Please try again later.
          </Typography>
        )}
        {sprintTicketsCount > 0 && (
          <DialogContentText sx={{ mb: 4, fontSize: 14 }}>
            <b>{sprintTicketsCount}</b> ticket(s) will be included in this sprint.
          </DialogContentText>
        )}
        {sprintTicketsCount === 0 && (
          <DialogContentText sx={{ fontSize: 14 }}>
            No tickets were included in this sprint. Please move one or more tickets from the product backlog.
          </DialogContentText>
        )}
        {sprintTicketsCount > 0 && (
          <div>
            <Typography>Select sprint end date:</Typography>
            <DateCalendar
              value={endDateInput}
              onChange={(newValue) => {
                if (isValid(newValue)) {
                  setEndDateInput(newValue);
                }
              }}
              disablePast
              reduceAnimations
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "grey.500" }} color='inherit' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleStartSprint}
          sx={{ color: "warning.light" }}
          color='inherit'
          startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          disabled={!endDateInput || !isValid(endDateInput) || sprintTicketsCount === 0}
        >
          {isLoading ? "Creating Sprint..." : "Start Sprint"}
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Dialog open={showStartSprintDialog} onClose={handleClose}>
        {showSuccessMessage && renderSuccessMessageContent()}
        {!showSuccessMessage && renderDialogContent()}
      </Dialog>
    </>
  );
};

export default SprintStartDialog;
