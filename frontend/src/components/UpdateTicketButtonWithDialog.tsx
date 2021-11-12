import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DatePicker from "@mui/lab/DatePicker";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import TicketIcon from "@mui/icons-material/TaskAlt";
import Avatar from "@mui/material/Avatar";
import { isValid } from "date-fns";

import StoryInterface, { PriorityType, StatusType, StoryType, TicketUpdateFieldsType } from "../types/StoryInterface";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtonts";
import FormTicketStatusToggleButton from "./FormTicketStatusToggleButtons";

interface UpdateTicketButtonWithDialogProps {
  ticket: StoryInterface;
  showStatusButtons: boolean;
  onUpdateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => Promise<void>;
}

const UpdateTicketButtonWithDialog = (props: UpdateTicketButtonWithDialogProps): JSX.Element => {
  const { ticket, onUpdateTicket, showStatusButtons } = props;
  const { title, description, type, priority, _id: id, dueDate, status } = ticket;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description ?? "");
  const [ticketType, setTicketType] = useState<StoryType>(type);
  const [priorityInput, setPriorityInput] = useState<PriorityType>(priority);
  const [statusInput, setStatusInput] = useState<StatusType>(status);
  const [dueDateInput, setDueDateInput] = useState<Date | null>(dueDate ? new Date(dueDate) : null);

  const handleUpdateTicket = (): void => {
    const dueDateInputInISOString = dueDateInput ? dueDateInput.toISOString() : undefined;
    onUpdateTicket(id, {
      title: titleInput,
      description: descriptionInput,
      type: ticketType,
      priority: priorityInput,
      dueDate: dueDateInputInISOString,
      status: statusInput,
    });
    handleCloseDialog();
  };

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  const clearFields = (): void => {
    setTitleInput(title);
    setDescriptionInput(description);
    setTicketType(type);
    setPriorityInput(priority);
    setDueDateInput(dueDate ? new Date(dueDate) : null);
    setStatusInput(status);
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: StoryType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    setTicketType(newType);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    setPriorityInput(newPriority);
  };

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: StatusType) => {
    if (!newStatus) {
      return; // prevent deselecting a button
    }
    setStatusInput(newStatus);
  };

  return (
    <>
      <IconButton size='small' onClick={() => setIsDialogOpen(true)}>
        <MoreIcon />
      </IconButton>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          clearFields();
          handleCloseDialog();
        }}
        maxWidth='md'
        fullWidth
      >
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
          Update Ticket
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
            Title
          </Typography>
          <TextField
            fullWidth
            size='small'
            value={titleInput}
            sx={{ mb: 2 }}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
            Description
          </Typography>
          <TextField
            fullWidth
            size='small'
            value={descriptionInput}
            multiline
            rows={3}
            sx={{ mb: 2 }}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
            Priority
          </Typography>
          <Box mb={2}>
            <FormPriorityToggleButtons value={priorityInput} onChangeHandler={handleChangePriority} />
          </Box>
          <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
            Type
          </Typography>
          <Box mb={2}>
            <FormTicketTypeToggleButtons value={ticketType} onChangeHandler={handleChangeTicketType} />
          </Box>
          {showStatusButtons && (
            <>
              <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
                Status
              </Typography>
              <Box mb={2}>
                <FormTicketStatusToggleButton value={statusInput} onChangeHandler={handleChangeStatus} />
              </Box>
            </>
          )}
          <Typography sx={{ mb: 1, fontSize: 12 }} color='grey.600'>
            Due Date
          </Typography>
          <Box mb={2}>
            <DatePicker
              value={dueDateInput}
              onChange={(newValue) => {
                if (isValid(newValue)) {
                  setDueDateInput(newValue);
                }
              }}
              minDate={new Date()}
              clearable
              renderInput={(params) => <TextField {...params} size='small' />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "grey.500" }}
            onClick={() => {
              clearFields();
              handleCloseDialog();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateTicket} disabled={titleInput.length === 0}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTicketButtonWithDialog;
