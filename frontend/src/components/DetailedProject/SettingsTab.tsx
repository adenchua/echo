import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ProjectInterface, { ProjectUpdateFieldsType } from "../../types/ProjectInterface";
import updateProject from "../../api/projects/updateProject";
import { sleep } from "../../utils/sleep";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";

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
  const { updateProject: updateProjectInContext } = useContext(UserProjectsContext);

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

  return (
    <>
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
          <Box display='flex' gap={2}>
            <Button
              variant='contained'
              onClick={handleUpdateProject}
              disabled={showButtonSaving || titleInput.length === 0}
            >
              {showButtonSaving ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3 }} />
      <Grid container mb={4} alignItems='center' spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography fontSize={18} color='error' gutterBottom>
            Delete Project
          </Typography>
          <Typography fontSize={12} color='textSecondary'>
            Once you close this project, all tickets and sprint information will be lost forever.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Button color='error' variant='outlined' disabled>
            Delete this project
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsTab;
