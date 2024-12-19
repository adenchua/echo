import SprintEndIcon from "@mui/icons-material/EventRepeatOutlined";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import useLoad from "../hooks/useLoad";
import Sprint from "../types/Sprint";
import Ticket from "../types/Ticket";
import ActionDialog from "./common/ActionDialog";
import ConfirmationDialog from "./common/ConfirmationDialog";
import DialogErrorText from "./common/DialogErrorText";

interface SprintEndDialogProps {
  showEndSprintDialog: boolean;
  onClose: () => void;
  onEndSprint: (projectId: string, sprintId: string) => Promise<Sprint>;
  projectId: string;
  sprintId: string | undefined;
  sprintTickets: Ticket[];
}

const SprintEndDialog = (props: SprintEndDialogProps) => {
  const { onEndSprint, projectId, sprintId, sprintTickets, showEndSprintDialog, onClose } = props;
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [completedSprint, setCompletedSprint] = useState<Sprint | null>(null);
  const completedTickets = sprintTickets.filter((ticket) => ticket.status === "completed");

  useEffect(() => {
    // return dialog to original state upon opening
    if (showEndSprintDialog) {
      handleSetLoadingState("DEFAULT");
    }
  }, [showEndSprintDialog, handleSetLoadingState]);

  const handleClose = (): void => {
    onClose();
  };

  const handleEndSprint = async (): Promise<void> => {
    if (!sprintId) {
      handleSetLoadingState("ERROR");
      return;
    }

    try {
      handleSetLoadingState("LOADING");
      const response = await onEndSprint(projectId, sprintId);
      setCompletedSprint(response);
      handleClose();
      handleSetLoadingState("SUCCESS");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const renderSuccessDialogContent = () => {
    let numberOfCompletedTickets = 0;
    let numberOfIncompleteTickets = 0;
    let completionRate = 0;

    if (completedSprint) {
      numberOfCompletedTickets = completedSprint.completedTicketIds.length;
      numberOfIncompleteTickets = completedSprint.incompleteTicketIds.length;
      completionRate = Math.floor(
        (numberOfCompletedTickets / (numberOfCompletedTickets + numberOfIncompleteTickets)) * 100,
      );
    }

    return (
      <>
        <DialogContentText mb={3}>
          Congratulations on ending sprint{" "}
          <Typography component="span" color="primary">
            {completedSprint?.number}
          </Typography>
          ! Here's a quick breakdown on the sprint:
        </DialogContentText>
        <DialogContentText>
          Completed tickets:{" "}
          <Typography component="span" color="primary">
            {numberOfCompletedTickets} ({completionRate.toFixed(1)}%)
          </Typography>
        </DialogContentText>
        <DialogContentText>
          Incomplete tickets:{" "}
          <Typography component="span" color="primary">
            {numberOfIncompleteTickets}
          </Typography>
        </DialogContentText>
      </>
    );
  };

  const renderDialogContent = () => (
    <>
      <DialogContentText mb={3}>
        <Typography
          component="span"
          color="primary"
        >{`${completedTickets.length} of ${sprintTickets.length}`}</Typography>{" "}
        tickets completed in this sprint. Are you sure you want to end this sprint?
        <Typography component="span" color="error">
          {" "}
          This action will also archive all completed tickets.{" "}
        </Typography>
      </DialogContentText>
      {currentLoadState === "ERROR" && (
        <DialogErrorText text="Something went wrong while trying to end the sprint. Please try again later." />
      )}
    </>
  );

  return (
    <>
      <ActionDialog
        isOpen={showEndSprintDialog}
        onAccept={handleEndSprint}
        title="End sprint"
        titleIcon={<SprintEndIcon />}
        dialogContent={renderDialogContent()}
        onClose={handleClose}
        disableActionButton={false}
      />
      <ConfirmationDialog
        dialogContent={renderSuccessDialogContent()}
        isOpen={currentLoadState === "SUCCESS"}
        onClose={() => handleSetLoadingState("DEFAULT")}
        title="Successfully ended sprint!"
        titleIcon={<SprintEndIcon />}
      />
    </>
  );
};

export default SprintEndDialog;
