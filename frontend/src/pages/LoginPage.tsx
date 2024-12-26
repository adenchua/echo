import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { JSX, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LoginPageImage from "../assets/login_page_image.svg";

import login from "../api/authentication/login";
import BannerError from "../components/common/BannerError";
import Button from "../components/common/Button";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import Link from "../components/common/Link";
import TextField from "../components/common/TextField";
import LogoutIcon from "../components/icons/LogoutIcon";
import RightArrowIcon from "../components/icons/RightArrowIcon";
import useLoad from "../hooks/useLoad";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import { loginErrorCodeToMessageHelper } from "../utils/loginErrorCodeToMessageHelper";

const LoginPage = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showSessionLogoutDialog, setShowSessionLogoutDialog] = useState<boolean>(false);
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { setValueInStorage } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const navigate = useNavigate();

  useEffect(() => {
    const hasRedirectFlag = searchParams.get("redirect") === "1";

    if (hasRedirectFlag) {
      setShowSessionLogoutDialog(true);
    }
  }, []);

  const handleLogin = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");

    try {
      handleSetLoadingState("LOADING");
      const userId = await login(usernameInput, passwordInput);
      setValueInStorage(userId);
      navigate("/home"); // redirect to homepage upon login
    } catch (error) {
      const errorCode = (error as Error).message;
      setErrorMessage(loginErrorCodeToMessageHelper(errorCode));
      handleSetLoadingState("ERROR");
    }
  };

  const renderLoginForm = (): JSX.Element => {
    return (
      <Paper
        sx={{
          maxWidth: 400,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Login to echo.yl
        </Typography>
        {errorMessage && <BannerError sx={{ mb: 2, width: "100%" }}>{errorMessage}</BannerError>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            sx={{ mb: 4 }}
          />
          <Button
            fullWidth
            endIcon={<RightArrowIcon />}
            type="submit"
            state={currentLoadState === "LOADING" ? "loading" : "default"}
          >
            Login
          </Button>
        </form>
        <Link onClick={() => navigate("/sign-up")} mt={2}>
          New to echo? Register here
        </Link>
      </Paper>
    );
  };

  return (
    <>
      <ConfirmationDialog
        isOpen={showSessionLogoutDialog}
        onClose={() => setShowSessionLogoutDialog(false)}
        title="Session timed out"
        dialogContent="Your session has expired, please login again"
        titleIcon={<LogoutIcon />}
      />
      <Grid container sx={{ height: "100vh", p: 2 }} spacing={2}>
        <Grid
          size={6}
          sx={{
            backgroundColor: "#84b7b2",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={LoginPageImage} height="400px" alt="login" />
        </Grid>
        <Grid size={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {renderLoginForm()}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
