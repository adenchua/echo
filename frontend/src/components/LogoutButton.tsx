import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Button from "@mui/material/Button";
import { useState } from "react";

import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import ActionDialog from "./common/ActionDialog";

const LogoutButton = () => {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const { removeKeyValue } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  const handleLogout = (): void => {
    removeKeyValue();
    navigate("/"); //returns to login screen
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsDialogOpened(true)}
        fullWidth
        sx={{
          color: "#FFF",
          borderColor: "#FFF",
          "&:hover": { borderColor: "#FFF", bgcolor: "#FFF", color: "#111" },
        }}
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
        acceptButtonText="Logout"
      />
    </>
  );
};

export default LogoutButton;
