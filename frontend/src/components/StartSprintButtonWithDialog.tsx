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
import { isValid } from "date-fns";

interface StartSprintButtonWithDialogProps {
  onStartSprint: (projectId: string, endDate: Date | null) => Promise<void>;
  projectId: string;
  sprintTicketsCount: number;
}

const StartSprintButtonWithDialog = (props: StartSprintButtonWithDialogProps): JSX.Element => {
  const { onStartSprint, projectId, sprintTicketsCount } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [endDateInput, setEndDateInput] = useState<Date | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = (): void => {
    setIsDialogOpen(false);
    setShowError(false);
    setEndDateInput(null);
    setIsLoading(false);
  };

  const handleStartSprint = async (): Promise<void> => {
    try {
      setShowError(false);
      setIsLoading(true);
      await onStartSprint(projectId, endDateInput);
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
        startIcon={<SprintIcon />}
        sx={{ whiteSpace: "nowrap" }}
        onClick={() => setIsDialogOpen(true)}
      >
        Start Sprint
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
          <Box mb={2}>
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
      </Dialog>
    </>
  );
};

export default StartSprintButtonWithDialog;
