import React, { useState, useContext, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import EditButton from "./EditButton";
import useProductBacklog from "../../hooks/useProductBacklog";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import { UserAuthenticationContext } from "../../contexts/UserAuthenticationContextProvider";
import UserInterface from "../../types/UserInterface";
import UpdateButton from "./UpdateButton";
import fetchUsersByIds from "../../api/users/fetchUsersByIds";
import { sliceLongString } from "../../utils/sliceLongString";

interface AssigneeEditItemProps {
  ticketId: string;
  assigneeId: string;
}

const AssigneeEditItem = (props: AssigneeEditItemProps): JSX.Element => {
  const { assigneeId, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const [assignee, setAssignee] = useState<UserInterface | null>(null);

  const { onUpdateTicket } = useProductBacklog();
  const { members, admins } = useContext(ProjectMembersContext);
  const { loggedInUserId } = useContext(UserAuthenticationContext);

  useEffect(() => {
    let isMounted = true;

    const getAssigneeDetails = async () => {
      if (!assigneeId) {
        setAssignee(null);
        return;
      }
      const [response] = await fetchUsersByIds([assigneeId]);
      if (isMounted) {
        setAssignee(response);
      }
    };

    getAssigneeDetails();

    return () => {
      isMounted = false;
    };
  }, [assigneeId]);

  const handleToggleEditMode = (): void => {
    setIsEditModeOn(!isEditModeOn);
  };

  const handleUpdateTicketAssignee = (newAssigneeId: string): void => {
    onUpdateTicket(ticketId, { assigneeId: newAssigneeId ? newAssigneeId : null }); // if no assignee, newAssigneeId will be empty string
    handleToggleEditMode();
  };

  const renderAssigneeChip = (): JSX.Element => {
    if (!assignee) {
      return <ListItemText secondary='None' />;
    }
    const { _id: userId, username, displayName } = assignee;
    return (
      <Chip
        key={userId}
        avatar={<Avatar src={getUserAvatarSVG(username)} />}
        label={sliceLongString(displayName, 24)}
        size='small'
      />
    );
  };

  if (isEditModeOn) {
    return (
      <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box display='flex' width='100%' mb={1.5} gap={2}>
          <Typography variant='body2'>Assignee</Typography>
          <Box flexGrow={1} />
          <UpdateButton
            onAccept={handleUpdateTicketAssignee}
            onCancel={handleToggleEditMode}
            showUpdateButton={false}
          />
        </Box>
        <Box mb={2} width='100%'>
          <Select
            size='small'
            onChange={(e: SelectChangeEvent) => handleUpdateTicketAssignee(e.target.value)}
            value={assigneeId ? assigneeId : ""}
            fullWidth
            SelectDisplayProps={{
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "0px 8px",
                margin: 0,
                background: "#00000014",
                height: 32,
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
          <Button
            fullWidth
            variant='outlined'
            size='small'
            sx={{ mt: 2 }}
            onClick={() => {
              if (loggedInUserId) {
                handleUpdateTicketAssignee(loggedInUserId);
              }
            }}
          >
            Assign Myself
          </Button>
          {assigneeId && (
            <Button
              fullWidth
              color='warning'
              variant='outlined'
              size='small'
              sx={{ mt: 2 }}
              onClick={() => handleUpdateTicketAssignee("")}
            >
              Remove Assignee
            </Button>
          )}
        </Box>
        <Divider flexItem />
      </ListItem>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Box display='flex' justifyContent='space-between' width='100%' mb={1}>
        <Typography variant='body2'>Assignee</Typography>
        <EditButton onStartEdit={handleToggleEditMode} />
      </Box>
      <Box mb={2}>{renderAssigneeChip()}</Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default AssigneeEditItem;
