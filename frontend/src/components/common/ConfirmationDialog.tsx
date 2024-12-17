import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { isOpen, onClose, dialogContent, title, titleIcon } = props;
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
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
