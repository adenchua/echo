import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import EditButton from "./EditButton";
import UpdateButton from "./UpdateButton";
import useProductBacklog from "../../hooks/useProductBacklog";
import { StoryPoints } from "../../types/Ticket";

interface StoryPointsEditItemProps {
  ticketId: string;
  storyPoints: StoryPoints;
}

const StoryPointsEditItem = (props: StoryPointsEditItemProps): JSX.Element => {
  const { storyPoints, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { onUpdateTicket } = useProductBacklog();

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleChangeStoryPoints = (newStoryPoints: StoryPoints): void => {
    onUpdateTicket(ticketId, { storyPoints: newStoryPoints });
    handleToggleEditMode();
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1} gap={1}>
          <Typography variant='body2'>Story Points</Typography>
          <UpdateButton onAccept={handleChangeStoryPoints} onCancel={handleToggleEditMode} showUpdateButton={false} />
        </Box>
        <Box mb={2} display='flex' gap={1}>
          {[0, 1, 2, 3, 5, 8, 13, 20].map((point) => (
            <Chip
              key={point}
              label={point}
              clickable
              sx={{
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "#FFF",
                  transition: "ease-in",
                },
              }}
              onClick={() => handleChangeStoryPoints(point as StoryPoints)}
            />
          ))}
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' gap={1} width='100%' mb={1}>
        <Typography variant='body2'>Story Points</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Box mb={2}>
        <Chip label={storyPoints} size='small' />
      </Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default StoryPointsEditItem;
