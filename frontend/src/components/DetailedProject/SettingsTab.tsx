import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import deleteProject from "../../api/projects/deleteProject";
import updateProject from "../../api/projects/updateProject";
import { UserProjectsContext } from "../../contexts/UserProjectsContextProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Project, { ProjectUpdateFieldsType } from "../../types/Project";
import { LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import { sleep } from "../../utils/sleep";

const saveButtonStates = {
  default: "Update project details",
  loading: "Saving...",
  success: "Saved!",
} as const;
type SaveButtonStateKey = keyof typeof saveButtonStates;

interface SettingsTabProps {
  project: Project;
  handleUpdateProjectFields: (updatedFields: ProjectUpdateFieldsType) => void;
}

const SettingsTab = (props: SettingsTabProps): JSX.Element => {
  const { project, handleUpdateProjectFields } = props;
  const { title, description, _id: projectId, adminIds } = project;
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description);
  const [saveButtonState, setSaveButtonState] = useState<SaveButtonStateKey>("default");
  const [showButtonDeleting, setShowButtonDeleting] = useState<boolean>(false);
  const [deletionInput, setDeletionInput] = useState<string>("");
  const { updateProject: updateProjectInContext } = useContext(UserProjectsContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const navigate = useNavigate();
  const isLoggedInUserAdmin = loggedInUserId && adminIds.includes(loggedInUserId);

  const handleUpdateProject = async (): Promise<void> => {
    if (!titleInput) {
      return; // title cannot be left empty.
    }

    const updatableFields = { title: titleInput, description: descriptionInput };

    try {
      setSaveButtonState("loading");
      await sleep(1000);
      await updateProject(projectId, titleInput, descriptionInput);
      updateProjectInContext(projectId, updatableFields);
      handleUpdateProjectFields(updatableFields); // updates in overview page
      setSaveButtonState("success");
    } catch (error) {
      // do nothing
    } finally {
      await sleep(1000);
      setSaveButtonState("default");
    }
  };

  const handleDeleteProject = async (): Promise<void> => {
    try {
      setShowButtonDeleting(true);
      await sleep(1000);
      await deleteProject(projectId);
      navigate("/projects");
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
            sx={{ display: "block", width: "200px" }}
            variant='contained'
            onClick={handleUpdateProject}
            disabled={saveButtonState !== "default" || titleInput.length === 0}
          >
            {saveButtonStates[saveButtonState]}
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3 }} />

      {isLoggedInUserAdmin && (
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
      )}
    </Box>
  );
};

export default SettingsTab;
