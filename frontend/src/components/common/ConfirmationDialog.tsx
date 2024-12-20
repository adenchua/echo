import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { JSX, ReactNode } from "react";

import Button from "./Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
}

const ConfirmationDialog = (props: ConfirmationDialogProps): JSX.Element => {
  const { isOpen, onClose, dialogContent, title, titleIcon } = props;
  return (
    <Dialog open={isOpen} maxWidth="sm">
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
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
