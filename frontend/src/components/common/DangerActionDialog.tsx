import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

interface DangerActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (...args: any[]) => void;
  dialogContent: ReactNode;
  title: string;
  titleIcon: ReactNode;
  disableActionButton: boolean;
  acceptButtonText?: string;
}

const DangerActionDialog = (props: DangerActionDialogProps): JSX.Element => {
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
        <Button sx={{ color: "grey.600", borderColor: "grey.600" }} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={disableActionButton} onClick={onAccept} color="error">
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DangerActionDialog;
