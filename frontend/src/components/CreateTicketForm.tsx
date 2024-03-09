import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import useLoad from "../hooks/useLoad";
import useProductBacklog from "../hooks/useProductBacklog";
import { TicketPriority, TicketType } from "../types/Ticket";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtons";
import SnackbarError from "./common/SnackbarError";

interface CreateTicketFormProps {
  projectId: string;
  onClose: () => void;
}

const CreateTicketForm = (props: CreateTicketFormProps): JSX.Element => {
  const { projectId, onClose } = props;
  const [titleInput, setTitleInput] = useState<string>("");
  const [ticketType, setTicketType] = useState<TicketType>("task");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { onAddTicket } = useProductBacklog();

  const handleAddTicket = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      handleSetLoadingState("LOADING");
      await onAddTicket(titleInput, projectId, priority, ticketType);
      handleSetLoadingState("SUCCESS");
      onClose();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: TicketType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    setTicketType(newType);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: TicketPriority) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    setPriority(newPriority);
  };

  return (
    <>
      <form onSubmit={(e) => handleAddTicket(e)}>
        <Paper
          sx={{
            py: 1.5,
            pl: 5,
            pr: 1,
            border: "1px dashed",
            borderColor: "grey.300",
          }}
          elevation={0}
        >
          <Box display='flex' alignItems='center' gap={2}>
            <TextField
              variant='filled'
              sx={{ width: 600 }}
              inputProps={{ style: { padding: 7 } }}
              autoFocus
              placeholder='Untitled'
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <Button variant='contained' color='inherit' onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              type='submit'
              startIcon={currentLoadState === "LOADING" && <CircularProgress sx={{ color: "inherit" }} size={14} />}
              disabled={titleInput.length === 0 || currentLoadState === "LOADING"}
            >
              {currentLoadState === "LOADING" ? "Creating..." : "Create ticket"}
            </Button>
          </Box>
          <Box mt={2} display='flex' gap={2}>
            <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
            <FormTicketTypeToggleButtons value={ticketType} onChangeHandler={handleChangeTicketType} />
          </Box>
        </Paper>
      </form>
      <SnackbarError isOpen={currentLoadState === "ERROR"} onClose={() => handleSetLoadingState("DEFAULT")} />
    </>
  );
};

export default CreateTicketForm;
