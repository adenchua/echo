import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { JSX, useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketPriority } from "../../types/Ticket";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import PriorityIcon from "../icons/PriorityIcon";
import SnackbarError from "../common/SnackbarError";
import TicketPriorityDropdown from "../common/TicketPriorityDropdown";
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
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangePriority = async (newPriority: TicketPriority): Promise<void> => {
    if (!newPriority) {
      return; // prevent deselecting a button
    }
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { priority: newPriority });
      handleSetLoadingState("SUCCESS");
      handleToggleEditMode();
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title="Priority"
            actionButton={
              <UpdateButton
                onAccept={undefined}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <TicketPriorityDropdown
            label="Select priority"
            selectedValue={priority}
            onChange={(event) => handleChangePriority(event.target.value as TicketPriority)}
          />
          <Divider flexItem sx={{ mt: 2 }} />
        </ListItem>
        <SnackbarError
          isOpen={currentLoadState === "ERROR"}
          onClose={() => handleSetLoadingState("DEFAULT")}
        />
      </>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle
        title="Priority"
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
      <Chip
        label={`${capitalizeFirstLetter(priority)} Priority`}
        icon={
          <Box display="flex" alignItems="center">
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
