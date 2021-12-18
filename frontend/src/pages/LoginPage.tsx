import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

import login from "../api/authentication/login";
import { loginErrorCodeToMessageHelper } from "../utils/loginErrorCodeToMessageHelper";
import { UserAuthenticationContext } from "../components/contexts/UserAuthenticationContextProvider";

const LoginPage = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loginUser } = useContext(UserAuthenticationContext);
  const history = useHistory();

  const handleLogin = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsLoading(true);
      const user = await login(usernameInput, passwordInput);
      const { _id: userId } = user;
      loginUser(userId);
      history.push("/home"); // redirect to homepage upon login
    } catch (error) {
      const errorCode = (error as Error).message;
      setErrorMessage(loginErrorCodeToMessageHelper(errorCode));
    } finally {
      setIsLoading(false);
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
        <Typography variant='h6' sx={{ mb: 2 }}>
          Login to echo.yl
        </Typography>
        {errorMessage && (
          <Alert severity='error' sx={{ width: "100%" }}>
            Error: {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            variant='filled'
            fullWidth
            size='small'
            label='Username'
            autoFocus
            margin='normal'
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <TextField
            variant='filled'
            fullWidth
            size='small'
            label='Password'
            type='password'
            margin='normal'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            sx={{ mb: 4 }}
          />
          <Button
            fullWidth
            variant='contained'
            endIcon={<ArrowRightIcon />}
            type='submit'
            disabled={isLoading || !usernameInput || !passwordInput}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    );
  };

  return (
    <Container maxWidth='xs' sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      {renderLoginForm()}
    </Container>
  );
};

export default LoginPage;
