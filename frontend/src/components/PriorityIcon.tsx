import React from "react";
import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";

import { PriorityType } from "../types/StoryInterface";
import HighestPriorityIcon from "./HighestPriorityIcon";

interface PriorityIconProps {
  priority: PriorityType;
  fontSize?: "medium" | "small" | "inherit" | "large";
}

const PriorityIcon = (props: PriorityIconProps): JSX.Element => {
  const { priority, fontSize = "small" } = props;

  switch (priority) {
    case "low":
      return <LowPriorityIcon fontSize={fontSize} color='success' />;
    case "medium":
      return <MediumPriorityIcon fontSize={fontSize} color='warning' />;
    case "high":
      return <HighPriorityIcon fontSize={fontSize} color='error' />;
    case "highest":
      return <HighestPriorityIcon fontSize={fontSize} color='error' />;
    default:
      return <div />;
  }
};

export default PriorityIcon;
