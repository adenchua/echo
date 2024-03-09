import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import { TicketType } from "../../types/Ticket";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import FormTicketTypeToggleButtons from "../FormTicketTypeToggleButtons";
import TicketTypeIcon from "../TicketTypeIcon";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface TicketTypeEditItemProps {
  ticketId: string;
  type: TicketType;
}

const TicketTypeEditItem = (props: TicketTypeEditItemProps): JSX.Element => {
  const { type, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangeTicketType = async (event: React.MouseEvent<HTMLElement>, newType: TicketType): Promise<void> => {
    if (!newType) {
      return; // prevent deselecting a button
    }
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { type: newType });
      handleSetLoadingState("SUCCESS");
      handleToggleEditMode();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title='Type'
            actionButton={
              <UpdateButton onAccept={handleChangeTicketType} onCancel={handleToggleEditMode} showSaveButton={false} />
            }
          />
          <Box mb={2}>
            <FormTicketTypeToggleButtons value={type} onChangeHandler={handleChangeTicketType} />
          </Box>
          <Divider flexItem />
        </ListItem>
        <SnackbarError isOpen={currentLoadState === "ERROR"} onClose={() => handleSetLoadingState("DEFAULT")} />
      </>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle title='Type' actionButton={<EditButton onStartEdit={handleToggleEditMode} />} />
      <Chip
        label={`${capitalizeFirstLetter(type)}`}
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
