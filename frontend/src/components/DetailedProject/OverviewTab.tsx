import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import UserInterface from "../../types/UserInterface";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import ContainerWrapper from "../ContainerWrapper";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import { ProjectMembersContext } from "../contexts/ProjectMembersContextProvider";
import ProjectInterface from "../../types/ProjectInterface";

interface OverviewTabProps {
  project: ProjectInterface;
}

const OverviewTab = (props: OverviewTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId } = project;
  const { members, admins } = useContext(ProjectMembersContext);

  const renderMemberCard = (member: UserInterface): JSX.Element => {
    const { displayName, username } = member;
    return (
      <Paper
        sx={{ p: 1, display: "flex", alignItems: "center", gap: 1, border: "1px solid", borderColor: "grey.300" }}
        elevation={0}
      >
        <Avatar
          src={getUserAvatarSVG(username)}
          sx={{ height: 32, width: 32, border: "1px solid", borderColor: "grey.300" }}
        >
          {displayName}
        </Avatar>
        <Box width='160px'>
          <Typography noWrap variant='body2' component='div'>
            {displayName}
          </Typography>
          <Typography noWrap variant='caption' component='div' color='grey.500'>
            Software Engineer
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <ContainerWrapper>
      <Typography variant='h5' paragraph>
        Description
      </Typography>
      <Typography color='grey.600' textAlign='justify' mb={5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Box display='flex' alignItems='center' gap={2} mb={2}>
        <Typography variant='h5'>Members</Typography>
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <Grid container spacing={2} sx={{ maxHeight: "300px", overflowY: "auto" }}>
        {admins.map((admin) => (
          <Grid item key={admin._id}>
            {renderMemberCard(admin)}
          </Grid>
        ))}
        {members.map((member) => (
          <Grid item key={member._id}>
            {renderMemberCard(member)}
          </Grid>
        ))}
      </Grid>
    </ContainerWrapper>
  );
};

export default OverviewTab;
