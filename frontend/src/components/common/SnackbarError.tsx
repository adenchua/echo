import { Snackbar } from "@mui/material";
import { JSX } from "react";

interface SnackbarErrorProps {
  isOpen: boolean;
  onClose: () => void;
  text?: string;
}

const SnackbarError = (props: SnackbarErrorProps): JSX.Element => {
  const { isOpen, onClose, text = "Something went wrong, please try again later" } = props;

  return (
    <Snackbar
      onClose={onClose}
      open={isOpen}
      message={text}
      autoHideDuration={4000}
      ContentProps={{
        sx: {
          backgroundColor: "error.main",
        },
      }}
    />
  );
};

export default SnackbarError;
