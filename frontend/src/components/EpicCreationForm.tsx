import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";

import createEpic from "../api/epics/createEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import useLoad from "../hooks/useLoad";

interface EpicCreationFormProps {
  onClose: () => void;
  projectId: string;
}

const EpicCreationForm = (props: EpicCreationFormProps): JSX.Element => {
  const { onClose, projectId } = props;
  const [titleInput, setTitleInput] = useState<string>("");
  const { currentLoadState, handleSetLoadingState } = useLoad();

  const { addEpic } = useContext(EpicsContext);

  useEffect(() => {
    // reset input upon form-reopen
    setTitleInput("");
    handleSetLoadingState("DEFAULT");
  }, [onClose, handleSetLoadingState]);

  const handleFormSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      handleSetLoadingState("LOADING");
      const newEpic = await createEpic(titleInput, projectId);
      addEpic(newEpic);
      handleSetLoadingState("DEFAULT");
      onClose();
    } catch (error) {
      handleSetLoadingState("ERROR");
    }
  };

  return (
    <Paper
      sx={{ mb: 3, border: "1px dashed", borderColor: "grey.400", p: 2, maxWidth: 500 }}
      elevation={0}
    >
      <form onSubmit={handleFormSubmit}>
        <Box mb={3}>
          {currentLoadState === "ERROR" && (
            <Typography variant="body2" paragraph color="error">
              Something went wrong. Please try again later.
            </Typography>
          )}
          <Typography variant="body2" gutterBottom>
            New Epic
          </Typography>
          <TextField
            size="small"
            margin="none"
            variant="filled"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            fullWidth
            autoFocus
            placeholder="Increase sales of 25% by Q4"
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button color="inherit" sx={{ color: "grey.500" }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!titleInput || currentLoadState === "LOADING"}
            startIcon={
              currentLoadState === "LOADING" && (
                <CircularProgress sx={{ color: "inherit" }} size={14} />
              )
            }
          >
            {currentLoadState === "LOADING" ? "Adding..." : "Add Epic"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EpicCreationForm;
