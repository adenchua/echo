import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketPriority } from "../../types/Ticket";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import FormPriorityToggleButtons from "../FormPriorityToggleButtons";
import PriorityIcon from "../PriorityIcon";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
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
        <RightDrawerTitle
          title='Priority'
          actionButton={
            <UpdateButton onAccept={handleChangePriority} onCancel={handleToggleEditMode} showSaveButton={false} />
          }
        />
        <Box mb={2}>
          <FormPriorityToggleButtons value={priority} onChangeHandler={handleChangePriority} />
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle title='Priority' actionButton={<EditButton onStartEdit={handleToggleEditMode} />} />
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
