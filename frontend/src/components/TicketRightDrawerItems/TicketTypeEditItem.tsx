import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";
import TicketTypeIcon from "../TicketTypeIcon";
import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketType } from "../../types/TicketInterface";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import FormTicketTypeToggleButtons from "../FormTicketTypeToggleButtons";

interface TicketTypeEditItemProps {
  ticketId: string;
  type: TicketType;
}

const TicketTypeEditItem = (props: TicketTypeEditItemProps): JSX.Element => {
  const { type, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangeTicketType = (event: React.MouseEvent<HTMLElement>, newType: TicketType): void => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    onUpdateTicket(ticketId, { type: newType });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={2} gap={2}>
          <Typography variant='body2'>Type</Typography>
          <Box flexGrow={1} />
          <UpdateButton onAccept={handleChangeTicketType} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={2}>
          <FormTicketTypeToggleButtons value={type} onChangeHandler={handleChangeTicketType} />
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Type</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Chip
        label={`${capitalizeFirstLetter(type)}`}
        size='small'
        icon={
          <Box display='flex' alignItems='center'>
            <TicketTypeIcon type={type} />
          </Box>
        }
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );
};

export default TicketTypeEditItem;
