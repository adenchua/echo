import { Celebration } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { JSX, useMemo, useState, useTransition } from "react";
import { useNavigate } from "react-router";

import registerUser from "../api/users/registerUser";
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
        const newUser = await registerUser(usernameInput, passwordInput);
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
          <img src="/public/assets/wait_in_line.svg" height="360px" alt="sign up" />
        </Grid>
        <Grid size={6} sx={{ p: 12 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" mb={6}>
              Register an account with echo
            </Typography>
            {showError && (
              <BannerError sx={{ mb: 4 }}>Failed to register, please try again</BannerError>
            )}
            <TextField
              label="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              helperText="minimum 4 characters"
              sx={{ mb: 2 }}
              error={usernameError}
            />
            <Grid container spacing={1} mb={6}>
              <Grid size={6}>
                <TextField
                  label="Password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  helperText="minimum 8 characters"
                  error={passwordError}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Confirm password"
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  helperText={confirmPasswordError ? "Password must match" : ""}
                  error={confirmPasswordError}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex" }}>
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
