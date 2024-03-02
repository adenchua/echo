import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

import useProductBacklog from "../../hooks/useProductBacklog";
import { StoryPoints } from "../../types/Ticket";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

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
        <RightDrawerTitle
          title='Estimated story points'
          actionButton={
            <UpdateButton onAccept={handleChangeStoryPoints} onCancel={handleToggleEditMode} showSaveButton={false} />
          }
        />
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
      <RightDrawerTitle
        title='Estimated story points'
        actionButton={<EditButton onStartEdit={handleToggleEditMode} />}
      />
      <Box mb={2}>
        <Chip label={storyPoints} />
      </Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default StoryPointsEditItem;
