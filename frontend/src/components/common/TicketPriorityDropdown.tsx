import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import Select from "./Select";
import PriorityIcon from "../PriorityIcon";

interface TicketPriorityDropdownProps {
  selectedValue: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const TicketPriorityDropdown = (props: TicketPriorityDropdownProps): JSX.Element => {
  const { selectedValue, onChange } = props;

  return (
    <Select value={selectedValue} onChange={onChange}>
      <MenuItem value='low'>
        <PriorityIcon priority='low' />
        <Typography ml={1}>Low</Typography>
      </MenuItem>
      <MenuItem value='medium'>
        <PriorityIcon priority='medium' />
        <Typography ml={1}>Medium</Typography>
      </MenuItem>
      <MenuItem value='high'>
        <PriorityIcon priority='high' />
        <Typography ml={1}>High</Typography>
      </MenuItem>
      <MenuItem value='highest'>
        <PriorityIcon priority='highest' />
        <Typography ml={1}>Urgent</Typography>
      </MenuItem>
    </Select>
  );
};

export default TicketPriorityDropdown;
