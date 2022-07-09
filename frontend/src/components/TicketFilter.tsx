import React, { useContext, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/PersonOutline";
import RuleIcon from "@mui/icons-material/RuleOutlined";
import CloseIcon from "@mui/icons-material/RestartAltOutlined";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { StatusType } from "../types/Ticket";
import StatusChipButton from "./StatusChipButton";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import { sliceLongString } from "../utils/sliceLongString";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type TicketFilterType = null | `assignee-${string}` | `not_status-${StatusType}` | `status-${StatusType}`;

const statusToTextMapping: Record<StatusType, string> = {
  todo: "To Do",
  progress: "In Progress",
  review: "To Review",
  completed: "Done",
  stuck: "Stuck",
  hold: "Hold",
};

interface TicketFilterProps {
  onSelectHandler: (newFilter: TicketFilterType) => void;
}

interface FilterSelectWrapperProps {
  children: React.ReactNode;
  label: string;
}

const FilterSelectWrapper = (props: FilterSelectWrapperProps): JSX.Element => {
  const { children, label } = props;

  return (
    <MenuItem sx={{ mb: 1 }}>
      <FormControl sx={{ width: "100%" }} size='small'>
        <InputLabel sx={{ fontSize: 12 }}>{label}</InputLabel>
        {children}
      </FormControl>
    </MenuItem>
  );
};

const TicketFilter = (props: TicketFilterProps): JSX.Element => {
  const { onSelectHandler } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filterText, setFilterText] = useState<string>("");
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const { members, admins } = useContext(ProjectMembersContext);

  const open = Boolean(anchorEl);
  const id = open ? "popover-open" : undefined;

  const getUserDisplayName = useCallback(
    (userId: string): string => {
      const [matchedUser] = [...members, ...admins].filter((user) => user._id === userId);

      if (matchedUser) {
        return sliceLongString(matchedUser.displayName, 32);
      }

      return "Invalid User";
    },
    [members, admins]
  );

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
        <Button
          aria-describedby={id}
          size='small'
          color='primary'
          variant='contained'
          onClick={handleClick}
          sx={{ whiteSpace: "nowrap" }}
        >
          Filters: {filterText}
        </Button>
      )}
      {!filterText && (
        <Button
          aria-describedby={id}
          size='small'
          color='inherit'
          onClick={handleClick}
          sx={{ color: "#9e9e9e", whiteSpace: "nowrap" }}
        >
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

          <FilterSelectWrapper label='Status'>
            <Select
              label='Status'
              defaultValue=''
              onChange={(e: SelectChangeEvent) =>
                handleSelectNewFilter(
                  `status-${e.target.value as StatusType}`,
                  statusToTextMapping[e.target.value as StatusType]
                )
              }
              SelectDisplayProps={{
                style: {
                  padding: "6px 8px",
                  background: "#00000014",
                },
              }}
            >
              {["todo", "progress", "review", "completed", "stuck", "hold"].map((ticketStatus) => (
                <MenuItem key={ticketStatus} value={ticketStatus} sx={{ display: "flex", justifyContent: "center" }}>
                  <StatusChipButton status={ticketStatus as StatusType} size='small' />
                </MenuItem>
              ))}
            </Select>
          </FilterSelectWrapper>

          <FilterSelectWrapper label='Assignee'>
            <Select
              defaultValue=''
              label='Assignee'
              onChange={(e: SelectChangeEvent) =>
                handleSelectNewFilter(`assignee-${e.target.value}`, getUserDisplayName(e.target.value))
              }
              SelectDisplayProps={{
                style: {
                  padding: "6px 8px",
                  background: "#00000014",
                },
              }}
            >
              {[...admins, ...members].map((user) => {
                const { displayName, _id: userId, username } = user;
                return (
                  <MenuItem key={userId} value={userId} dense>
                    <ListItemAvatar>
                      <Avatar sx={{ height: 24, width: 24 }} src={getUserAvatarSVG(username)} />
                    </ListItemAvatar>
                    <ListItemText>{displayName}</ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </FilterSelectWrapper>

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
