import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

import Button from "./Button";

interface DangerActionDialogProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onAccept: React.MouseEventHandler<HTMLButtonElement>;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
  disableActionButton: boolean;
  acceptButtonText?: string;
}

const DangerActionDialog = (props: DangerActionDialogProps) => {
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
          borderColor: "error.light",
          color: "error.main",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar variant="rounded" sx={{ bgcolor: "error.main" }}>
          {titleIcon}
        </Avatar>
        {title}
      </DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          state={disableActionButton ? "disabled" : "default"}
          onClick={onAccept}
          color="danger"
        >
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DangerActionDialog;
