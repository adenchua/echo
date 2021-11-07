import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import TicketIcon from "@mui/icons-material/TaskAlt";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import TaskIcon from "@mui/icons-material/Task";
import BugIcon from "@mui/icons-material/BugReport";
import UserStoryIcon from "@mui/icons-material/AutoStories";
import CircularProgress from "@mui/material/CircularProgress";
import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";

import HighestPriorityIcon from "./HighestPriorityIcon";
import { Tooltip } from "@mui/material";
import { PriorityType, StoryType } from "../types/StoryInterface";

type ScreenType = "desktop" | "mobile";

interface CreateTicketButtonWithDialogProps {
  onAddTicket: (title: string, projectId: string, priority: PriorityType, type: StoryType) => Promise<void>;
  projectId: string;
  variant: ScreenType;
}

const CreateTicketButtonWithDialog = (props: CreateTicketButtonWithDialogProps): JSX.Element => {
  const { onAddTicket, projectId, variant } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("");
  const [ticketType, setTicketType] = useState<StoryType>("task");
  const [priority, setPriority] = useState<PriorityType>("medium");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
    setIsLoading(false);
    setTitleInput("");
    setTicketType("task");
    setPriority("medium");
    setShowError(false);
  };

  const handleAddTicket = async (): Promise<void> => {
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

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: StoryType) => {
    setTicketType(newType);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    setPriority(newPriority);
  };

  const renderDialog = (): JSX.Element => (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
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
          <ToggleButtonGroup
            value={ticketType}
            color='primary'
            exclusive
            onChange={handleChangeTicketType}
            size='small'
          >
            <ToggleButton value={"task"}>
              <Tooltip title={"Task"}>
                <TaskIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={"story"}>
              <Tooltip title={"Story"}>
                <UserStoryIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={"bug"}>
              <Tooltip title={"Bug"}>
                <BugIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display='flex' alignItems='center' gap={2}>
          <Typography>Priority: </Typography>
          <ToggleButtonGroup value={priority} color='primary' exclusive onChange={handleChangePriority} size='small'>
            <ToggleButton value={"low"}>
              <Tooltip title={"Low"}>
                <LowPriorityIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={"medium"}>
              <Tooltip title={"Medium"}>
                <MediumPriorityIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={"high"}>
              <Tooltip title={"High"}>
                <HighPriorityIcon fontSize='small' />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={"highest"}>
              <Tooltip title={"Highest"}>
                <div>
                  <HighestPriorityIcon />
                </div>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {showError && (
          <Typography color='error' variant='caption'>
            Something went wrong. Please try again later.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "grey.600", borderColor: "grey.600" }} onClick={handleCloseDialog} variant='outlined'>
          Cancel
        </Button>
        <Button
          disabled={titleInput.length === 0 || isLoading}
          variant='contained'
          onClick={handleAddTicket}
          startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
        >
          {isLoading ? "Creating..." : "Create Ticket"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {variant === "desktop" && (
        <Button
          startIcon={<AddIcon />}
          variant='outlined'
          sx={{ minWidth: "128px", minHeight: "40px", display: { xs: "none", sm: "flex" } }}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Ticket
        </Button>
      )}
      {variant === "mobile" && (
        <IconButton
          color='primary'
          sx={{ display: { sm: "none" }, border: "1px solid", borderRadius: "4px" }}
          size='small'
          onClick={() => setIsDialogOpen(true)}
        >
          <AddIcon />
        </IconButton>
      )}
      {renderDialog()}
    </>
  );
};

export default CreateTicketButtonWithDialog;
