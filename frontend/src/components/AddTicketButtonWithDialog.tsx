import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import { DialogContentText } from "@mui/material";
import useLoad from "../hooks/useLoad";
import useProductBacklog from "../hooks/useProductBacklog";
import { TicketPriority, TicketType } from "../types/Ticket";
import ActionDialog from "./common/ActionDialog";
import DialogErrorText from "./common/DialogErrorText";
import TicketPriorityDropdown from "./common/TicketPriorityDropdown";
import TicketTypeDropdown from "./common/TicketTypeDropdown";
import AddTicketIcon from "./icons/AddTicketIcon";

const DEFAULT_TICKET_TYPE: TicketType = "task";
const DEFAULT_PRIORITY: TicketPriority = "medium";

interface AddTicketButtonWithDialogProps {
  projectId: string;
}

const AddTicketButtonWithDialog = (props: AddTicketButtonWithDialogProps): JSX.Element => {
  const { projectId } = props;
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>("");
  const [ticketType, setTicketType] = useState<TicketType>(DEFAULT_TICKET_TYPE);
  const [priority, setPriority] = useState<TicketPriority>(DEFAULT_PRIORITY);
  const { onAddTicket } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();

  useEffect(() => {
    // reset form state upon opening the dialog
    if (showDialog) {
      setTitleInput("");
      setTicketType(DEFAULT_TICKET_TYPE);
      setPriority(DEFAULT_PRIORITY);
      handleSetLoadingState("DEFAULT");
    }
  }, [showDialog, handleSetLoadingState]);

  const handleAddTicket = async (): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onAddTicket(titleInput, projectId, priority, ticketType);
      handleSetLoadingState("SUCCESS");
      setShowDialog(false); //close dialog upon creation
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <>
      <Button
        startIcon={<AddTicketIcon fontSize="small" />}
        onClick={() => setShowDialog(true)}
        size="small"
      >
        Add Ticket
      </Button>
      <ActionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onAccept={() => handleAddTicket()}
        title="Add new ticket"
        titleIcon={<AddTicketIcon />}
        disableActionButton={currentLoadState === "LOADING" || titleInput.length === 0}
        dialogContent={
          <>
            <DialogContentText>Title</DialogContentText>
            <TextField
              variant="filled"
              fullWidth
              autoFocus
              placeholder="As a user, I want to add an item to my cart"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <DialogContentText>Ticket type</DialogContentText>
                <TicketTypeDropdown
                  selectedValue={ticketType}
                  onChange={(event, child) => setTicketType(event.target.value as TicketType)}
                />
              </Grid>
              <Grid item xs={6}>
                <DialogContentText>Priority</DialogContentText>
                <TicketPriorityDropdown
                  selectedValue={priority}
                  onChange={(event, child) => setPriority(event.target.value as TicketPriority)}
                />
              </Grid>
            </Grid>
            {currentLoadState === "ERROR" && (
              <DialogErrorText text="Failed to add new ticket. Please try again later." mt={2} />
            )}
          </>
        }
        acceptButtonText="Add ticket"
      />
    </>
  );
};

export default AddTicketButtonWithDialog;
