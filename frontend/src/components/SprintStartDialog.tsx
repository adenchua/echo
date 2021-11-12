import React, { useState } from "react";
import SprintIcon from "@mui/icons-material/Timelapse";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import { isValid, format, differenceInCalendarDays } from "date-fns";

import SprintInterface from "../types/SprintInterface";

interface SprintStartDialogProps {
  showStartSprintDialog: boolean;
  onClose: () => void;
  onStartSprint: (projectId: string, endDate: Date | null) => Promise<SprintInterface>;
  projectId: string;
  sprintTicketsCount: number;
}

const SprintStartDialog = (props: SprintStartDialogProps): JSX.Element => {
  const { onStartSprint, projectId, sprintTicketsCount, showStartSprintDialog, onClose } = props;
  const [endDateInput, setEndDateInput] = useState<Date | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newSprint, setNewSprint] = useState<SprintInterface | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleClose = (): void => {
    onClose();
    setShowError(false);
    setEndDateInput(null);
    setIsLoading(false);
    setShowSuccessMessage(false);
  };

  const handleStartSprint = async (): Promise<void> => {
    try {
      setShowError(false);
      setIsLoading(true);
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
            Sprint Start Date: <b>{format(new Date(startDate), "dd MMMM yyyy")}</b>
            <br />
            Sprint End Date: <b>{format(new Date(endDate), "dd MMMM yyyy")}</b>
            <br />
            Total Duration: <b>{differenceInCalendarDays(new Date(endDate), new Date(startDate))} Days</b>
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
          <Typography sx={{ mb: 3, fontSize: 14 }} color='error'>
            Failed to start a new sprint. Please try again later.
          </Typography>
        )}
        {sprintTicketsCount > 0 && (
          <DialogContentText sx={{ mb: 3, fontSize: 14 }}>
            <b>{sprintTicketsCount}</b> ticket(s) will be included in this sprint.
          </DialogContentText>
        )}
        {sprintTicketsCount === 0 && (
          <DialogContentText sx={{ mb: 3, fontSize: 14 }}>
            No tickets were included in this sprint. Please move one or more tickets from the product backlog.
          </DialogContentText>
        )}
        <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
          Sprint End Date
        </Typography>
        <Box>
          <DatePicker
            value={endDateInput}
            onChange={(newValue) => {
              if (isValid(newValue)) {
                setEndDateInput(newValue);
              }
            }}
            minDate={new Date()}
            clearable
            renderInput={(params) => <TextField {...params} size='small' />}
          />
        </Box>
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
          disabled={!endDateInput || sprintTicketsCount === 0}
        >
          {isLoading ? "Creating Sprint..." : "Start Sprint"}
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Dialog open={showStartSprintDialog} onClose={handleClose} maxWidth='sm' fullWidth>
        {showSuccessMessage && renderSuccessMessageContent()}
        {!showSuccessMessage && renderDialogContent()}
      </Dialog>
    </>
  );
};

export default SprintStartDialog;
