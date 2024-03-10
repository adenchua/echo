import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketStatus } from "../../types/Ticket";
import StatusChipButton from "../StatusChipButton";
import Select from "../common/Select";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface StatusEditItemProps {
  ticketId: string;
  status: TicketStatus;
}

const StatusEditItem = (props: StatusEditItemProps): JSX.Element => {
  const { status, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketStatus = async (newStatus: TicketStatus): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { status: newStatus });
      handleSetLoadingState("SUCCESS");
      handleToggleEditMode();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title='Status'
            actionButton={
              <UpdateButton
                onAccept={handleUpdateTicketStatus}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <Box mb={2} width='100%'>
            <Select value={status} onChange={(e) => handleUpdateTicketStatus(e.target.value as TicketStatus)}>
              {["todo", "progress", "review", "completed", "stuck", "hold"].map((ticketStatus) => (
                <MenuItem key={ticketStatus} value={ticketStatus} sx={{ display: "flex", justifyContent: "center" }}>
                  <StatusChipButton status={ticketStatus as TicketStatus} size='medium' />
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
        <SnackbarError isOpen={currentLoadState === "ERROR"} onClose={() => handleSetLoadingState("DEFAULT")} />
      </>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle title='Status' actionButton={<EditButton onStartEdit={handleToggleEditMode} />} />
      <Box mb={2}>
        <StatusChipButton status={status} size='medium' />
      </Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default StatusEditItem;
