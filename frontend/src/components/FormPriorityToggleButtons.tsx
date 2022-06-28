import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import LowPriorityIcon from "@mui/icons-material/KeyboardArrowDown";
import MediumPriorityIcon from "@mui/icons-material/Remove";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";

import { PriorityType } from "../types/TicketInterface";
import HighestPriorityIcon from "./HighestPriorityIcon";

interface FormPriorityToggleButtonsProps {
  value: PriorityType;
  onChangeHandler: any;
}

const FormPriorityToggleButtons = (props: FormPriorityToggleButtonsProps): JSX.Element => {
  const { value, onChangeHandler } = props;

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChangeHandler} size='small'>
      <ToggleButton value={"low"} color='success' sx={{ textTransform: "none" }}>
        <LowPriorityIcon fontSize='small' />
        Low
      </ToggleButton>
      <ToggleButton value={"medium"} color='warning' sx={{ textTransform: "none" }}>
        <MediumPriorityIcon fontSize='small' />
        Medium
      </ToggleButton>
      <ToggleButton value={"high"} color='error' sx={{ textTransform: "none" }}>
        <HighPriorityIcon fontSize='small' />
        High
      </ToggleButton>
      <ToggleButton value={"highest"} color='error' sx={{ textTransform: "none" }}>
        <HighestPriorityIcon />
        Urgent
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormPriorityToggleButtons;
