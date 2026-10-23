import { JSX, use, useState } from "react";
import { useNavigate } from "react-router";

import logout from "../api/authentication/logout";
import { CurrentUserContext } from "../contexts/CurrentUserContextProvider";
import ActionDialog from "./common/ActionDialog";
import Button from "./common/Button";
import LogoutIcon from "./icons/LogoutIcon";

const LogoutButton = (): JSX.Element => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const { clearCurrentUser } = use(CurrentUserContext);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/"); //returns to login screen
      clearCurrentUser();
    } catch {
      // do nothing
    }
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={() => setIsDialogOpened(true)}
        fullWidth
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
      <ActionDialog
        dialogContent={null}
        isOpen={isDialogOpened}
        onClose={() => setIsDialogOpened(false)}
        title="Do you want to logout?"
        titleIcon={<LogoutIcon />}
        onAccept={handleLogout}
        disableActionButton={false}
      />
    </>
  );
};

export default LogoutButton;
