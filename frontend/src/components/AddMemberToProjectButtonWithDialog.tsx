import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { JSX, useContext, useMemo, useState } from "react";

import addMembersToProject from "../api/projects/addMembersToProject";
import fetchUsers from "../api/users/fetchUsers";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import useLoad from "../hooks/useLoad";
import User from "../types/User";
import BannerError from "./common/BannerError";
import Button from "./common/Button";
import ConfirmationDialog from "./common/ConfirmationDialog";
import SearchBar from "./common/SearchBar";
import SnackbarSuccess from "./common/SnackbarSuccess";
import UserAvatar from "./common/UserAvatar";
import Typography from "@mui/material/Typography";

interface AddMemberToProjectButtonWithDialogProps {
  projectId: string;
}

const AddMemberToProjectButtonWithDialog = (
  props: AddMemberToProjectButtonWithDialogProps,
): JSX.Element => {
  const { projectId } = props;
  const [searchInput, setSearchInput] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [availableMembers, setAvailableMembers] = useState<User[]>([]);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { handleAddMembers, members, admins } = useContext(ProjectMembersContext);

  const projectMemberIds = useMemo(() => {
    const result: string[] = [];

    members.forEach((member) => result.push(member._id));
    admins.forEach((admin) => result.push(admin._id));

    return result;
  }, [members, admins]);

  const handleCloseDialog = (): void => {
    setSearchInput("");
    setIsDialogOpen(false);
  };

  const handleSearch = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    handleSetLoadingState("LOADING");
    try {
      const members = await fetchUsers(searchInput);
      setAvailableMembers(members);
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  const handleAddUser = async (newMember: User): Promise<void> => {
    handleSetLoadingState("DEFAULT");
    try {
      await addMembersToProject(projectId, [newMember._id]);
      handleAddMembers([newMember]);
      handleSetLoadingState("SUCCESS");
    } catch {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Add Member</Button>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Add team members"
        titleIcon={<ManageAccountsIcon />}
        dialogContent={
          <>
            {currentLoadState === "ERROR" && (
              <BannerError sx={{ mb: 1 }}>
                Sorry, something went wrong. Please try again later
              </BannerError>
            )}
            <form onSubmit={handleSearch}>
              <Grid container justifyContent="space-between" spacing={1} mb={2}>
                <Grid flexGrow={1}>
                  <SearchBar
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    fullWidth
                    placeholder="Search members"
                  />
                </Grid>
                <Grid>
                  <Button type="submit" state={searchInput.length === 0 ? "disabled" : "default"}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
            <List
              dense
              disablePadding
              sx={{
                height: "300px",
                overflowY: "auto",
                backgroundColor: "#FAFAFA",
                borderRadius: "6px",
                p: 2,
              }}
            >
              {availableMembers.length === 0 && (
                <Typography>No members match the search criteria</Typography>
              )}
              {availableMembers?.map((member: User) => {
                return (
                  <ListItem
                    key={member._id}
                    disablePadding
                    disableGutters
                    sx={{ borderBottom: "1px solid #E8E8E8", display: "flex" }}
                  >
                    <ListItemAvatar>
                      <UserAvatar username={member.username} displayName={member.displayName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.displayName}
                      secondary={`@${member.username}`}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      onClick={() => handleAddUser(member)}
                      state={projectMemberIds.includes(member._id) ? "disabled" : "default"}
                    >
                      Add
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </>
        }
      />
      <SnackbarSuccess
        onClose={() => handleSetLoadingState("DEFAULT")}
        isOpen={currentLoadState === "SUCCESS"}
        message="Successfully added selected member to the project"
      />
    </>
  );
};

export default AddMemberToProjectButtonWithDialog;
