import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";

import fetchUsersByIds from "../../api/users/fetchUsersByIds";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import useLoad from "../../hooks/useLoad";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import useProductBacklog from "../../hooks/useProductBacklog";
import User from "../../types/User";
import { LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import { sliceLongString } from "../../utils/sliceLongString";
import Select from "../common/Select";
import SnackbarError from "../common/SnackbarError";
import UserAvatar from "../common/UserAvatar";
import EditButton from "./EditButton";
import RightDrawerTitle from "./RightDrawerTitle";
import UpdateButton from "./UpdateButton";

interface AssigneeEditItemProps {
  ticketId: string;
  assigneeId: string;
}

const AssigneeEditItem = (props: AssigneeEditItemProps): JSX.Element => {
  const { assigneeId, ticketId } = props;
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [assignee, setAssignee] = useState<User | null>(null);

  const { onUpdateTicket } = useProductBacklog();
  const { members, admins } = useContext(ProjectMembersContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

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

  const handleUpdateTicketAssignee = async (newAssigneeId: string): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await onUpdateTicket(ticketId, { assigneeId: newAssigneeId ? newAssigneeId : null }); // if no assignee, newAssigneeId will be empty string
      handleSetLoadingState("SUCCESS");
      handleToggleEditMode();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
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
      />
    );
  };

  if (isEditModeOn) {
    return (
      <>
        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <RightDrawerTitle
            title='Assignee'
            actionButton={
              <UpdateButton
                onAccept={handleUpdateTicketAssignee}
                onCancel={handleToggleEditMode}
                showSaveButton={false}
              />
            }
          />
          <Box mb={2} width='100%'>
            <Select
              onChange={(e) => handleUpdateTicketAssignee(e.target.value as string)}
              value={assigneeId ? assigneeId : ""}
            >
              {[...admins, ...members].map((user) => {
                const { displayName, _id: userId, username } = user;
                return (
                  <MenuItem key={userId} value={userId}>
                    <ListItemAvatar>
                      <UserAvatar username={username} displayName={displayName} />
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
        <SnackbarError isOpen={currentLoadState === "ERROR"} onClose={() => handleSetLoadingState("DEFAULT")} />
      </>
    );
  }

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <RightDrawerTitle title='Assignee' actionButton={<EditButton onStartEdit={handleToggleEditMode} />} />
      <Box mb={2}>{renderAssigneeChip()}</Box>
      <Divider flexItem />
    </ListItem>
  );
};

export default AssigneeEditItem;
