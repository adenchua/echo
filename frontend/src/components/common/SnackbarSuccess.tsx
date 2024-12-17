import { Snackbar } from "@mui/material";

interface SnackbarSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SnackbarSuccess = (props: SnackbarSuccessProps) => {
  const { isOpen, onClose, message } = props;

  return (
    <Snackbar
      onClose={onClose}
      open={isOpen}
      message={message}
      autoHideDuration={4000}
      ContentProps={{
        sx: {
          backgroundColor: "success.main",
        },
      }}
    />
  );
};

export default SnackbarSuccess;
