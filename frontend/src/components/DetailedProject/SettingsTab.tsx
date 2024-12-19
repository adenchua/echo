import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import deleteProject from "../../api/projects/deleteProject";
import updateProject from "../../api/projects/updateProject";
import { UserProjectsContext } from "../../contexts/UserProjectsContextProvider";
import useLoad from "../../hooks/useLoad";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Project, { ProjectUpdateFieldsType } from "../../types/Project";
import { LOCAL_STORAGE_UID_KEY } from "../../utils/constants";
import SnackbarError from "../common/SnackbarError";

interface SettingsTabProps {
  project: Project;
  handleUpdateProjectFields: (updatedFields: ProjectUpdateFieldsType) => void;
}

const SettingsTab = (props: SettingsTabProps) => {
  const { project, handleUpdateProjectFields } = props;
  const { title, description, _id: projectId, adminIds } = project;
  const [titleInput, setTitleInput] = useState<string>(title);
  const [descriptionInput, setDescriptionInput] = useState<string>(description);
  const [deletionInput, setDeletionInput] = useState<string>("");
  const { currentLoadState, handleSetLoadingState } = useLoad();
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
      handleSetLoadingState("LOADING");
      await updateProject(projectId, titleInput, descriptionInput);
      updateProjectInContext(projectId, updatableFields);
      handleUpdateProjectFields(updatableFields); // updates in overview page
      handleSetLoadingState("SUCCESS");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  const handleDeleteProject = async (): Promise<void> => {
    try {
      handleSetLoadingState("LOADING");
      await deleteProject(projectId);
      navigate("/projects");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" paragraph>
        Project Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container mb={4} spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <Typography color="textSecondary">
            Customize project title, description and logo.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography gutterBottom variant="body2">
            Project Title
          </Typography>
          <TextField
            variant="filled"
            fullWidth
            sx={{ maxWidth: 400, mb: 3 }}
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Typography gutterBottom variant="body2">
            Project Description
          </Typography>
          <TextField
            variant="filled"
            fullWidth
            sx={{ maxWidth: 400, mb: 3 }}
            multiline
            rows={3}
            onChange={(e) => setDescriptionInput(e.target.value)}
            value={descriptionInput}
            placeholder="Give your project a detailed description"
          />
          <Button
            sx={{ display: "block" }}
            variant="contained"
            onClick={handleUpdateProject}
            disabled={currentLoadState === "LOADING" || titleInput.length === 0}
          >
            Update details
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3 }} />

      {isLoggedInUserAdmin && (
        <Grid container mb={4} alignItems="flex-start" spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom color="error">
              Delete Project
            </Typography>
            <Typography color="textSecondary">
              Once you delete this project, all tickets and sprint information will be lost forever.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              variant="filled"
              fullWidth
              size="small"
              helperText={`Type: '${title}' to enable deletion`}
              sx={{ maxWidth: 400, mb: 3 }}
              value={deletionInput}
              onChange={(e) => setDeletionInput(e.target.value)}
            />
            {deletionInput === title && (
              <Typography color="error" paragraph>
                Warning! There is no turning back now...
              </Typography>
            )}
            <Button
              color="error"
              variant="contained"
              sx={{ display: "block" }}
              disabled={currentLoadState === "LOADING" || deletionInput !== title}
              onClick={handleDeleteProject}
            >
              Delete this project
            </Button>
          </Grid>
        </Grid>
      )}
      <SnackbarError
        isOpen={currentLoadState === "ERROR"}
        onClose={() => handleSetLoadingState("DEFAULT")}
      />
    </Box>
  );
};

export default SettingsTab;
