import PromoteAdminIcon from "@mui/icons-material/AddModeratorOutlined";
import IconButton from "@mui/material/IconButton";
import { JSX, useState } from "react";

import { DialogContentText } from "@mui/material";
import User from "../../types/User";
import ActionDialog from "../common/ActionDialog";
import Tooltip from "../common/Tooltip";

interface PromoteMemberIconButtonProps {
  member: User;
  onConfirm: (member: User) => void;
}

const PromoteMemberIconButton = (props: PromoteMemberIconButtonProps): JSX.Element => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const { member, onConfirm } = props;

  return (
    <>
      <Tooltip title="Promote to Admin">
        <IconButton color="primary" onClick={() => setIsDialogOpened(true)}>
          <PromoteAdminIcon />
        </IconButton>
      </Tooltip>
      <ActionDialog
        isOpen={isDialogOpened}
        dialogContent={
          <>
            <DialogContentText mb={4}>
              This action will allow @{member.username} to manage members and project settings
            </DialogContentText>
          </>
        }
        onAccept={() => onConfirm(member)}
        onClose={() => setIsDialogOpened(false)}
        title={`Promote @${member.username} to administrator`}
        titleIcon={<PromoteAdminIcon />}
        disableActionButton={false}
      />
    </>
  );
};

export default PromoteMemberIconButton;
