import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

import { DialogContentText } from "@mui/material";
import useLoad from "../hooks/useLoad";
import useProductBacklog from "../hooks/useProductBacklog";
import { TicketPriority, TicketType } from "../types/Ticket";
import ActionDialog from "./common/ActionDialog";
import Button from "./common/Button";
import DialogErrorText from "./common/DialogErrorText";
import TicketPriorityDropdown from "./common/TicketPriorityDropdown";
import TicketTypeDropdown from "./common/TicketTypeDropdown";
import AddTicketIcon from "./icons/AddTicketIcon";
import TextField from "./common/TextField";

const DEFAULT_TICKET_TYPE: TicketType = "task";
const DEFAULT_PRIORITY: TicketPriority = "medium";

interface AddTicketButtonWithDialogProps {
  projectId: string;
}

const AddTicketButtonWithDialog = (props: AddTicketButtonWithDialogProps) => {
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
      <Button startIcon={<AddTicketIcon />} onClick={() => setShowDialog(true)}>
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
            <TextField
              sx={{ mt: 1, mb: 2 }}
              label="Ticket title"
              placeholder="As a user, I want to add an item to my cart"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <Grid container spacing={2} mt={1}>
              <Grid size={6}>
                <TicketTypeDropdown
                  label="Ticket type"
                  selectedValue={ticketType}
                  onChange={(event, child) => setTicketType(event.target.value as TicketType)}
                />
              </Grid>
              <Grid size={6}>
                <TicketPriorityDropdown
                  label="Priority"
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
      />
    </>
  );
};

export default AddTicketButtonWithDialog;
