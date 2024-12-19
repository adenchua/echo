import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";

import addMembersToProject from "../api/projects/addMembersToProject";
import fetchAllUsers from "../api/users/fetchAllUsers";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import useLoad from "../hooks/useLoad";
import User from "../types/User";
import getUserAvatarSVG from "../utils/getUserAvatarSVG";
import { matchString } from "../utils/stringUtils";
import ActionDialog from "./common/ActionDialog";
import CTAButton from "./common/CTAButton";
import DialogErrorText from "./common/DialogErrorText";
import SearchBar from "./common/SearchBar";
import SnackbarSuccess from "./common/SnackbarSuccess";
import UserAvatar from "./common/UserAvatar";

interface AddMemberToProjectButtonWithDialogProps {
  projectId: string;
}

const AddMemberToProjectButtonWithDialog = (props: AddMemberToProjectButtonWithDialogProps) => {
  const { projectId } = props;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [availableMembers, setAvailableMembers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [searchInput, setSearchInput] = useState<string>("");
  const { handleAddMembers, members, admins } = useContext(ProjectMembersContext);

  useEffect(() => {
    let isComponentMounted = true;
    const getUsers = async () => {
      handleSetLoadingState("LOADING");
      try {
        const currentMemberIdsInProject = [...admins, ...members].map((member) => member._id);
        const response = await fetchAllUsers();
        const filteredMembers = response.filter(
          (member) => !currentMemberIdsInProject.includes(member._id),
        );
        if (isComponentMounted) {
          setAvailableMembers(filteredMembers);
        }
        handleSetLoadingState("DEFAULT");
      } catch (error) {
        handleSetLoadingState("ERROR");
      }
    };

    if (isDialogOpen) {
      getUsers();
    }

    return () => {
      isComponentMounted = false;
    };
  }, [isDialogOpen, admins, members, handleSetLoadingState]);

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
    handleSetLoadingState("LOADING");
    try {
      const memberIds = selectedMembers.map((member) => member._id);
      await addMembersToProject(projectId, memberIds);
      handleAddMembers(selectedMembers);
      handleSetLoadingState("SUCCESS");
      handleCloseDialog();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <>
      <CTAButton icon={<AddIcon />} onClick={() => setIsDialogOpen(true)} text="Add Member" />
      <ActionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAccept={handleAddUsers}
        title="Add team members"
        titleIcon={<ManageAccountsIcon />}
        disableActionButton={selectedMembers.length === 0 || currentLoadState !== "DEFAULT"}
        dialogContent={
          <>
            {currentLoadState === "ERROR" && (
              <DialogErrorText text="Sorry, something went wrong. Please try again later" />
            )}
            {currentLoadState !== "ERROR" && (
              <>
                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                  {selectedMembers.map((member) => (
                    <Chip
                      key={member._id}
                      avatar={<Avatar src={getUserAvatarSVG(member.username)} />}
                      label={member.displayName}
                      onDelete={() => handleToggleSelectedMember(member)}
                    />
                  ))}
                </Box>
                <SearchBar
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  fullWidth
                  placeholder="Search members"
                />
                <List dense disablePadding>
                  {availableMembers && availableMembers.length === 0 && (
                    <Typography variant="body2" fontStyle="italic" color="GrayText" mt={2}>
                      No available members to add to the project
                    </Typography>
                  )}
                  <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
                    {availableMembers?.map((member: User) => {
                      if (
                        matchString(searchInput, member.username) ||
                        matchString(searchInput, member.displayName)
                      ) {
                        return (
                          <ListItem key={member._id} disablePadding disableGutters>
                            <ListItemButton
                              role={undefined}
                              dense
                              onClick={() => handleToggleSelectedMember(member)}
                              selected={selectedMembers.includes(member)}
                            >
                              <Checkbox
                                edge="start"
                                checked={selectedMembers.includes(member)}
                                size="small"
                              />
                              <ListItemAvatar>
                                <UserAvatar
                                  username={member.username}
                                  displayName={member.displayName}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={member.displayName}
                                secondary={`@${member.username}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      }
                      return null;
                    })}
                  </List>
                </List>
              </>
            )}
          </>
        }
      />
      <SnackbarSuccess
        onClose={() => handleSetLoadingState("DEFAULT")}
        isOpen={currentLoadState === "SUCCESS"}
        message="Successfully added selected members to the project"
      />
    </>
  );
};

export default AddMemberToProjectButtonWithDialog;
