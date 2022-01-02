import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";
import useProductBacklog from "../../hooks/useProductBacklog";

interface TitleEditItemProps {
  ticketId: string;
  title: string;
}

const TitleEditItem = (props: TitleEditItemProps): JSX.Element => {
  const { title, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(title);
  const { onUpdateTicket } = useProductBacklog();

  useEffect(() => {
    setTitleInput(title);
  }, [isEditModeOn, title]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicket = (): void => {
    onUpdateTicket(ticketId, {
      title: titleInput,
    });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={0.5} gap={2}>
          <Typography variant='body2'>Ticket</Typography>
          <Box flexGrow={1} />
          <UpdateButton onAccept={handleUpdateTicket} onCancel={handleToggleEditMode} showUpdateButton />
        </Box>
        <TextField
          value={titleInput}
          variant='filled'
          fullWidth
          onChange={(e) => setTitleInput(e.target.value)}
          margin='dense'
          size='small'
          multiline
          sx={{ mb: 2 }}
          autoFocus
        />
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={0.5}>
        <Typography variant='body2'>Ticket</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <ListItemText secondary={title} sx={{ mb: 2 }} />
      <Divider flexItem />
    </ListItem>
  );
};

export default TitleEditItem;
