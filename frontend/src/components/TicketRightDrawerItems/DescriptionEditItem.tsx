import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";
import useProductBacklog from "../../hooks/useProductBacklog";

interface DescriptionEditItemProps {
  description: string;
  ticketId: string;
}

const DescriptionEditItem = (props: DescriptionEditItemProps): JSX.Element => {
  const { description, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [descriptionInput, setDescriptionInput] = useState<string>(description ?? "");
  const { onUpdateTicket } = useProductBacklog();

  useEffect(() => {
    setDescriptionInput(description);
  }, [isEditModeOn, description]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicket = (): void => {
    onUpdateTicket(ticketId, {
      description: descriptionInput,
    });
    handleToggleEditMode();
  };

  if (!isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' gap={1} width='100%' mb={0.5}>
          <Typography variant='body2'>Notes</Typography>
          <EditButton onStartEdit={handleToggleEditMode} />
        </Box>
        <ListItemText secondary={!description || description === "" ? "None" : description} sx={{ mb: 2 }} />
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' width='100%' mb={0.5} gap={1}>
        <Typography variant='body2'>Notes</Typography>
        <UpdateButton onAccept={handleUpdateTicket} onCancel={handleToggleEditMode} showUpdateButton />
      </Box>
      <TextField
        value={descriptionInput}
        variant='filled'
        fullWidth
        onChange={(e) => setDescriptionInput(e.target.value)}
        margin='dense'
        size='small'
        multiline
        rows={3}
        sx={{ mb: 2 }}
        autoFocus
      />
      <Divider flexItem />
    </ListItem>
  );
};

export default DescriptionEditItem;
