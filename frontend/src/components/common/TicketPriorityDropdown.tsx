import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { JSX } from "react";

import PriorityIcon from "../icons/PriorityIcon";
import Select from "./Select";

interface TicketPriorityDropdownProps {
  label: string;
  selectedValue: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const TicketPriorityDropdown = (props: TicketPriorityDropdownProps): JSX.Element => {
  const { selectedValue, onChange, label } = props;

  return (
    <Select value={selectedValue} onChange={onChange} label={label}>
      <MenuItem value="low">
        <PriorityIcon priority="low" />
        <Typography ml={1}>Low</Typography>
      </MenuItem>
      <MenuItem value="medium">
        <PriorityIcon priority="medium" />
        <Typography ml={1}>Medium</Typography>
      </MenuItem>
      <MenuItem value="high">
        <PriorityIcon priority="high" />
        <Typography ml={1}>High</Typography>
      </MenuItem>
      <MenuItem value="highest">
        <PriorityIcon priority="highest" />
        <Typography ml={1}>Urgent</Typography>
      </MenuItem>
    </Select>
  );
};

export default TicketPriorityDropdown;
