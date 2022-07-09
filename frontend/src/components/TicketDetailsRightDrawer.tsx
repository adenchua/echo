import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Ticket from "../types/Ticket";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import TitleEditItem from "./TicketRightDrawerItems/TitleEditItem";
import DescriptionEditItem from "./TicketRightDrawerItems/DescriptionEditItem";
import PriorityEditItem from "./TicketRightDrawerItems/PriorityEditItem";
import TicketTypeEditItem from "./TicketRightDrawerItems/TicketTypeEditItem";
import StatusEditItem from "./TicketRightDrawerItems/StatusEditItem";
import DueDateEditItem from "./TicketRightDrawerItems/DueDateEditItem";
import AssigneeEditItem from "./TicketRightDrawerItems/AssigneeEditItem";
import EpicLinkEditItem from "./TicketRightDrawerItems/EpicLinkEditItem";
import StoryPointsEditItem from "./TicketRightDrawerItems/StoryPointsEditItem";
import DeleteTicketDialog from "./DeleteTicketDialog";
import { TICKET_DRAWER_WIDTH } from "../utils/constants";
import SubtaskEditItem from "./TicketRightDrawerItems/SubtaskEditItem";

interface TicketDetailsRightDrawerProps {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const TicketDetailsRightDrawer = (props: TicketDetailsRightDrawerProps): JSX.Element => {
  const { ticket, onClose, isOpen, projectId } = props;
  const {
    _id: id,
    title,
    description,
    priority,
    type,
    dueDate,
    status,
    assigneeId,
    epicId,
    storyPoints,
    subtaskIds,
  } = ticket;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { epics } = useContext(EpicsContext);

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      variant='persistent'
      sx={{
        width: TICKET_DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: TICKET_DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem disablePadding sx={{ pl: 1, py: 1 }}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ListItem>

        <TitleEditItem ticketId={id} title={title} />
        <DescriptionEditItem ticketId={id} description={description} />
        <StoryPointsEditItem ticketId={id} storyPoints={storyPoints} />
        <PriorityEditItem ticketId={id} priority={priority} />
        <AssigneeEditItem ticketId={id} assigneeId={assigneeId} />
        <StatusEditItem ticketId={id} status={status} />
        <TicketTypeEditItem ticketId={id} type={type} />
        <DueDateEditItem ticketId={id} dueDate={dueDate} />
        <SubtaskEditItem ticketId={id} subtaskIds={subtaskIds} />
        {epics.length > 0 && <EpicLinkEditItem ticketId={id} epicId={epicId} />}

        <ListItem sx={{ mt: 1 }}>
          <Button fullWidth variant='outlined' color='error' onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Ticket
          </Button>
        </ListItem>
      </List>
      <DeleteTicketDialog
        projectId={projectId}
        ticket={ticket}
        isDialogOpened={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </Drawer>
  );
};

export default TicketDetailsRightDrawer;
