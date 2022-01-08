import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { StatusType } from "../types/TicketInterface";

interface FormTicketStatusToggleButtonProps {
  value: StatusType;
  onChangeHandler: any;
}

const FormTicketStatusToggleButton = (props: FormTicketStatusToggleButtonProps): JSX.Element => {
  const { value, onChangeHandler } = props;

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChangeHandler} size='small'>
      <ToggleButton value={"todo"} sx={{ textTransform: "none" }}>
        To Do
      </ToggleButton>
      <ToggleButton value={"progress"} color='warning' sx={{ textTransform: "none" }}>
        In Progress
      </ToggleButton>
      <ToggleButton value={"review"} color='secondary' sx={{ textTransform: "none" }}>
        Review
      </ToggleButton>
      <ToggleButton value={"completed"} color='success' sx={{ textTransform: "none" }}>
        Done
      </ToggleButton>
      <ToggleButton value={"stuck"} color='error' sx={{ textTransform: "none" }}>
        Stuck
      </ToggleButton>
      <ToggleButton value={"hold"} sx={{ textTransform: "none" }}>
        Hold
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FormTicketStatusToggleButton;
