import PromoteAdminIcon from "@mui/icons-material/AddModeratorOutlined";
import DeleteIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useMemo, useState } from "react";

import promoteMemberToAdmin from "../../api/projects/promoteMemberToAdmin";
import removeMemberFromProject from "../../api/projects/removeMemberFromProject";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Project from "../../types/Project";
import User from "../../types/User";
import { LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import { matchString } from "../../utils/matchString";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import Tooltip from "../common/Tooltip";
import UserAvatar from "../common/UserAvatar";

interface RowUserInterface {
  user: User;
  isAdmin: boolean;
}

interface MembersTabProps {
  project: Project;
}

const MembersTab = (props: MembersTabProps): JSX.Element => {
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

  const getTableRows = (rows: User[], isAdmin: boolean): RowUserInterface[] => {
    const updatedRows: RowUserInterface[] = rows.map((row) => {
      return { user: row, isAdmin };
    });
    return updatedRows;
  };

  const handleRemoveMember = async (member: User): Promise<void> => {
    try {
      await removeMemberFromProject(projectId, member._id);
      handleRemoveMemberInContext(member);
    } catch (error) {
      // do nothing
    }
  };

  const handlePromoteMember = async (member: User): Promise<void> => {
    try {
      await promoteMemberToAdmin(projectId, member._id);
      handlePromoteMemberInContext(member);
    } catch (error) {
      // do nothing
    }
  };

  const tableRows = useMemo(() => [...getTableRows(admins, true), ...getTableRows(members, false)], [admins, members]);

  return (
    <Box p={3}>
      <Typography variant='h5' paragraph>
        Team Members
      </Typography>
      <Box display='flex' alignItems='center' gap={2} mb={2}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            ),
          }}
          size='small'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 640 }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align='left'>Type</TableCell>
              {isLoggedInUserAnAdmin && <TableCell align='center'>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row: RowUserInterface) => {
              const { user, isAdmin } = row;
              const { _id: userId, username, displayName, title } = user;

              if (matchString(searchInput, username) || matchString(searchInput, displayName)) {
                return (
                  <TableRow key={userId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} hover>
                    <TableCell>
                      <CardHeader
                        sx={{ padding: 0 }}
                        avatar={<UserAvatar username={username} displayName={displayName} />}
                        title={
                          <>
                            <Typography variant='body2' display='inline'>{`${displayName} `}</Typography>{" "}
                            <Typography variant='body2' color='grey.500' display='inline'>{`@${username}`}</Typography>
                          </>
                        }
                        disableTypography
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='body2'>{title}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      {isAdmin && (
                        <Typography color='error' variant='body2'>
                          Admin
                        </Typography>
                      )}
                      {!isAdmin && <Typography variant='body2'>Member</Typography>}
                    </TableCell>
                    {isLoggedInUserAnAdmin && (
                      <TableCell align='center'>
                        {!isAdmin && (
                          <Tooltip title='Promote to Admin'>
                            <IconButton color='primary' onClick={() => handlePromoteMember(user)}>
                              <PromoteAdminIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title='Remove from project'>
                          <span>
                            <IconButton
                              size='small'
                              color='error'
                              onClick={() => {
                                if (window.confirm("Remove user from project?")) {
                                  handleRemoveMember(user);
                                }
                              }}
                              disabled={loggedInUserId === userId}
                              sx={{ ml: 1 }}
                            >
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </span>
                        </Tooltip>
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
    </Box>
  );
};

export default MembersTab;
