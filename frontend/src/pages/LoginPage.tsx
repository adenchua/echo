import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const renderLoginForm = (): JSX.Element => {
    return (
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant='h6' sx={{ mb: 8 }}>
          Login to Echo
        </Typography>
        <TextField fullWidth size='small' label='Username' sx={{ mb: 3 }} autoFocus />
        <TextField fullWidth size='small' label='Password' type='password' sx={{ mb: 6 }} />
        <Button fullWidth variant='contained' endIcon={<ArrowRightIcon />} component={Link} to='/home'>
          Login
        </Button>
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
