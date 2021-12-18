import React, { useState, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import PromoteAdminIcon from "@mui/icons-material/AddModeratorOutlined";
import DeleteIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import ContainerWrapper from "../ContainerWrapper";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import UserInterface from "../../types/UserInterface";
import { matchString } from "../../utils/matchString";
import removeMemberFromProject from "../../api/projects/removeMemberFromProject";
import ProjectInterface from "../../types/ProjectInterface";
import promoteMemberToAdmin from "../../api/projects/promoteMemberToAdmin";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import { UserAuthenticationContext } from "../contexts/UserAuthenticationContextProvider";

interface RowUserInterface {
  user: UserInterface;
  isAdmin: boolean;
}

interface MembersTabProps {
  project: ProjectInterface;
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
  const { loggedInUserId } = useContext(UserAuthenticationContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const isLoggedInUserAnAdmin = admins.map((admin) => admin._id).includes(loggedInUserId ?? "-1");

  const getTableRows = (rows: UserInterface[], isAdmin: boolean): RowUserInterface[] => {
    const updatedRows: RowUserInterface[] = rows.map((row) => {
      return { user: row, isAdmin };
    });
    return updatedRows;
  };

  const handleRemoveMember = async (member: UserInterface): Promise<void> => {
    try {
      await removeMemberFromProject(projectId, member._id);
      handleRemoveMemberInContext(member);
    } catch (error) {
      // do nothing
    }
  };

  const handlePromoteMember = async (member: UserInterface): Promise<void> => {
    try {
      await promoteMemberToAdmin(projectId, member._id);
      handlePromoteMemberInContext(member);
    } catch (error) {
      // do nothing
    }
  };

  const tableRows = useMemo(() => [...getTableRows(admins, true), ...getTableRows(members, false)], [admins, members]);

  return (
    <ContainerWrapper>
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
            style: {
              borderRadius: 0,
            },
          }}
          size='small'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "grey.300" }}>
        <Table sx={{ minWidth: 650 }} size='small'>
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
              const { _id: userId, username, displayName } = user;

              if (matchString(searchInput, username) || matchString(searchInput, displayName)) {
                return (
                  <TableRow key={userId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} hover>
                    <TableCell>
                      <CardHeader
                        sx={{ padding: 0 }}
                        avatar={<Avatar sx={{ height: 24, width: 24 }} src={getUserAvatarSVG(username)} />}
                        title={
                          <>
                            <Typography fontSize={12} display='inline'>{`${displayName} `}</Typography>{" "}
                            <Typography fontSize={12} color='grey.500' display='inline'>{`@${username}`}</Typography>
                          </>
                        }
                        disableTypography
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <Typography fontSize={12}>Software Engineer</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      {isAdmin && (
                        <Typography fontSize={12} color='error'>
                          Admin
                        </Typography>
                      )}
                      {!isAdmin && <Typography fontSize={12}>Member</Typography>}
                    </TableCell>
                    {isLoggedInUserAnAdmin && (
                      <TableCell align='center'>
                        {!isAdmin && (
                          <Tooltip title='Promote to Admin' disableInteractive>
                            <IconButton size='small' color='primary' onClick={() => handlePromoteMember(user)}>
                              <PromoteAdminIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title='Remove from project' disableInteractive>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => handleRemoveMember(user)}
                            disabled={loggedInUserId === userId}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon fontSize='small' />
                          </IconButton>
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
    </ContainerWrapper>
  );
};

export default MembersTab;
