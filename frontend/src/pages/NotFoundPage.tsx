import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NotFoundPage = (): JSX.Element => {
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
      <Button component={Link} to="/home" sx={{ fontSize: 24 }}>
        Take me home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
