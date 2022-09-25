import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import User from "../../types/User";
import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import Project from "../../types/Project";

interface OverviewTabProps {
  project: Project;
}

const OverviewTab = (props: OverviewTabProps): JSX.Element => {
  const { project } = props;
  const { _id: projectId, description } = project;
  const { members, admins } = useContext(ProjectMembersContext);

  const renderMemberCard = (member: User): JSX.Element => {
    const { displayName, username, title } = member;
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
            {title}
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <Box p={3}>
      <Typography variant='h5' paragraph>
        Description
      </Typography>
      <Typography fontSize={14} color='grey.600' textAlign='justify' mb={5}>
        {description ?? "No project description."}
      </Typography>
      <Box display='flex' alignItems='center' gap={2} mb={2}>
        <Typography variant='h5'>Members</Typography>
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <Grid container spacing={2}>
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
    </Box>
  );
};

export default OverviewTab;
