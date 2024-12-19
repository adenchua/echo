import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PriorityIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import TimeIcon from "@mui/icons-material/AccessTime";

export type TicketSortType = "priority-dsc" | "creation-asc";

const sortDisplayMapping = {
  "priority-dsc": "Priority",
  "creation-asc": "Creation",
};

export const priorityMap = {
  highest: 3,
  high: 2,
  medium: 1,
  low: 0,
};

interface TicketSortSelectDropdownProps {
  sortSelection: TicketSortType;
  onChangeHandler: (e: SelectChangeEvent) => void;
}

const TicketSortSelectDropdown = (props: TicketSortSelectDropdownProps) => {
  const { sortSelection, onChangeHandler } = props;

  return (
    <Select
      size="small"
      margin="none"
      value={sortSelection}
      onChange={onChangeHandler}
      SelectDisplayProps={{
        style: {
          backgroundColor: "#E0E0E0",
          borderRadius: 100,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      MenuProps={{
        MenuListProps: {
          dense: true,
        },
      }}
      renderValue={(value) => `Sort: ${sortDisplayMapping[value]}`}
    >
      <MenuItem value="priority-dsc">
        <ListItemIcon>
          <PriorityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Priority</ListItemText>
      </MenuItem>
      <MenuItem value="creation-asc">
        <ListItemIcon>
          <TimeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Creation Date</ListItemText>
      </MenuItem>
    </Select>
  );
};

export default TicketSortSelectDropdown;
