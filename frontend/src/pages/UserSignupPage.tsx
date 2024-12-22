import { Celebration } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { JSX, useMemo, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import BackgroundImage from "../assets/wait_in_line.svg";

import registerAccount from "../api/authentication/registerAccount";
import BannerError from "../components/common/BannerError";
import Button from "../components/common/Button";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import Link from "../components/common/Link";
import TextField from "../components/common/TextField";
import RightArrowIcon from "../components/icons/RightArrowIcon";
import User from "../types/User";

const UserSignUpPage = (): JSX.Element => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const [showError, setShowError] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const usernameError = useMemo(
    () => usernameInput.length > 0 && usernameInput.length < 4,
    [usernameInput],
  );
  const passwordError = useMemo(
    () => passwordInput.length > 0 && passwordInput.length < 8,
    [passwordInput],
  );
  const confirmPasswordError = useMemo(
    () => passwordInput.length >= 0 && passwordInput !== confirmPasswordInput,
    [passwordInput, confirmPasswordInput],
  );

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    startTransition(async () => {
      try {
        setShowError(false);
        const newUser = await registerAccount(usernameInput, passwordInput);
        setUser(newUser);
      } catch {
        setShowError(true);
      }
    });
  }

  function handleCloseSuccessDialog(): void {
    setUser(null);
    setUsernameInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
  }

  return (
    <>
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
          <img src={BackgroundImage} height="360px" alt="sign up" />
        </Grid>
        <Grid size={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Paper
            sx={{
              maxWidth: 480,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            elevation={0}
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" mb={4}>
                Register an account with echo
              </Typography>
              {showError && (
                <BannerError sx={{ mb: 2 }}>Failed to register, please try again</BannerError>
              )}
              <TextField
                label="Username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                helperText="minimum 4 characters"
                sx={{ mb: 1 }}
                error={usernameError}
              />

              <TextField
                label="Password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                helperText="minimum 8 characters"
                error={passwordError}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Confirm password"
                type="password"
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                helperText={confirmPasswordError ? "Password must match" : ""}
                error={confirmPasswordError}
              />
              <Box sx={{ display: "flex", mt: 6 }}>
                <Box flexGrow={1} />
                <Button
                  color="secondary"
                  sx={{ mr: 1 }}
                  state={isLoading ? "disabled" : "default"}
                  onClick={() => navigate("/")}
                >
                  Return to login
                </Button>
                <Button
                  state={(function (): "disabled" | "default" | "loading" {
                    if (
                      usernameInput.length === 0 ||
                      passwordInput.length === 0 ||
                      confirmPasswordInput.length === 0 ||
                      usernameError ||
                      passwordError ||
                      confirmPasswordError
                    ) {
                      return "disabled";
                    }

                    if (isLoading) {
                      return "loading";
                    }

                    return "default";
                  })()}
                  type="submit"
                  endIcon={<RightArrowIcon />}
                >
                  Register
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <ConfirmationDialog
        isOpen={user != null}
        titleIcon={<Celebration />}
        title="Account registered successfully!"
        dialogContent={
          <Typography>
            Hello{" "}
            <Typography component="span" color="primary">
              @{usernameInput}
            </Typography>
            , welcome to echo! Click <Link onClick={() => navigate("/")}>here</Link> to return to
            the login page
          </Typography>
        }
        onClose={handleCloseSuccessDialog}
      />
    </>
  );
};

export default UserSignUpPage;
