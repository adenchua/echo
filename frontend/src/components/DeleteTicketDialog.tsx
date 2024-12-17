import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DialogContentText } from "@mui/material";
import { useEffect } from "react";

import useProductBacklog from "../hooks/useProductBacklog";
import Ticket from "../types/Ticket";
import DangerActionDialog from "./common/DangerActionDialog";
import useLoad from "../hooks/useLoad";
import DialogErrorText from "./common/DialogErrorText";

interface DeleteTicketDialogProps {
  isDialogOpened: boolean;
  onClose: () => void;
  ticket: Ticket;
  projectId: string;
}

const DeleteTicketDialog = (props: DeleteTicketDialogProps) => {
  const { isDialogOpened, onClose, ticket, projectId } = props;
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { title, _id: ticketId, epicId } = ticket;
  const { onDeleteTicket } = useProductBacklog();

  useEffect(() => {
    // reset state
    if (isDialogOpened) {
      handleSetLoadingState("DEFAULT");
    }
  }, [isDialogOpened, handleSetLoadingState]);

  const handleDelete = async (): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onDeleteTicket(ticketId, projectId, epicId);
      handleSetLoadingState("SUCCESS");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <DangerActionDialog
      isOpen={isDialogOpened}
      onClose={onClose}
      onAccept={handleDelete}
      title="Are you sure you want to delete the following ticket?"
      titleIcon={<DeleteIcon />}
      dialogContent={
        <>
          <DialogContentText>{title}</DialogContentText>
          {currentLoadState === "ERROR" && (
            <DialogErrorText text="Failed to delete ticket. Please try again later." mt={4} />
          )}
        </>
      }
      disableActionButton={false}
      acceptButtonText="Delete ticket"
    />
  );
};

export default DeleteTicketDialog;
