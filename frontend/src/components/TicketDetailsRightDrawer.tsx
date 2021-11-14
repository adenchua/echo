import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Chip from "@mui/material/Chip";
import { format, isValid } from "date-fns";

import StoryInterface, { PriorityType, StatusType, StoryType, TicketUpdateFieldsType } from "../types/StoryInterface";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtonts";

interface TicketDetailsRightDrawerProps {
  ticket: StoryInterface;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTicket: (ticketId: string, updatedFields: TicketUpdateFieldsType) => Promise<void>;
}

const TicketDetailsRightDrawer = (props: TicketDetailsRightDrawerProps): JSX.Element => {
  const { ticket, onClose, onUpdateTicket, isOpen } = props;
  const { _id: id, title, description, priority, type, dueDate, status } = ticket;
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description ?? "");
  const [ticketType, setTicketType] = useState<StoryType>(type);
  const [priorityInput, setPriorityInput] = useState<PriorityType>(priority);
  const [statusInput, setStatusInput] = useState<StatusType>(status);
  const [dueDateInput, setDueDateInput] = useState<Date | null>(dueDate ? new Date(dueDate) : null);
  const [isTitleEditModeOn, setIsTitleEditModeOn] = useState<boolean>(false);
  const [isDescriptionEditModeOn, setIsDescriptionEditModeOn] = useState<boolean>(false);
  const [isPriorityEditModeOn, setIsPriorityEditModeOn] = useState<boolean>(false);
  const [isTypeEditModeOn, setIsTypeEditModeOn] = useState<boolean>(false);
  const [isDueDateEditModeOn, setDueDateEditModeOn] = useState<boolean>(false);

  const closeAllEditModes = (): void => {
    setIsTitleEditModeOn(false);
    setIsDescriptionEditModeOn(false);
    setIsPriorityEditModeOn(false);
    setIsTypeEditModeOn(false);
    setDueDateEditModeOn(false);
  };

  useEffect(() => {
    const clearFields = (): void => {
      setTitleInput(title);
      setDescriptionInput(description);
      setTicketType(type);
      setPriorityInput(priority);
      setDueDateInput(dueDate ? new Date(dueDate) : null);
      setStatusInput(status);
    };

    closeAllEditModes();
    clearFields();
  }, [ticket, title, description, type, priority, dueDate, status]);

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
    closeAllEditModes();
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    setPriorityInput(newPriority);
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: StoryType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    setTicketType(newType);
  };

  const handleTitleEditMode = (): void => {
    setIsTitleEditModeOn(!isTitleEditModeOn);
  };

  const handleDescriptionEditMode = (): void => {
    setIsDescriptionEditModeOn(!isDescriptionEditModeOn);
  };

  const handlePriorityEditMode = (): void => {
    setIsPriorityEditModeOn(!isPriorityEditModeOn);
  };

  const handleTicketTypeEditMode = (): void => {
    setIsTypeEditModeOn(!isTypeEditModeOn);
  };

  const handleDueDateEditMode = (): void => {
    setDueDateEditModeOn(!isDueDateEditModeOn);
  };

  const renderEditButton = (onStartEdit: any): JSX.Element => (
    <Typography
      variant='body2'
      color='primary'
      sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
      onClick={onStartEdit}
    >
      Edit
    </Typography>
  );

  const renderUpdateButtons = (onAccept: any, onCancel: any): JSX.Element => (
    <>
      <Typography
        variant='body2'
        color='primary'
        sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
        onClick={onAccept}
      >
        Update
      </Typography>
      <Typography
        variant='body2'
        color='primary'
        sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
        onClick={onCancel}
      >
        Cancel
      </Typography>
    </>
  );

  const renderTitleListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={0.5}>
        <Typography variant='body2'>Ticket</Typography>
        {renderEditButton(handleTitleEditMode)}
      </Box>
      <ListItemText secondary={title} sx={{ mb: 2 }} />
      <Divider flexItem />
    </ListItem>
  );

  const renderTitleListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={0.5} gap={2}>
        <Typography variant='body2'>Ticket</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleTitleEditMode)}
      </Box>
      <TextField
        value={titleInput}
        variant='filled'
        fullWidth
        onChange={(e) => setTitleInput(e.target.value)}
        margin='dense'
        size='small'
        multiline
        sx={{ mb: 2 }}
        autoFocus
      />
      <Divider flexItem />
    </ListItem>
  );

  const renderDescriptionListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={0.5}>
        <Typography variant='body2'>Description</Typography>
        {renderEditButton(handleDescriptionEditMode)}
      </Box>
      <ListItemText secondary={!description || description === "" ? "None" : description} sx={{ mb: 2 }} />
      <Divider flexItem />
    </ListItem>
  );

  const renderDescriptionListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={0.5} gap={2}>
        <Typography variant='body2'>Ticket</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleDescriptionEditMode)}
      </Box>
      <TextField
        value={descriptionInput}
        variant='filled'
        fullWidth
        onChange={(e) => setDescriptionInput(e.target.value)}
        margin='dense'
        size='small'
        multiline
        sx={{ mb: 2 }}
        autoFocus
      />
      <Divider flexItem />
    </ListItem>
  );

  const renderPriorityListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Priority</Typography>
        {renderEditButton(handlePriorityEditMode)}
      </Box>
      <Chip
        label={`${capitalizeFirstLetter(priority)} Priority`}
        size='small'
        icon={
          <Box display='flex' alignItems='center'>
            <PriorityIcon priority={priority} />
          </Box>
        }
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );

  const renderPriorityListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={2} gap={2}>
        <Typography variant='body2'>Priority</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handlePriorityEditMode)}
      </Box>
      <Box mb={2}>
        <FormPriorityToggleButtons value={priorityInput} onChangeHandler={handleChangePriority} />
      </Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderTicketTypeListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Type</Typography>
        {renderEditButton(handleTicketTypeEditMode)}
      </Box>
      <Chip
        label={`${capitalizeFirstLetter(type)}`}
        size='small'
        icon={
          <Box display='flex' alignItems='center'>
            <TicketTypeIcon type={type} />
          </Box>
        }
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );

  const renderTicketTypeListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={2} gap={2}>
        <Typography variant='body2'>Type</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleTicketTypeEditMode)}
      </Box>
      <Box mb={2}>
        <FormTicketTypeToggleButtons value={ticketType} onChangeHandler={handleChangeTicketType} />
      </Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderDueDateListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={0.5}>
        <Typography variant='body2'>Due Date</Typography>
        {renderEditButton(handleDueDateEditMode)}
      </Box>
      <ListItemText
        secondary={!dueDate || dueDate === "" ? "None" : format(new Date(dueDate), "dd MMMM yyyy")}
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );

  const renderDueDateListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={2} gap={2}>
        <Typography variant='body2'>Due Date</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleDueDateEditMode)}
      </Box>
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
      <Divider flexItem />
    </ListItem>
  );

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      variant='persistent'
      onClose={closeAllEditModes}
      sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 240 } }}
    >
      <List>
        <ListItem disablePadding sx={{ pl: 1, py: 1 }}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ListItem>
        {!isTitleEditModeOn && renderTitleListItem()}
        {isTitleEditModeOn && renderTitleListItemEdit()}

        {!isDescriptionEditModeOn && renderDescriptionListItem()}
        {isDescriptionEditModeOn && renderDescriptionListItemEdit()}

        {!isPriorityEditModeOn && renderPriorityListItem()}
        {isPriorityEditModeOn && renderPriorityListItemEdit()}

        {!isTypeEditModeOn && renderTicketTypeListItem()}
        {isTypeEditModeOn && renderTicketTypeListItemEdit()}

        {!isDueDateEditModeOn && renderDueDateListItem()}
        {isDueDateEditModeOn && renderDueDateListItemEdit()}
      </List>
    </Drawer>
  );
};

export default TicketDetailsRightDrawer;
