import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import TicketIcon from "@mui/icons-material/TaskAlt";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { PriorityType, TicketType } from "../types/TicketInterface";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtons";
import useProductBacklog from "../hooks/useProductBacklog";

interface CreateTicketButtonWithDialogProps {
  projectId: string;
}

const CreateTicketButtonWithDialog = (props: CreateTicketButtonWithDialogProps): JSX.Element => {
  const { onAddTicket } = useProductBacklog();
  const { projectId } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("");
  const [ticketType, setTicketType] = useState<TicketType>("task");
  const [priority, setPriority] = useState<PriorityType>("medium");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    // return dialog to original state upon opening
    if (isDialogOpen) {
      setIsLoading(false);
      setTitleInput("");
      setTicketType("task");
      setPriority("medium");
      setShowError(false);
    }
  }, [isDialogOpen]);

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  const handleAddTicket = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setShowError(false);
      await onAddTicket(titleInput, projectId, priority, ticketType);
      handleCloseDialog();
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: TicketType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    setTicketType(newType);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    setPriority(newPriority);
  };

  const renderDialog = (): JSX.Element => (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
      <form onSubmit={(e) => handleAddTicket(e)}>
        <DialogTitle
          sx={{
            borderTop: "8px solid",
            borderColor: "primary.light",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar variant='rounded' sx={{ bgcolor: "primary.main" }}>
            <TicketIcon />
          </Avatar>
          Add Ticket
        </DialogTitle>
        <DialogContent dividers>
          <Box display='flex' alignItems='center' gap={4.5} mb={4}>
            <Typography>Title: </Typography>
            <TextField
              autoFocus
              margin='none'
              type='text'
              fullWidth
              size='small'
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Box>
          <Box display='flex' alignItems='center' gap={4} mb={4}>
            <Typography>Type: </Typography>
            <FormTicketTypeToggleButtons value={ticketType} onChangeHandler={handleChangeTicketType} />
          </Box>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography>Priority: </Typography>
            <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
          </Box>
          {showError && (
            <Typography color='error' variant='caption'>
              Something went wrong. Please try again later.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey.600", borderColor: "grey.600" }} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            disabled={titleInput.length === 0 || isLoading}
            variant='contained'
            type='submit'
            startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          >
            {isLoading ? "Creating..." : "Create Ticket"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  return (
    <>
      <Button
        startIcon={<AddIcon fontSize='small' />}
        sx={{ display: { xs: "none", sm: "flex" } }}
        onClick={() => setIsDialogOpen(true)}
        size='small'
      >
        Add Ticket
      </Button>
      {renderDialog()}
    </>
  );
};

export default CreateTicketButtonWithDialog;
