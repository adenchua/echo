import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import FormTicketTypeToggleButtons from "./FormTicketTypeToggleButtons";
import { PriorityType, TicketType } from "../types/Ticket";
import FormPriorityToggleButtons from "./FormPriorityToggleButtons";
import useProductBacklog from "../hooks/useProductBacklog";

interface CreateTicketFormProps {
  projectId: string;
  onClose: () => void;
}

const CreateTicketForm = (props: CreateTicketFormProps): JSX.Element => {
  const { projectId, onClose } = props;
  const [titleInput, setTitleInput] = useState<string>("");
  const [ticketType, setTicketType] = useState<TicketType>("task");
  const [priority, setPriority] = useState<PriorityType>("medium");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddTicket } = useProductBacklog();

  const handleAddTicket = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await onAddTicket(titleInput, projectId, priority, ticketType);
      setIsLoading(false);
      onClose();
    } catch (error) {
      // do nothing
    }
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: TicketType) => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    setTicketType(newType);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: PriorityType) => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    setPriority(newPriority);
  };

  return (
    <form onSubmit={(e) => handleAddTicket(e)}>
      <Paper
        sx={{
          py: 1,
          pl: 5,
          pr: 1,
          border: "1px dashed",
          borderColor: "grey.300",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
        elevation={0}
        square
      >
        <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
        <FormTicketTypeToggleButtons value={ticketType} onChangeHandler={handleChangeTicketType} />
        <TextField
          variant='filled'
          size='small'
          margin='none'
          inputProps={{ style: { padding: 7, fontSize: 14 } }}
          sx={{ maxWidth: 600 }}
          fullWidth
          autoFocus
          placeholder='Untitled'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />

        <Box flexGrow={1} />
        <Button size='small' variant='contained' color='inherit' onClick={onClose}>
          Cancel
        </Button>
        <Button
          size='small'
          variant='contained'
          type='submit'
          startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          disabled={titleInput.length === 0 || isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Paper>
    </form>
  );
};

export default CreateTicketForm;
