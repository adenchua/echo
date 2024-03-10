import IconButton from "@mui/material/IconButton";
import PromoteAdminIcon from "@mui/icons-material/AddModeratorOutlined";
import { useState } from "react";

import Tooltip from "../common/Tooltip";
import User from "../../types/User";
import ActionDialog from "../common/ActionDialog";
import { DialogContentText } from "@mui/material";

interface PromoteMemberIconButtonProps {
  member: User;
  onConfirm: (member: User) => void;
}

const PromoteMemberIconButton = (props: PromoteMemberIconButtonProps): JSX.Element => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const { member, onConfirm } = props;

  return (
    <>
      <Tooltip title='Promote to Admin'>
        <IconButton color='primary' onClick={() => setIsDialogOpened(true)}>
          <PromoteAdminIcon />
        </IconButton>
      </Tooltip>
      <ActionDialog
        isOpen={isDialogOpened}
        dialogContent={
          <>
            <DialogContentText mb={4}>
              This action will allow this member to manage members and project settings:
            </DialogContentText>
            <DialogContentText>
              {member.displayName} (@{member.username})
            </DialogContentText>
          </>
        }
        onAccept={() => onConfirm(member)}
        onClose={() => setIsDialogOpened(false)}
        title='Promote member to administrator'
        titleIcon={<PromoteAdminIcon />}
        disableActionButton={false}
      />
    </>
  );
};

export default PromoteMemberIconButton;
