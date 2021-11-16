import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";

import { PriorityType } from "../types/StoryInterface";
import HighestPriorityIcon from "./HighestPriorityIcon";

interface FormPriorityToggleButtonsProps {
  value: PriorityType;
  onChangeHandler: any;
}

const FormPriorityToggleButtons = (props: FormPriorityToggleButtonsProps): JSX.Element => {
  const { value, onChangeHandler } = props;

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChangeHandler} size='small'>
      <ToggleButton value={"low"} color='success'>
        <Tooltip title={"Low"} disableInteractive>
          <LowPriorityIcon fontSize='small' />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={"medium"} color='warning'>
        <Tooltip title={"Medium"} disableInteractive>
          <MediumPriorityIcon fontSize='small' />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={"high"} color='error'>
        <Tooltip title={"High"} disableInteractive>
          <HighPriorityIcon fontSize='small' />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={"highest"} color='error'>
        <Tooltip title={"Highest"} disableInteractive>
          <div>
            <HighestPriorityIcon />
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormPriorityToggleButtons;
