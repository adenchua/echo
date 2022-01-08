import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import EditButton from "./EditButton";
import useProductBacklog from "../../hooks/useProductBacklog";
import { StatusType } from "../../types/TicketInterface";
import StatusChipButton from "../StatusChipButton";
import UpdateButton from "./UpdateButton";

interface StatusEditItemProps {
  ticketId: string;
  status: StatusType;
}

const StatusEditItem = (props: StatusEditItemProps): JSX.Element => {
  const { status, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketStatus = (newStatus: StatusType): void => {
    onUpdateTicket(ticketId, { status: newStatus });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1.5} gap={2}>
          <Typography variant='body2'>Status</Typography>
          <Box flexGrow={1} />
          <UpdateButton onAccept={handleUpdateTicketStatus} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={2} width='100%'>
          <Select
            size='small'
            value={status}
            onChange={(e: SelectChangeEvent) => handleUpdateTicketStatus(e.target.value as StatusType)}
            fullWidth
            SelectDisplayProps={{
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 8px",
                margin: 0,
                background: "#00000014",
              },
            }}
          >
            {["todo", "progress", "review", "completed", "stuck", "hold"].map((ticketStatus) => (
              <MenuItem
                key={ticketStatus}
                value={ticketStatus}
                dense
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <StatusChipButton status={ticketStatus as StatusType} size='small' />
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Status</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Box mb={2}>
        <StatusChipButton status={status} size='small' />
      </Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default StatusEditItem;
