import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketStatus } from "../../types/Ticket";
import StatusChipButton from "../StatusChipButton";
import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";

interface StatusEditItemProps {
  ticketId: string;
  status: TicketStatus;
}

const StatusEditItem = (props: StatusEditItemProps): JSX.Element => {
  const { status, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketStatus = (newStatus: TicketStatus): void => {
    onUpdateTicket(ticketId, { status: newStatus });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1} gap={1}>
          <Typography variant='body2'>Status</Typography>
          <UpdateButton onAccept={handleUpdateTicketStatus} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={2} width='100%'>
          <Select
            size='small'
            value={status}
            onChange={(e: SelectChangeEvent) => handleUpdateTicketStatus(e.target.value as TicketStatus)}
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
                <StatusChipButton status={ticketStatus as TicketStatus} size='small' />
              </MenuItem>
            ))}
          </Select>
          {status !== "completed" && (
            <Button
              fullWidth
              variant='outlined'
              size='small'
              sx={{ mt: 2 }}
              onClick={() => handleUpdateTicketStatus("completed")}
            >
              Mark as Done
            </Button>
          )}
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' gap={1} width='100%' mb={1}>
        <Typography variant='body2'>Status</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Box mb={2}>
        <StatusChipButton status={status} size='medium' />
      </Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default StatusEditItem;
