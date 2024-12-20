import DeleteIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import IconButton from "@mui/material/IconButton";
import { JSX, useState } from "react";

import { DialogContentText } from "@mui/material";
import User from "../../types/User";
import DangerActionDialog from "../common/DangerActionDialog";
import Tooltip from "../common/Tooltip";

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
              This action will prevent @{member.username} from viewing or editing the project
            </DialogContentText>
          </>
        }
        onAccept={() => onRemoveMember(member)}
        onClose={() => setIsDialogOpened(false)}
        title={`Remove @${member.username} from project`}
        titleIcon={<DeleteIcon />}
        disableActionButton={false}
      />
    </>
  );
};

export default RemoveMemberIconButton;
