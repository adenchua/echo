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
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

import ContainerWrapper from "../ContainerWrapper";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import UserInterface from "../../types/UserInterface";
import { matchString } from "../../utils/matchString";
import removeMemberFromProject from "../../api/projects/removeMemberFromProject";
import ProjectInterface from "../../types/ProjectInterface";

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
  const { members, admins, handleRemoveMember: handleRemoveMemberInContext } = useContext(ProjectMembersContext);
  const [searchInput, setSearchInput] = useState<string>("");

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

  const tableRows = useMemo(() => [...getTableRows(admins, true), ...getTableRows(members, false)], [admins, members]);

  return (
    <ContainerWrapper>
      <Typography variant='h5' paragraph>
        Team Members
      </Typography>
      <TextField
        size='small'
        sx={{ mb: 2 }}
        placeholder='Search...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align='left'>Type</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row: RowUserInterface) => {
              const { user, isAdmin } = row;
              const { _id: userId, username, displayName } = user;

              if (matchString(searchInput, username) || matchString(searchInput, displayName)) {
                return (
                  <TableRow key={userId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                    <TableCell align='center'>
                      {!isAdmin && (
                        <Tooltip title='Promote to Admin' disableInteractive>
                          <IconButton size='small' color='primary'>
                            <PromoteAdminIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title='Remove from project' disableInteractive>
                        <IconButton size='small' color='error' onClick={() => handleRemoveMember(user)}>
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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
