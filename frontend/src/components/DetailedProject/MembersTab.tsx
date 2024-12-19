import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useContext, useMemo, useState } from "react";

import promoteMemberToAdmin from "../../api/projects/promoteMemberToAdmin";
import removeMemberFromProject from "../../api/projects/removeMemberFromProject";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import useLoad from "../../hooks/useLoad";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Project from "../../types/Project";
import User from "../../types/User";
import { LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import { matchString } from "../../utils/stringUtils";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import SearchBar from "../common/SearchBar";
import SnackbarError from "../common/SnackbarError";
import UserAvatar from "../common/UserAvatar";
import PromoteMemberIconButton from "./PromoteMemberIconButton";
import RemoveMemberIconButton from "./RemoveMemberIconButton";

interface RowUserInterface {
  user: User;
  isAdmin: boolean;
}

interface MembersTabProps {
  project: Project;
}

const MembersTab = (props: MembersTabProps) => {
  const { project } = props;
  const { _id: projectId } = project;
  const {
    members,
    admins,
    handleRemoveMember: handleRemoveMemberInContext,
    handlePromoteMember: handlePromoteMemberInContext,
  } = useContext(ProjectMembersContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const [searchInput, setSearchInput] = useState<string>("");
  const isLoggedInUserAnAdmin = admins.map((admin) => admin._id).includes(loggedInUserId ?? "-1");
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const getTableRows = (rows: User[], isAdmin: boolean): RowUserInterface[] => {
    const updatedRows: RowUserInterface[] = rows.map((row) => {
      return { user: row, isAdmin };
    });
    return updatedRows;
  };

  const handleRemoveMember = async (member: User): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await removeMemberFromProject(projectId, member._id);
      handleSetLoadingState("DEFAULT");
      handleRemoveMemberInContext(member);
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const handlePromoteMember = async (member: User): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await promoteMemberToAdmin(projectId, member._id);
      handleSetLoadingState("DEFAULT");
      handlePromoteMemberInContext(member);
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const tableRows = useMemo(
    () => [...getTableRows(admins, true), ...getTableRows(members, false)],
    [admins, members],
  );

  return (
    <Box p={3}>
      <Typography variant="h5" paragraph>
        Team Members
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <SearchBar value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 640 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Type</TableCell>
              {isLoggedInUserAnAdmin && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row: RowUserInterface) => {
              const { user, isAdmin } = row;
              const { _id: userId, username, displayName, title } = user;

              if (matchString(searchInput, username) || matchString(searchInput, displayName)) {
                return (
                  <TableRow
                    key={userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>
                      <CardHeader
                        sx={{ padding: 0 }}
                        avatar={<UserAvatar username={username} displayName={displayName} />}
                        title={
                          <>
                            <Typography display="inline">{`${displayName} `}</Typography>{" "}
                            <Typography
                              color="grey.500"
                              display="inline"
                            >{`@${username}`}</Typography>
                          </>
                        }
                        disableTypography
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{title}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {isAdmin && <Typography color="error">Admin</Typography>}
                      {!isAdmin && <Typography>Member</Typography>}
                    </TableCell>
                    {isLoggedInUserAnAdmin && (
                      <TableCell align="center">
                        {!isAdmin && (
                          <PromoteMemberIconButton member={user} onConfirm={handlePromoteMember} />
                        )}
                        <RemoveMemberIconButton
                          isDisabled={loggedInUserId === userId || isAdmin}
                          member={user}
                          onRemoveMember={handleRemoveMember}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              }

              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarError
        isOpen={currentLoadState === "ERROR"}
        onClose={() => handleSetLoadingState("DEFAULT")}
      />
    </Box>
  );
};

export default MembersTab;
