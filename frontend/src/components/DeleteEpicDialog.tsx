import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Epic from "../types/Epic";
import { sleep } from "../utils/sleep";
import deleteEpic from "../api/epics/deleteEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import { TicketsContext } from "../contexts/TicketsContextProvider";

interface DeleteEpicDialogProps {
  isDialogOpened: boolean;
  onClose: () => void;
  epic: Epic;
}

const DeleteEpicDialog = (props: DeleteEpicDialogProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isDialogOpened, onClose, epic } = props;
  const { title, ticketIds, _id: epicId } = epic;
  const { deleteEpic: deleteEpicInContext } = useContext(EpicsContext);
  const { updateTicket } = useContext(TicketsContext);

  const handleDelete = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(1000);
      await deleteEpic(epicId);
      deleteEpicInContext(epicId);
      ticketIds.forEach((ticketId) => updateTicket(ticketId, { epicId: null })); // unlink epicId from each ticket
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpened} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle
        sx={{
          borderTop: "8px solid",
          borderColor: "error.light",
          color: "error.light",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar variant='rounded' sx={{ bgcolor: "error.light" }}>
          <DeleteIcon />
        </Avatar>
        Delete Epic
      </DialogTitle>
      <DialogContent dividers sx={{ mb: 3 }}>
        <Typography fontSize={14} color='error' paragraph>
          Are you sure you want to delete the following epic:
        </Typography>
        <Paper sx={{ display: "flex", gap: 1, alignItems: "center" }} elevation={0}>
          <Typography variant='body2' noWrap>
            {title}
          </Typography>
          <Chip label={`${ticketIds.length} tickets`} size='small' variant='outlined' />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "grey.500" }} color='inherit' onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ color: "error.light" }}
          color='inherit'
          startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          onClick={handleDelete}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEpicDialog;
