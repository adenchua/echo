import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export type TicketSortType = "priority-dsc" | "creation-asc" | "creation-dsc";

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
      size='small'
      value={sortSelection}
      autoWidth
      onChange={onChangeHandler}
      SelectDisplayProps={{
        style: {
          fontSize: 14,
          minWidth: 180,
          color: "grey",
        },
      }}
      sx={{
        borderRadius: 0,
      }}
    >
      <MenuItem value='priority-dsc'>Highest Priority First</MenuItem>
      <MenuItem value='creation-dsc'>Creation Date (Earliest First)</MenuItem>
      <MenuItem value='creation-asc'>Creation Date (Latest First)</MenuItem>
    </Select>
  );
};

export default TicketSortSelectDropdown;
