import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import login from "../api/authentication/login";
import useLoad from "../hooks/useLoad";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import { loginErrorCodeToMessageHelper } from "../utils/loginErrorCodeToMessageHelper";

const LoginPage = () => {
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
      const user = await login(usernameInput, passwordInput);
      const { _id: userId } = user;
      setValueInStorage(userId);
      navigate("/home"); // redirect to homepage upon login
    } catch (error) {
      const errorCode = (error as Error).message;
      setErrorMessage(loginErrorCodeToMessageHelper(errorCode));
      handleSetLoadingState("ERROR");
    }
  };

  const renderLoginForm = () => {
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
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login to echo.yl
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            Error: {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            autoFocus
            fullWidth
            variant="filled"
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            variant="filled"
            fullWidth
            placeholder="Password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            sx={{ mb: 4 }}
          />
          <Button
            fullWidth
            variant="contained"
            endIcon={<ArrowRightIcon />}
            type="submit"
            disabled={currentLoadState === "LOADING" || !usernameInput || !passwordInput}
          >
            {currentLoadState === "LOADING" ? "Logging in..." : "Login"}
          </Button>
        </form>
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
