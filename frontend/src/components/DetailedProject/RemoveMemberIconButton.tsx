import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { JSX, useState } from "react";

import Tooltip from "../common/Tooltip";
import User from "../../types/User";
import DangerActionDialog from "../common/DangerActionDialog";
import { DialogContentText } from "@mui/material";

interface RemoveMemberIconButtonProps {
  member: User;
  isDisabled: boolean;
  onRemoveMember: (member: User) => void;
}

const RemoveMemberIconButton = (props: RemoveMemberIconButtonProps): JSX.Element => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const { member, isDisabled, onRemoveMember } = props;

  return (
    <>
      <Tooltip title="Remove from project">
        <span>
          <IconButton
            size="small"
            color="error"
            onClick={() => setIsDialogOpened(true)}
            disabled={isDisabled}
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
      <DangerActionDialog
        isOpen={isDialogOpened}
        dialogContent={
          <>
            <DialogContentText mb={4} color="error">
              This action will prevent this member from viewing or editing the project:
            </DialogContentText>
            <DialogContentText>
              {member.displayName} (@{member.username})
            </DialogContentText>
          </>
        }
        onAccept={() => onRemoveMember(member)}
        onClose={() => setIsDialogOpened(false)}
        title="Remove member from project"
        titleIcon={<DeleteIcon />}
        disableActionButton={false}
      />
    </>
  );
};

export default RemoveMemberIconButton;
