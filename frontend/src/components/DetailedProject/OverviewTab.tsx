import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useContext } from "react";

import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import Project from "../../types/Project";
import User from "../../types/User";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import UserAvatar from "../common/UserAvatar";
import Grow from "../common/Grow";

interface OverviewTabProps {
  project: Project;
}

const OverviewTab = (props: OverviewTabProps) => {
  const { project } = props;
  const { _id: projectId, description } = project;
  const { members, admins } = useContext(ProjectMembersContext);

  const renderMemberCard = (member: User) => {
    const { displayName, username, title } = member;
    return (
      <Grow>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }} elevation={0}>
          <UserAvatar username={username} displayName={displayName} />
          <Box width="160px">
            <Typography noWrap component="div">
              {displayName}
            </Typography>
            <Typography noWrap variant="caption" component="div" color="grey.500">
              {title}
            </Typography>
          </Box>
        </Paper>
      </Grow>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" paragraph>
        Description
      </Typography>
      <Typography color="textSecondary" textAlign="justify" mb={5} sx={{ whiteSpace: "pre-wrap" }}>
        {description ?? "No project description."}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h5">Members</Typography>
        <AddMemberToProjectButtonWithDialog projectId={projectId} />
      </Box>
      <Grid container spacing={2}>
        {admins.map((admin) => (
          <Grid key={admin._id}>{renderMemberCard(admin)}</Grid>
        ))}
        {members.map((member) => (
          <Grid key={member._id}>{renderMemberCard(member)}</Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverviewTab;
