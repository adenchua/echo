import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { JSX, useContext, useEffect, useState } from "react";

import createEpic from "../api/epics/createEpic";
import { EpicsContext } from "../contexts/EpicsContextProvider";
import useLoad from "../hooks/useLoad";
import Button from "./common/Button";

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
    } catch {
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
            <Typography paragraph color="error">
              Something went wrong. Please try again later.
            </Typography>
          )}
          <Typography gutterBottom>New Epic</Typography>
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
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            state={!titleInput || currentLoadState === "LOADING" ? "disabled" : "default"}
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
