import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { JSX } from "react";
import { useNavigate } from "react-router";

import Button from "../components/common/Button";

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 4,
      }}
    >
      <Typography variant="h2">404. Page Not Found.</Typography>
      <Button onClick={() => navigate("/home")}>Take me home</Button>
    </Container>
  );
};

export default NotFoundPage;
