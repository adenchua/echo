import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/PersonOutline";
import RuleIcon from "@mui/icons-material/RuleOutlined";
import CloseIcon from "@mui/icons-material/RestartAltOutlined";
import Divider from "@mui/material/Divider";

import { StatusType } from "../types/TicketInterface";
import { UserAuthenticationContext } from "../contexts/UserAuthenticationContextProvider";

export type TicketFilterType = null | `assignee-${string}` | `not_status-${StatusType}`;

interface TicketFilterProps {
  onSelectHandler: (newFilter: TicketFilterType) => void;
}

const TicketFilter = (props: TicketFilterProps): JSX.Element => {
  const { onSelectHandler } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filterText, setFilterText] = useState<string>("");
  const { loggedInUserId } = useContext(UserAuthenticationContext);

  const open = Boolean(anchorEl);
  const id = open ? "popover-open" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectNewFilter = (newFilter: TicketFilterType, newFilterText: string): void => {
    onSelectHandler(newFilter);
    setFilterText(newFilterText);
    handleClose();
  };

  return (
    <div>
      {filterText && (
        <Button aria-describedby={id} size='small' color='primary' variant='contained' onClick={handleClick}>
          Filters: {filterText}
        </Button>
      )}
      {!filterText && (
        <Button aria-describedby={id} size='small' color='inherit' onClick={handleClick} sx={{ color: "#9e9e9e" }}>
          Filters: None
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 2,
        }}
      >
        <MenuList dense>
          <MenuItem onClick={() => handleSelectNewFilter(`assignee-${loggedInUserId ?? ""}`, "My tickets")}>
            <ListItemIcon>
              <PersonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>My assigned tickets</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleSelectNewFilter("not_status-completed", "Not done")}>
            <ListItemIcon>
              <RuleIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Not Done</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleSelectNewFilter(null, "")}>
            <ListItemIcon>
              <CloseIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Remove Filters</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};

export default TicketFilter;
