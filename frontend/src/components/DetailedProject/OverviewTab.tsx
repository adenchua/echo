import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { JSX, useContext } from "react";

import { ProjectMembersContext } from "../../contexts/ProjectMembersContextProvider";
import Project from "../../types/Project";
import User from "../../types/User";
import AddMemberToProjectButtonWithDialog from "../AddMemberToProjectButtonWithDialog";
import UserAvatar from "../common/UserAvatar";
import Grow from "../common/Grow";

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
      <Grow>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }} elevation={0}>
          <UserAvatar username={username} displayName={displayName} />
          <Box sx={{ width: "160px" }}>
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        Description
      </Typography>
      <Typography
        sx={{ color: "text.secondary", textAlign: "justify", mb: 5, whiteSpace: "pre-wrap" }}
      >
        {description ?? "No project description."}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
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
