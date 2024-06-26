import AddIcon from "@mui/icons-material/Add";
import ProjectIcon from "@mui/icons-material/GitHub";
import { DialogContentText } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";

import createProject from "../api/projects/createProject";
import { UserProjectsContext } from "../contexts/UserProjectsContextProvider";
import useLoad from "../hooks/useLoad";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY, PROJECT_TYPES } from "../utils/constants";
import ActionDialog from "./common/ActionDialog";
import CTAButton from "./common/CTAButton";
import DialogErrorText from "./common/DialogErrorText";
import Select from "./common/Select";
import SnackbarSuccess from "./common/SnackbarSuccess";

type ProjectType = (typeof PROJECT_TYPES)[number];

const CreateProjectButtonWithDialog = (): JSX.Element => {
  const defaultProjectType = PROJECT_TYPES[0];

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectType, setProjectType] = useState<ProjectType>(defaultProjectType);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const { addProject } = useContext(UserProjectsContext);
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  useEffect(() => {
    // return dialog to original state upon opening
    if (isDialogOpen) {
      handleSetLoadingState("DEFAULT");
      setProjectTitle("");
      setProjectType(defaultProjectType);
    }
  }, [isDialogOpen, handleSetLoadingState, defaultProjectType]);

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
  };

  const handleProjectTypeChange = (newProjectType: ProjectType) => {
    setProjectType(newProjectType);
  };

  const handleAddProject = async (): Promise<void> => {
    if (!loggedInUserId) {
      return;
    }

    try {
      handleSetLoadingState("LOADING");
      const project = await createProject(projectTitle, loggedInUserId, projectType);
      addProject(project);
      handleCloseDialog();
      handleSetLoadingState("SUCCESS");
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <>
      <CTAButton icon={<AddIcon />} text="New Project" onClick={() => setIsDialogOpen(true)} />
      <ActionDialog
        dialogContent={
          <>
            <DialogContentText>Project Title</DialogContentText>
            <TextField
              placeholder="My awesome project"
              autoFocus
              margin="dense"
              fullWidth
              variant="filled"
              sx={{ mb: 4 }}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <Box mb={4}>
              <DialogContentText mb={1}>Project Type</DialogContentText>
              <FormControl fullWidth variant="filled">
                <Select
                  value={projectType}
                  onChange={(e) => handleProjectTypeChange(e.target.value as ProjectType)}
                >
                  {PROJECT_TYPES.map((projectType) => (
                    <MenuItem value={projectType} key={projectType} dense>
                      {projectType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {currentLoadState === "ERROR" && (
              <DialogErrorText text="Something went wrong. Please try again later." />
            )}
          </>
        }
        disableActionButton={projectTitle.length === 0 || currentLoadState === "LOADING"}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAccept={handleAddProject}
        title="Create new project"
        titleIcon={<ProjectIcon />}
        acceptButtonText="Create project"
      />
      <SnackbarSuccess
        isOpen={currentLoadState === "SUCCESS"}
        onClose={() => handleSetLoadingState("DEFAULT")}
        message="Successfully added new project!"
      />
    </>
  );
};

export default CreateProjectButtonWithDialog;
