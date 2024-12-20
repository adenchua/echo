import Chip from "@mui/material/Chip";
import { JSX } from "react";

import { StoryPoints } from "../types/Ticket";
import Tooltip from "./common/Tooltip";

interface StoryPointsChipProps {
  storyPoints: StoryPoints;
}

const StoryPointsChip = (props: StoryPointsChipProps): JSX.Element => {
  const { storyPoints } = props;

  return (
    <Tooltip title="Story points">
      <Chip
        size="small"
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
