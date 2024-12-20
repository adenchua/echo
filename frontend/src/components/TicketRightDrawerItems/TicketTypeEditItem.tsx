import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketType } from "../../types/Ticket";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import TicketTypeIcon from "../icons/TicketTypeIcon";
import SnackbarError from "../common/SnackbarError";
import TicketTypeDropdown from "../common/TicketTypeDropdown";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface TicketTypeEditItemProps {
  ticketId: string;
  type: TicketType;
}

const TicketTypeEditItem = (props: TicketTypeEditItemProps) => {
  const { type, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangeTicketType = async (newType: TicketType): Promise<void> => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { type: newType });
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
            title="Type"
            actionButton={
              <UpdateButton
                onAccept={undefined}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <TicketTypeDropdown
            label="Select type"
            selectedValue={type}
            onChange={(event) => handleChangeTicketType(event.target.value as TicketType)}
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
        title="Type"
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
      <Chip
        label={`${capitalizeFirstLetter(type)}`}
        icon={
          <Box display="flex" alignItems="center">
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
