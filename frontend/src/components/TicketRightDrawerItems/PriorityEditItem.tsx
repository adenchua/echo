import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketPriority } from "../../types/Ticket";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import FormPriorityToggleButtons from "../FormPriorityToggleButtons";
import PriorityIcon from "../PriorityIcon";
import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";

interface PriorityEditItemProps {
  ticketId: string;
  priority: TicketPriority;
}

const PriorityEditItem = (props: PriorityEditItemProps): JSX.Element => {
  const { priority, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangePriority = (event: React.MouseEvent<HTMLElement>, newPriority: TicketPriority): void => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    onUpdateTicket(ticketId, { priority: newPriority });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1} gap={1}>
          <Typography variant='body2'>Priority</Typography>
          <UpdateButton onAccept={handleChangePriority} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={2}>
          <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' gap={1} width='100%' mb={1}>
        <Typography variant='body2'>Priority</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Chip
        label={`${capitalizeFirstLetter(priority)} Priority`}
        icon={
          <Box display='flex' alignItems='center'>
            <PriorityIcon priority={priority} />
          </Box>
        }
        sx={{ mb: 2 }}
      />
      <Divider flexItem />
    </ListItem>
  );
};

export default PriorityEditItem;
