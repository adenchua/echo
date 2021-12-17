import React, { useState, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Chip from "@mui/material/Chip";
import { format, isValid } from "date-fns";

import StoryInterface, { PriorityType, StatusType, StoryType } from "../types/StoryInterface";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import PriorityIcon from "./PriorityIcon";
import TicketTypeIcon from "./TicketTypeIcon";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtonts";
import useProductBacklog from "../hooks/useProductBacklog";
import StatusChipButton from "./StatusChipButton";
import UserInterface from "../types/UserInterface";
import fetchUsersByIds from "../api/users/fetchUsersByIds";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import { ProjectMembersContext } from "./contexts/ProjectMembersContextProvider";

interface TicketDetailsRightDrawerProps {
  ticket: StoryInterface;
  isOpen: boolean;
  onClose: () => void;
}

const TicketDetailsRightDrawer = (props: TicketDetailsRightDrawerProps): JSX.Element => {
  const { ticket, onClose, isOpen } = props;
  const { onUpdateTicket } = useProductBacklog();
  const { members, admins } = useContext(ProjectMembersContext);
  const { _id: id, title, description, priority, type, dueDate, status, assigneeId } = ticket;
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description ?? "");
  const [assignee, setAssignee] = useState<UserInterface | null>(null);
  const [dueDateInput, setDueDateInput] = useState<Date | null>(dueDate ? new Date(dueDate) : null);
  const [isTitleEditModeOn, setIsTitleEditModeOn] = useState<boolean>(false);
  const [isDescriptionEditModeOn, setIsDescriptionEditModeOn] = useState<boolean>(false);
  const [isPriorityEditModeOn, setIsPriorityEditModeOn] = useState<boolean>(false);
  const [isTypeEditModeOn, setIsTypeEditModeOn] = useState<boolean>(false);
  const [isDueDateEditModeOn, setDueDateEditModeOn] = useState<boolean>(false);
  const [isStatusEditModeOn, setIsStatusEditModeOn] = useState<boolean>(false);
  const [isAssigneeEditModeOn, setIsAssigneeEditModeOn] = useState<boolean>(false);

  const closeAllEditModes = (): void => {
    setIsTitleEditModeOn(false);
    setIsDescriptionEditModeOn(false);
    setIsPriorityEditModeOn(false);
    setIsTypeEditModeOn(false);
    setDueDateEditModeOn(false);
    setIsStatusEditModeOn(false);
    setIsAssigneeEditModeOn(false);
  };

  useEffect(() => {
    const getAssigneeDetails = async () => {
      if (!assigneeId) {
        setAssignee(null);
        return;
      }
      const [response] = await fetchUsersByIds([assigneeId]);
      setAssignee(response);
    };

    getAssigneeDetails();
  }, [assigneeId]);

  useEffect(() => {
    const clearFields = (): void => {
      setTitleInput(title);
      setDescriptionInput(description);
      setDueDateInput(dueDate ? new Date(dueDate) : null);
    };

    closeAllEditModes();
    clearFields();
  }, [ticket, title, description, type, priority, dueDate, status, assigneeId]);

  const handleUpdateTicket = (): void => {
    const dueDateInputInISOString = dueDateInput ? dueDateInput.toISOString() : null;
    onUpdateTicket(id, {
      title: titleInput,
      description: descriptionInput,
      dueDate: dueDateInputInISOString,
    });
    closeAllEditModes();
  };

  const handleUpdateTicketStatus = (newStatus: StatusType): void => {
    onUpdateTicket(id, { status: newStatus });
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    onUpdateTicket(id, { priority: newPriority });
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: StoryType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    onUpdateTicket(id, { type: newType });
  };

  const handleUpdateTicketAssignee = (newAssigneeId: string) => {
    onUpdateTicket(id, { assigneeId: newAssigneeId ? newAssigneeId : null }); // if no assignee, newAssigneeId will be empty string
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

  const handleStatusEditMode = (): void => {
    setIsStatusEditModeOn(!isStatusEditModeOn);
  };

  const handleAssigneeEditMode = (): void => {
    setIsAssigneeEditModeOn(!isAssigneeEditModeOn);
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

  const renderUpdateButtons = (onAccept: any, onCancel: any, showUpdateButton: boolean): JSX.Element => (
    <>
      {showUpdateButton && (
        <Typography
          variant='body2'
          color='primary'
          sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={onAccept}
        >
          Update
        </Typography>
      )}
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
        {renderUpdateButtons(handleUpdateTicket, handleTitleEditMode, true)}
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
        {renderUpdateButtons(handleUpdateTicket, handleDescriptionEditMode, true)}
      </Box>
      <TextField
        value={descriptionInput}
        variant='filled'
        fullWidth
        onChange={(e) => setDescriptionInput(e.target.value)}
        margin='dense'
        size='small'
        multiline
        rows={3}
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
        {renderUpdateButtons(handleUpdateTicket, handlePriorityEditMode, false)}
      </Box>
      <Box mb={2}>
        <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
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
        {renderUpdateButtons(handleUpdateTicket, handleTicketTypeEditMode, false)}
      </Box>
      <Box mb={2}>
        <FormTicketTypeToggleButtons value={type} onChangeHandler={handleChangeTicketType} />
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
        {renderUpdateButtons(handleUpdateTicket, handleDueDateEditMode, false)}
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
          renderInput={(params) => <TextField {...params} size='small' />}
        />
        <Button onClick={() => setDueDateInput(null)}>Remove Due Date</Button>
      </Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderStatusListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Status</Typography>
        {renderEditButton(handleStatusEditMode)}
      </Box>
      <Box mb={2}>
        <StatusChipButton status={status} size='small' />
      </Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderStatusListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={1.5} gap={2}>
        <Typography variant='body2'>Status</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleStatusEditMode, false)}
      </Box>
      <Box mb={2} width='100%'>
        <Select
          size='small'
          value={status}
          onChange={(e: SelectChangeEvent) => handleUpdateTicketStatus(e.target.value as StatusType)}
          fullWidth
        >
          {["todo", "progress", "review", "completed", "stuck", "hold"].map((ticketStatus) => (
            <MenuItem key={ticketStatus} value={ticketStatus} dense sx={{ display: "flex", justifyContent: "center" }}>
              <StatusChipButton status={ticketStatus as StatusType} size='small' />
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderAssigneeChip = (): JSX.Element => {
    if (!assignee) {
      return <ListItemText secondary='None' />;
    }
    const { _id: userId, username, displayName } = assignee;
    return <Chip key={userId} avatar={<Avatar src={getUserAvatarSVG(username)} />} label={displayName} size='small' />;
  };

  const renderAssigneeListItem = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Assignee</Typography>
        {renderEditButton(handleAssigneeEditMode)}
      </Box>
      <Box mb={2}>{renderAssigneeChip()}</Box>
      <Divider flexItem />
    </ListItem>
  );

  const renderAssigneeListItemEdit = (): JSX.Element => (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={1.5} gap={2}>
        <Typography variant='body2'>Assignee</Typography>
        <Box flexGrow={1} />
        {renderUpdateButtons(handleUpdateTicket, handleAssigneeEditMode, false)}
      </Box>
      <Box mb={2} width='100%'>
        <Select
          size='small'
          onChange={(e: SelectChangeEvent) => handleUpdateTicketAssignee(e.target.value)}
          value={assigneeId ? assigneeId : ""}
          fullWidth
        >
          <MenuItem value='' dense sx={{ display: "flex", justifyContent: "center" }}>
            None
          </MenuItem>
          {[...admins, ...members].map((user) => {
            const { displayName, _id: userId, username } = user;
            return (
              <MenuItem key={userId} value={userId} dense>
                <ListItemAvatar>
                  <Avatar sx={{ height: 24, width: 24 }} src={getUserAvatarSVG(username)} />
                </ListItemAvatar>
                <ListItemText>{displayName}</ListItemText>
              </MenuItem>
            );
          })}
        </Select>
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

        {!isAssigneeEditModeOn && renderAssigneeListItem()}
        {isAssigneeEditModeOn && renderAssigneeListItemEdit()}

        {!isPriorityEditModeOn && renderPriorityListItem()}
        {isPriorityEditModeOn && renderPriorityListItemEdit()}

        {!isTypeEditModeOn && renderTicketTypeListItem()}
        {isTypeEditModeOn && renderTicketTypeListItemEdit()}

        {!isStatusEditModeOn && renderStatusListItem()}
        {isStatusEditModeOn && renderStatusListItemEdit()}

        {!isDueDateEditModeOn && renderDueDateListItem()}
        {isDueDateEditModeOn && renderDueDateListItemEdit()}
      </List>
    </Drawer>
  );
};

export default TicketDetailsRightDrawer;
