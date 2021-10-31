import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";

import ProjectInterface from "../../types/ProjectInterface";
import UserInterface from "../../types/UserInterface";
import fetchUsersByIds from "../../api/users/fetchUsersByIds";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import ContainerWrapper from "../ContainerWrapper";

interface OverviewTabProps {
  project: ProjectInterface;
}

const OverviewTab = (props: OverviewTabProps): JSX.Element => {
  const { project } = props;
  const { memberIds, adminIds } = project;
  const [members, setMembers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await fetchUsersByIds([...adminIds, ...memberIds]);
        setMembers(response);
      } catch (error) {
        // do nothing
      }
    };

    getMembers();
  }, [memberIds, adminIds]);

  const renderMemberCard = (member: UserInterface): JSX.Element => {
    const { displayName, username } = member;
    return (
      <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }} elevation={0}>
        <Avatar src={getUserAvatarSVG(username)}>{displayName}</Avatar>
        <Box width='180px'>
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
        <Button startIcon={<AddIcon fontSize='small' />} size='small'>
          Add Member
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ maxHeight: "300px", overflowY: "auto" }}>
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
