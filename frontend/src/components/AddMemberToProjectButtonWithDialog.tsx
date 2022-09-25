import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import User from "../types/User";
import fetchAllUsers from "../api/users/fetchAllUsers";
import { ListItemAvatar } from "@mui/material";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import { matchString } from "../utils/matchString";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import addMembersToProject from "../api/projects/addMembersToProject";

interface AddMemberToProjectButtonWithDialogProps {
  projectId: string;
}

const AddMemberToProjectButtonWithDialog = (props: AddMemberToProjectButtonWithDialogProps): JSX.Element => {
  const { projectId } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [availableMembers, setAvailableMembers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { handleAddMembers, members, admins } = useContext(ProjectMembersContext);

  useEffect(() => {
    let isComponentMounted = true;
    const getUsers = async () => {
      const currentMemberIdsInProject = [...admins, ...members].map((member) => member._id);
      const response = await fetchAllUsers();
      const filteredMembers = response.filter((member) => !currentMemberIdsInProject.includes(member._id));
      if (isComponentMounted) {
        setAvailableMembers(filteredMembers);
      }
    };

    getUsers();

    return () => {
      isComponentMounted = false;
    };
  }, [admins, members]);

  const handleCloseDialog = (): void => {
    setSelectedMembers([]);
    setSearchInput("");
    setIsDialogOpen(false);
  };

  const handleToggleSelectedMember = (user: User): void => {
    if (selectedMembers.includes(user)) {
      setSelectedMembers((prevState) => prevState.filter((member) => member._id !== user._id));
    } else {
      setSelectedMembers((prevState) => [...prevState, user]);
    }
  };

  const handleAddUsers = async (): Promise<void> => {
    setShowError(false);
    setIsLoading(true);
    try {
      const memberIds = selectedMembers.map((member) => member._id);
      await addMembersToProject(projectId, memberIds);
      handleAddMembers(selectedMembers);
      setSelectedMembers([]);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMemberListItem = (user: User): JSX.Element => {
    const { _id: userId, displayName, username } = user;
    return (
      <ListItem key={userId} disablePadding disableGutters>
        <ListItemButton
          role={undefined}
          dense
          onClick={() => handleToggleSelectedMember(user)}
          selected={selectedMembers.includes(user)}
        >
          <Checkbox edge='start' checked={selectedMembers.includes(user)} size='small' />
          <ListItemAvatar>
            <Avatar src={getUserAvatarSVG(username)} />
          </ListItemAvatar>
          <ListItemText primary={displayName} secondary={`@${username}`} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderSelectedMemberChips = (user: User): JSX.Element => {
    const { _id: userId, displayName, username } = user;
    return (
      <Chip
        key={userId}
        avatar={<Avatar src={getUserAvatarSVG(username)} />}
        label={displayName}
        onDelete={() => handleToggleSelectedMember(user)}
        size='small'
      />
    );
  };

  return (
    <>
      <Button startIcon={<AddIcon fontSize='small' />} size='small' onClick={() => setIsDialogOpen(true)}>
        Add Member
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle
          sx={{
            borderTop: "8px solid",
            borderColor: "primary.light",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar variant='rounded' sx={{ bgcolor: "primary.main" }}>
            <ManageAccountsIcon />
          </Avatar>
          Team Members
        </DialogTitle>
        <DialogContent>
          <Box display='flex' gap={1} flexWrap='wrap'>
            {selectedMembers.map((member) => renderSelectedMemberChips(member))}
          </Box>
          <TextField
            fullWidth
            size='small'
            margin='normal'
            placeholder='Search members...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: 0,
              },
            }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </DialogContent>
        <DialogContent dividers sx={{ maxHeight: 300 }}>
          {showError && (
            <Typography color='error' variant='caption'>
              Something went wrong. Please try again later.
            </Typography>
          )}
          <List dense disablePadding>
            {availableMembers && availableMembers.length === 0 && (
              <Typography variant='body2' fontStyle='italic' color='GrayText'>
                No available members to add to the project.
              </Typography>
            )}
            {availableMembers?.map((member: User) => {
              if (matchString(searchInput, member.username) || matchString(searchInput, member.displayName)) {
                return renderMemberListItem(member);
              }
              return null;
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey.600", borderColor: "grey.600" }} disabled={isLoading} onClick={handleCloseDialog}>
            Close
          </Button>
          <Button disabled={selectedMembers.length === 0 || isLoading} onClick={handleAddUsers}>
            {isLoading ? "Adding..." : "Add Members"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMemberToProjectButtonWithDialog;
