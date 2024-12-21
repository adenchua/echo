import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import { JSX, useContext, useEffect, useState } from "react";

import { EpicsContext } from "../contexts/EpicsContextProvider";
import useLoad from "../hooks/useLoad";
import useProductBacklog from "../hooks/useProductBacklog";
import { TicketPriority, TicketType } from "../types/Ticket";
import ActionDialog from "./common/ActionDialog";
import BannerError from "./common/BannerError";
import Button from "./common/Button";
import Select from "./common/Select";
import TextField from "./common/TextField";
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
  const [epicIdInput, setEpicIdInput] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriority>(DEFAULT_PRIORITY);
  const { onAddTicket } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { epics } = useContext(EpicsContext);

  useEffect(() => {
    // reset form state upon opening the dialog
    if (showDialog) {
      setTitleInput("");
      setTicketType(DEFAULT_TICKET_TYPE);
      setPriority(DEFAULT_PRIORITY);
      handleSetLoadingState("DEFAULT");
      setEpicIdInput("");
    }
  }, [showDialog, handleSetLoadingState]);

  const handleAddTicket = async (): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onAddTicket(titleInput, projectId, priority, ticketType, epicIdInput);
      handleSetLoadingState("SUCCESS");
      setShowDialog(false); //close dialog upon creation
    } catch {
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
            {currentLoadState === "ERROR" && (
              <BannerError sx={{ mb: 2 }}>
                Failed to add new ticket. Please try again later
              </BannerError>
            )}
            <TextField
              sx={{ mt: 1, mb: 2 }}
              label="Ticket title"
              placeholder="As a user, I want to add an item to my cart"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <Grid container spacing={2} mt={1} mb={3}>
              <Grid size={6}>
                <TicketTypeDropdown
                  label="Ticket type"
                  selectedValue={ticketType}
                  onChange={(event) => setTicketType(event.target.value as TicketType)}
                />
              </Grid>
              <Grid size={6}>
                <TicketPriorityDropdown
                  label="Priority"
                  selectedValue={priority}
                  onChange={(event) => setPriority(event.target.value as TicketPriority)}
                />
              </Grid>
            </Grid>
            <Select
              disabled={epics?.length === 0}
              label="(Optional) Link to an epic"
              value={epicIdInput}
              onChange={(e) => setEpicIdInput(e.target.value as string)}
            >
              {epics.map((epic) => {
                return (
                  <MenuItem key={epic._id} value={epic._id}>
                    {epic.title}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        }
      />
    </>
  );
};

export default AddTicketButtonWithDialog;
