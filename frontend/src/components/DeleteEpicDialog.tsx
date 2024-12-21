import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { JSX, useContext } from "react";

import { DialogContentText } from "@mui/material";
import deleteEpic from "../api/epics/deleteEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import { TicketsContext } from "../contexts/TicketsContextProvider";
import Epic from "../types/Epic";
import DangerActionDialog from "./common/DangerActionDialog";

interface DeleteEpicDialogProps {
  isDialogOpened: boolean;
  onClose: () => void;
  epic: Epic;
}

const DeleteEpicDialog = (props: DeleteEpicDialogProps): JSX.Element => {
  const { isDialogOpened, onClose, epic } = props;
  const { title, ticketIds, _id: epicId } = epic;
  const { deleteEpic: deleteEpicInContext } = useContext(EpicsContext);
  const { updateTicket } = useContext(TicketsContext);

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteEpic(epicId);
      deleteEpicInContext(epicId);
      ticketIds.forEach((ticketId) => updateTicket(ticketId, { epicId: null })); // unlink epicId from each ticket
    } catch {
      // do nothing
    }
  };

  return (
    <DangerActionDialog
      isOpen={isDialogOpened}
      onClose={onClose}
      dialogContent={
        <>
          <DialogContentText mb={4}>
            Are you sure you want to delete the following epic? This action also will move
            unfinished tickets to &quot;Others&quot;:
          </DialogContentText>
          <DialogContentText>{title}</DialogContentText>
        </>
      }
      onAccept={handleDelete}
      disableActionButton={false}
      title="Confirm delete epic"
      titleIcon={<DeleteIcon />}
      acceptButtonText="Delete epic"
    />
  );
};

export default DeleteEpicDialog;
