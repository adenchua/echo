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

const TicketSortSelectDropdown = (props: TicketSortSelectDropdownProps): JSX.Element => {
  const { sortSelection, onChangeHandler } = props;

  return (
    <Select
      size="small"
      margin="none"
      value={sortSelection}
      onChange={onChangeHandler}
      SelectDisplayProps={{
        style: {
          fontSize: 14,
          color: "#9e9e9e",
        },
      }}
      sx={{
        borderRadius: 0,
        "& .MuiSelect-select": {
          padding: "3px 6px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-iconOutlined": {
          color: "#9e9e9e",
        },
      }}
      MenuProps={{
        PaperProps: {
          elevation: 2,
        },
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
