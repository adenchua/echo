import React from "react";
import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";

import { PriorityType } from "../types/StoryInterface";
import HighestPriorityIcon from "./HighestPriorityIcon";

interface PriorityIconProps {
  priority: PriorityType;
}

const PriorityIcon = (props: PriorityIconProps): JSX.Element => {
  const { priority } = props;

  switch (priority) {
    case "low":
      return <LowPriorityIcon fontSize='small' color='success' />;
    case "medium":
      return <MediumPriorityIcon fontSize='small' color='warning' />;
    case "high":
      return <HighPriorityIcon fontSize='small' color='error' />;
    case "highest":
      return <HighestPriorityIcon color='error' />;
    default:
      return <div />;
  }
};

export default PriorityIcon;
