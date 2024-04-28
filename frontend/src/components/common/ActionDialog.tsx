import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
  disableActionButton: boolean;
  acceptButtonText?: string;
}

const ActionDialog = (props: ActionDialogProps): JSX.Element => {
  const {
    isOpen,
    onClose,
    onAccept,
    dialogContent,
    title,
    titleIcon,
    disableActionButton,
    acceptButtonText = "Confirm",
  } = props;
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          borderTop: "6px solid",
          borderColor: "primary.light",
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar variant="rounded" sx={{ bgcolor: "primary.main" }}>
          {titleIcon}
        </Avatar>
        {title}
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button sx={{ color: "grey.600", borderColor: "grey.600" }} onClick={onClose}>
          Close
        </Button>
        <Button disabled={disableActionButton} onClick={onAccept}>
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
