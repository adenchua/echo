import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { JSX, ReactNode } from "react";

import Button from "./Button";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
  disableActionButton: boolean;
}

const ActionDialog = (props: ActionDialogProps): JSX.Element => {
  const { isOpen, onClose, onAccept, dialogContent, title, titleIcon, disableActionButton } = props;
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
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button state={disableActionButton ? "disabled" : "default"} onClick={onAccept}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
