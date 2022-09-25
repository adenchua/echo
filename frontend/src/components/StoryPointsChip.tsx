import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import { StoryPoints } from "../types/Ticket";

interface StoryPointsChipProps {
  storyPoints: StoryPoints;
}

const StoryPointsChip = (props: StoryPointsChipProps): JSX.Element => {
  const { storyPoints } = props;

  return (
    <Tooltip disableInteractive title='Story points'>
      <Chip
        size='small'
        label={storyPoints}
        sx={{
          "& .MuiChip-label": {
            fontSize: 12,
          },
        }}
      />
    </Tooltip>
  );
};

export default StoryPointsChip;
