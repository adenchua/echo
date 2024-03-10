import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import TicketTypeIcon from "../icons/TicketTypeIcon";
import Select from "./Select";

interface TicketTypeDropdownProps {
  selectedValue: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const TicketTypeDropdown = (props: TicketTypeDropdownProps): JSX.Element => {
  const { selectedValue, onChange } = props;

  return (
    <Select value={selectedValue} onChange={onChange}>
      <MenuItem value='task'>
        <TicketTypeIcon type='task' />
        <Typography ml={1}>Task</Typography>
      </MenuItem>
      <MenuItem value='story'>
        <TicketTypeIcon type='story' />
        <Typography ml={1}>User story</Typography>
      </MenuItem>
      <MenuItem value='bug'>
        <TicketTypeIcon type='bug' />
        <Typography ml={1}>Bug</Typography>
      </MenuItem>
    </Select>
  );
};

export default TicketTypeDropdown;
