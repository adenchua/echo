import AddIcon from "@mui/icons-material/Add";
import ProjectIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";

import createProject from "../api/projects/createProject";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import CTAButton from "./common/CTAButton";

const PROJECT_TYPES: ProjectType[] = ["Software Engineering", "Exploratory Data Analysis", "UX Design"];

type ProjectType = "Software Engineering" | "Exploratory Data Analysis" | "UX Design";

const CreateProjectButtonWithDialog = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectType, setProjectType] = useState<ProjectType>(PROJECT_TYPES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const { addProject } = useContext(UserProjectsContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  useEffect(() => {
    // return dialog to original state upon opening
    if (isDialogOpen) {
      setIsLoading(false);
      setProjectTitle("");
      setProjectType(PROJECT_TYPES[0]);
      setShowError(false);
    }
  }, [isDialogOpen]);

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  const handleProjectTypeChange = (event: SelectChangeEvent) => {
    setProjectType(event.target.value as ProjectType);
  };

  const handleAddProject = async (): Promise<void> => {
    if (!loggedInUserId) {
      return;
    }

    try {
      setIsLoading(true);
      setShowError(false);
      const project = await createProject(projectTitle, loggedInUserId, projectType);
      addProject(project);
      handleCloseDialog();
    } catch (error) {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CTAButton icon={<AddIcon />} text='New Project' onClick={() => setIsDialogOpen(true)} />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle
          sx={{
            borderTop: "8px solid",
            borderColor: "primary.light",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar variant='rounded' sx={{ bgcolor: "primary.main" }}>
            <ProjectIcon />
          </Avatar>
          New Project
        </DialogTitle>
        <DialogContent dividers>
          {showError && (
            <Typography color='error' variant='caption'>
              Something went wrong. Please try again later.
            </Typography>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Project Title'
            type='text'
            fullWidth
            variant='filled'
            sx={{ mb: 4 }}
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <Box mb={4}>
            <FormControl fullWidth variant='filled'>
              <InputLabel>Project Type</InputLabel>
              <Select value={projectType} label='Project Type' onChange={handleProjectTypeChange}>
                {PROJECT_TYPES.map((projectType) => (
                  <MenuItem value={projectType} key={projectType} dense>
                    {projectType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey.600", borderColor: "grey.600" }} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            disabled={projectTitle.length === 0 || isLoading}
            variant='contained'
            onClick={handleAddProject}
            startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProjectButtonWithDialog;
