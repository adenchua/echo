import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { JSX, useState } from "react";
import { useNavigate } from "react-router";

import login from "../api/authentication/login";
import BannerError from "../components/common/BannerError";
import Button from "../components/common/Button";
import Link from "../components/common/Link";
import TextField from "../components/common/TextField";
import RightArrowIcon from "../components/icons/RightArrowIcon";
import useLoad from "../hooks/useLoad";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import { loginErrorCodeToMessageHelper } from "../utils/loginErrorCodeToMessageHelper";

const LoginPage = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const { currentLoadState, handleSetLoadingState } = useLoad();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setValueInStorage } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const navigate = useNavigate();

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
          width: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login to echo.yl
        </Typography>
        {errorMessage && <BannerError sx={{ mb: 2, width: '100%' }}>{errorMessage}</BannerError>}
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
            sx={{ mb: 2 }}
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
    <Container
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      {renderLoginForm()}
    </Container>
  );
};

export default LoginPage;
