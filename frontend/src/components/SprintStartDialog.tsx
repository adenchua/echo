import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { differenceInCalendarDays, format, isValid } from "date-fns";
import { useEffect, useState } from "react";

import { DateCalendar } from "@mui/x-date-pickers";
import useLoad from "../hooks/useLoad";
import Sprint from "../types/Sprint";
import ActionDialog from "./common/ActionDialog";
import ConfirmationDialog from "./common/ConfirmationDialog";
import SprintIcon from "./icons/SprintActiveIcon";
import DialogErrorText from "./common/DialogErrorText";

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
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [newSprint, setNewSprint] = useState<Sprint | null>(null);

  useEffect(() => {
    // return dialog to original state upon opening
    if (showStartSprintDialog) {
      handleSetLoadingState("DEFAULT");
      setEndDateInput(null);
    }
  }, [handleSetLoadingState, showStartSprintDialog]);

  const handleClose = (): void => {
    onClose();
  };

  const handleStartSprint = async (): Promise<void> => {
    handleSetLoadingState("LOADING");
    try {
      const response = await onStartSprint(projectId, endDateInput);
      setNewSprint(response);
      handleClose();
      handleSetLoadingState("SUCCESS");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const renderSuccessMessageContent = (): JSX.Element => {
    if (!newSprint) {
      return <DialogErrorText text='Something went wrong retrieving the new sprint. Please try again later' />;
    }

    const { endDate, number, startDate } = newSprint;

    return (
      <>
        <DialogContentText>
          Sprint:{" "}
          <Typography component='span' color='primary'>
            {number}
          </Typography>
        </DialogContentText>
        <DialogContentText>
          Dates:{" "}
          <Typography component='span' color='primary'>
            {format(new Date(startDate), "dd MMM")} - {format(new Date(endDate), "dd MMM")} (
            {differenceInCalendarDays(new Date(endDate), new Date(startDate))} Days)
          </Typography>
        </DialogContentText>
        <DialogContentText>
          Total Tickets:{" "}
          <Typography component='span' color='primary'>
            {sprintTicketsCount}
          </Typography>
        </DialogContentText>
      </>
    );
  };

  const renderDialogContent = (): JSX.Element => (
    <>
      {sprintTicketsCount > 0 && (
        <DialogContentText sx={{ mb: 4 }}>
          <Typography component='span' color='primary'>
            {sprintTicketsCount}
          </Typography>{" "}
          ticket(s) will be included in this sprint.
        </DialogContentText>
      )}
      {sprintTicketsCount === 0 && (
        <DialogContentText>
          No tickets were included in this sprint. Please move one or more tickets from the product backlog.
        </DialogContentText>
      )}
      {sprintTicketsCount > 0 && (
        <>
          <DialogContentText>
            Please select an end date:{" "}
            <Typography component='span' color='primary.main'>
              {endDateInput && format(new Date(endDateInput), "dd MMM")}
              {endDateInput && ` (${differenceInCalendarDays(new Date(endDateInput), new Date())} Days)`}
            </Typography>
          </DialogContentText>
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
        </>
      )}
      {currentLoadState === "ERROR" && <DialogErrorText text='Failed to start a new sprint. Please try again later.' />}
    </>
  );

  return (
    <>
      <ActionDialog
        isOpen={showStartSprintDialog}
        onClose={handleClose}
        acceptButtonText='Start sprint'
        onAccept={handleStartSprint}
        disableActionButton={!endDateInput || !isValid(endDateInput) || sprintTicketsCount === 0}
        dialogContent={renderDialogContent()}
        title='Start new sprint'
        titleIcon={<SprintIcon />}
      />
      <ConfirmationDialog
        title='🎉 Congratulations on starting a new sprint!'
        isOpen={currentLoadState === "SUCCESS"}
        onClose={() => handleSetLoadingState("DEFAULT")}
        dialogContent={renderSuccessMessageContent()}
        titleIcon={<SprintIcon />}
      />
    </>
  );
};

export default SprintStartDialog;
