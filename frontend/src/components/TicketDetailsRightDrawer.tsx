import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import StoryInterface from "../types/StoryInterface";
import useProductBacklog from "../hooks/useProductBacklog";
import { EpicsContext } from "./contexts/EpicsContextProvider";
import TitleEditItem from "./TicketRightDrawerItems/TitleEditItem";
import DescriptionEditItem from "./TicketRightDrawerItems/DescriptionEditItem";
import PriorityEditItem from "./TicketRightDrawerItems/PriorityEditItem";
import TicketTypeEditItem from "./TicketRightDrawerItems/TicketTypeEditItem";
import StatusEditItem from "./TicketRightDrawerItems/StatusEditItem";
import DueDateEditItem from "./TicketRightDrawerItems/DueDateEditItem";
import AssigneeEditItem from "./TicketRightDrawerItems/AssigneeEditItem";
import EpicLinkEditItem from "./TicketRightDrawerItems/EpicLinkEditItem";

interface TicketDetailsRightDrawerProps {
  ticket: StoryInterface;
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const TicketDetailsRightDrawer = (props: TicketDetailsRightDrawerProps): JSX.Element => {
  const { ticket, onClose, isOpen, projectId } = props;
  const { _id: id, title, description, priority, type, dueDate, status, assigneeId, epicId } = ticket;

  const { onDeleteTicket } = useProductBacklog();

  const { epics } = useContext(EpicsContext);

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      variant='persistent'
      sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 240 } }}
    >
      <List>
        <ListItem disablePadding sx={{ pl: 1, py: 1 }}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ListItem>

        <TitleEditItem ticketId={id} title={title} />
        <DescriptionEditItem ticketId={id} description={description} />
        <AssigneeEditItem ticketId={id} assigneeId={assigneeId} />
        <PriorityEditItem ticketId={id} priority={priority} />
        <TicketTypeEditItem ticketId={id} type={type} />
        <StatusEditItem ticketId={id} status={status} />
        <DueDateEditItem ticketId={id} dueDate={dueDate} />
        {epics.length > 0 && <EpicLinkEditItem ticketId={id} epicId={epicId} />}

        <ListItem sx={{ mt: 1 }}>
          <Button fullWidth variant='outlined' color='error' onClick={() => onDeleteTicket(id, projectId)}>
            Delete Ticket
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default TicketDetailsRightDrawer;
