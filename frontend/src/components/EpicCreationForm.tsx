import { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import createEpic from "../api/epics/createEpic";
import { sleep } from "../utils/sleep";
import { EpicsContext } from "../contexts/EpicsContextProvider";

interface EpicCreationFormProps {
  onClose: () => void;
  projectId: string;
}

const EpicCreationForm = (props: EpicCreationFormProps): JSX.Element => {
  const { onClose, projectId } = props;
  const [titleInput, setTitleInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const { addEpic } = useContext(EpicsContext);

  useEffect(() => {
    // reset input upon form-reopen
    setTitleInput("");
    setIsLoading(false);
    setShowError(false);
  }, [onClose]);

  const handleFormSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      setShowError(false);
      setIsLoading(true);
      await sleep(1000);
      const newEpic = await createEpic(titleInput, projectId);
      addEpic(newEpic);
      onClose();
    } catch (error) {
      setShowError(true);
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ mb: 3, border: "1px dashed", borderColor: "grey.400", p: 2, maxWidth: 500 }} elevation={0}>
      <form onSubmit={handleFormSubmit}>
        <Box mb={3}>
          {showError && (
            <Typography variant='body2' paragraph color='error'>
              Something went wrong. Please try again later.
            </Typography>
          )}
          <Typography variant='body2' gutterBottom>
            New Epic
          </Typography>
          <TextField
            size='small'
            margin='none'
            variant='filled'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            fullWidth
            autoFocus
            placeholder='Increase sales of 25% by Q4'
          />
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='inherit' sx={{ color: "grey.500" }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={!titleInput || isLoading}
            startIcon={isLoading && <CircularProgress sx={{ color: "inherit" }} size={14} />}
          >
            {isLoading ? "Adding..." : "Add Epic"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EpicCreationForm;
