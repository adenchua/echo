import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";

import { EpicsContext } from "../../contexts/EpicsContextProvider";
import useLoad from "../../hooks/useLoad";
import useProductBacklog from "../../hooks/useProductBacklog";
import Button from "../common/Button";
import Select from "../common/Select";
import SnackbarError from "../common/SnackbarError";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface EpicLinkEditItemProps {
  ticketId: string;
  epicId: string;
}

const EpicLinkEditItem = (props: EpicLinkEditItemProps) => {
  const { epicId, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onAddTicketToEpic, onRemoveTicketFromEpic } = useProductBacklog();
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { epics } = useContext(EpicsContext);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketEpicLink = async (newEpicLinkId: string): Promise<void> => {
    try {
      await onAddTicketToEpic(ticketId, newEpicLinkId);
      handleToggleEditMode();
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  const handleDeleteTicketEpicLink = async (): Promise<void> => {
    try {
      await onRemoveTicketFromEpic(ticketId, epicId);
      handleToggleEditMode();
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  const renderEpicTypography = () => {
    if (!epicId) {
      return (
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          None
        </Typography>
      );
    }

    const epicToDisplay = epics.find((epic) => epic._id === epicId);

    if (!epicToDisplay) {
      return (
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          Invalid Epic
        </Typography>
      );
    }

    return (
      <Typography color="textSecondary" maxWidth="100%" noWrap sx={{ mb: 2 }}>
        {epicToDisplay.title}
      </Typography>
    );
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title="Epic"
            actionButton={
              <UpdateButton
                onAccept={undefined}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <Box mb={2} width="100%">
            <Select
              label="Select epic"
              value={epicId ? epicId : ""}
              onChange={(e) => {
                handleUpdateTicketEpicLink(e.target.value as string);
              }}
            >
              {epics?.map((epic) => (
                <MenuItem key={epic._id} value={epic._id}>
                  <Typography noWrap>{epic.title}</Typography>
                </MenuItem>
              ))}
            </Select>
            {epicId && (
              <Button fullWidth sx={{ mt: 2 }} onClick={() => handleDeleteTicketEpicLink()}>
                Remove Link
              </Button>
            )}
          </Box>
          <Divider flexItem />
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
        title="Epic"
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
      {renderEpicTypography()}
      <Divider flexItem />
    </ListItem>
  );
};

export default EpicLinkEditItem;
