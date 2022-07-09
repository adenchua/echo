import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { sleep } from "../utils/sleep";
import useProductBacklog from "../hooks/useProductBacklog";
import Ticket from "../types/Ticket";

interface DeleteTicketDialogProps {
  isDialogOpened: boolean;
  onClose: () => void;
  ticket: Ticket;
  projectId: string;
}

const DeleteTicketDialog = (props: DeleteTicketDialogProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isDialogOpened, onClose, ticket, projectId } = props;
  const { title, _id: ticketId, epicId } = ticket;
  const { onDeleteTicket } = useProductBacklog();

  const handleDelete = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(1000);
      onDeleteTicket(ticketId, projectId, epicId);
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
        Delete Ticket
      </DialogTitle>
      <DialogContent dividers sx={{ mb: 3 }}>
        <Typography fontSize={14} color='error' paragraph>
          Are you sure you want to delete the following ticket:
        </Typography>
        <Paper sx={{ display: "flex", gap: 1, alignItems: "center" }} elevation={0}>
          <Typography variant='body2' noWrap>
            {title}
          </Typography>
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

export default DeleteTicketDialog;
