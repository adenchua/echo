import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import teal from "@mui/material/colors/teal";
import { Navigate, useNavigate } from "react-router";
import { JSX } from "react";

import FeatureCard from "../components/FeatureCard";
import Grow from "../components/common/Grow";
import PageLayoutWrapper from "../components/common/PageLayoutWrapper";
import Slide from "../components/common/Slide";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";
import Button from "../components/common/Button";

const HomePage = (): JSX.Element => {
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");
  const navigate = useNavigate();

  if (!loggedInUserId) {
    return <Navigate to="/" />;
  }

  return (
    <PageLayoutWrapper>
      <Grid container justifyContent="space-around" spacing={4} mb={12} mt={2}>
        <Grid>
          <Slide direction="right">
            <Typography variant="h4" gutterBottom>
              Project management made easy
            </Typography>
          </Slide>
          <Slide direction="right">
            <Typography align="justify" mb={4}>
              Designed for software development teams working on multiple products.{" "}
              <span style={{ color: teal[300] }}>echo</span> facilitates better planning,
              communication and workflow among teams. Built with passion and coffee.
            </Typography>
          </Slide>
          <Slide direction="right">
            <Button onClick={() => navigate("/projects")}>Start a new project</Button>
          </Slide>
        </Grid>
        <Grid>
          <Slide direction="left">
            <img src="/public/assets/landing_collab.svg" height="360px" alt="project collab" />
          </Slide>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="stretch">
        <Grid>
          <Grow>
            <div style={{ height: "100%" }}>
              <FeatureCard
                title="Release better products"
                secondaryTitle="With greater visibility, prioritise and develop what is truly important for your customers."
              />
            </div>
          </Grow>
        </Grid>
        <Grid>
          <Grow>
            <div style={{ height: "100%" }}>
              <FeatureCard
                title="Scrum ready"
                secondaryTitle="Manage priorities, assignments and deadlines with built-in easy-to-use interface designed for scrum methodology."
              />
            </div>
          </Grow>
        </Grid>
        <Grid>
          <Grow>
            <div style={{ height: "100%" }}>
              <FeatureCard
                title="Increased transparency"
                secondaryTitle="View and track assignments across different projects easily. Less remembering, more actual work done."
              />
            </div>
          </Grow>
        </Grid>
      </Grid>
    </PageLayoutWrapper>
  );
};

export default HomePage;
