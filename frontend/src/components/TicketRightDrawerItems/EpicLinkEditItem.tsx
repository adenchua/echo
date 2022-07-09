import React, { useState, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import EditButton from "./EditButton";
import useProductBacklog from "../../hooks/useProductBacklog";
import { EpicsContext } from "../../contexts/EpicsContextProvider";
import UpdateButton from "./UpdateButton";

interface EpicLinkEditItemProps {
  ticketId: string;
  epicId: string;
}

const EpicLinkEditItem = (props: EpicLinkEditItemProps): JSX.Element => {
  const { epicId, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onAddTicketToEpic, onRemoveTicketFromEpic } = useProductBacklog();
  const { epics } = useContext(EpicsContext);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketEpicLink = (newEpicLinkId: string): void => {
    onAddTicketToEpic(ticketId, newEpicLinkId);
    handleToggleEditMode();
  };

  const handleDeleteTicketEpicLink = (): void => {
    onRemoveTicketFromEpic(ticketId, epicId);
    handleToggleEditMode();
  };

  const renderEpicTypography = (): JSX.Element => {
    if (!epicId) {
      return (
        <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
          None
        </Typography>
      );
    }

    const epicToDisplay = epics.find((epic) => epic._id === epicId);

    if (!epicToDisplay) {
      return (
        <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
          Invalid Objective
        </Typography>
      );
    }

    return (
      <Typography variant='body2' color='textSecondary' maxWidth='100%' noWrap sx={{ mb: 2 }}>
        {epicToDisplay.title}
      </Typography>
    );
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1} gap={1}>
          <Typography variant='body2'>Objectives Link</Typography>
          <UpdateButton
            onAccept={handleUpdateTicketEpicLink}
            onCancel={handleToggleEditMode}
            showUpdateButton={false}
          />
        </Box>
        <Box mb={2} width='100%'>
          <Select
            size='small'
            fullWidth
            value={epicId ? epicId : ""}
            onChange={(e: SelectChangeEvent) => {
              handleUpdateTicketEpicLink(e.target.value);
            }}
            SelectDisplayProps={{
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 8px",
                margin: 0,
                background: "#00000014",
              },
            }}
          >
            {epics?.map((epic) => (
              <MenuItem key={epic._id} value={epic._id} dense sx={{ display: "flex", justifyContent: "center" }}>
                <Typography fontSize={14} maxWidth='80%' noWrap>
                  {epic.title}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          {epicId && (
            <Button
              fullWidth
              color='warning'
              variant='outlined'
              size='small'
              sx={{ mt: 2 }}
              onClick={() => handleDeleteTicketEpicLink()}
            >
              Remove Link
            </Button>
          )}
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' gap={1} width='100%' mb={1}>
        <Typography variant='body2'>Objectives Link</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      {renderEpicTypography()}
      <Divider flexItem />
    </ListItem>
  );
};

export default EpicLinkEditItem;
