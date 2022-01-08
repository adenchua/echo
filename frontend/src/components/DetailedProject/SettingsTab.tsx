import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import ProjectInterface, { ProjectUpdateFieldsType } from "../../types/ProjectInterface";
import updateProject from "../../api/projects/updateProject";
import { sleep } from "../../utils/sleep";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";
import deleteProject from "../../api/projects/deleteProject";

interface SettingsTabProps {
  project: ProjectInterface;
  handleUpdateProjectFields: (updatedFields: ProjectUpdateFieldsType) => void;
}

const SettingsTab = (props: SettingsTabProps): JSX.Element => {
  const { project, handleUpdateProjectFields } = props;
  const { title, description, _id: projectId } = project;
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description);
  const [showButtonSaving, setShowButtonSaving] = useState<boolean>(false);
  const [showButtonDeleting, setShowButtonDeleting] = useState<boolean>(false);
  const [deletionInput, setDeletionInput] = useState<string>("");
  const { updateProject: updateProjectInContext } = useContext(UserProjectsContext);
  const history = useHistory();

  const handleUpdateProject = async (): Promise<void> => {
    if (!titleInput) {
      return; // title cannot be left empty.
    }

    const updatableFields = { title: titleInput, description: descriptionInput };

    try {
      setShowButtonSaving(true);
      await sleep(1000);
      await updateProject(projectId, titleInput, descriptionInput);
      updateProjectInContext(projectId, updatableFields);
      handleUpdateProjectFields(updatableFields); // updates in overview page
      setShowButtonSaving(false);
    } catch (error) {
      // do nothing
    } finally {
      setShowButtonSaving(false);
    }
  };

  const handleDeleteProject = async (): Promise<void> => {
    try {
      setShowButtonDeleting(true);
      await sleep(1000);
      await deleteProject(projectId);
      history.push("/projects");
    } catch (error) {
      // do nothing
    }
  };

  return (
    <Box p={3}>
      <Typography variant='h5' paragraph>
        Project Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container mb={4} spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography fontSize={18} gutterBottom>
            Details
          </Typography>
          <Typography fontSize={12} color='textSecondary'>
            Customize project title, description and logo.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography gutterBottom variant='body2'>
            Project Title
          </Typography>
          <TextField
            variant='filled'
            fullWidth
            sx={{ maxWidth: 400, mb: 3 }}
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Typography gutterBottom variant='body2'>
            Project Description
          </Typography>
          <TextField
            variant='filled'
            fullWidth
            sx={{ maxWidth: 400, mb: 3 }}
            multiline
            rows={3}
            onChange={(e) => setDescriptionInput(e.target.value)}
            value={descriptionInput}
            placeholder='Give your project a detailed description'
          />
          <Button
            sx={{ display: "block" }}
            variant='contained'
            onClick={handleUpdateProject}
            disabled={showButtonSaving || titleInput.length === 0}
          >
            {showButtonSaving ? "Saving..." : "Save"}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3 }} />

      <Grid container mb={4} alignItems='flex-start' spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography fontSize={18} color='error' gutterBottom>
            Delete Project
          </Typography>
          <Typography fontSize={12} color='textSecondary'>
            Once you close this project, all tickets and sprint information will be lost forever.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            variant='filled'
            fullWidth
            size='small'
            helperText={`Type: '${title}' to enable deletion`}
            sx={{ maxWidth: 400, mb: 3 }}
            value={deletionInput}
            onChange={(e) => setDeletionInput(e.target.value)}
          />
          {deletionInput === title && (
            <Typography color='error' variant='body2' paragraph>
              Warning! There is no turning back now...
            </Typography>
          )}
          <Button
            color='error'
            variant='contained'
            sx={{ display: "block" }}
            disabled={showButtonDeleting || deletionInput !== title}
            onClick={handleDeleteProject}
          >
            {showButtonDeleting ? "Deleting Project..." : "Delete this project"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsTab;
