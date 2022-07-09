import React from "react";
import { Redirect } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import teal from "@mui/material/colors/teal";
import DoneIcon from "@mui/icons-material/DoneOutlineOutlined";

import PageLayoutWrapper from "../components/common/PageLayoutWrapper";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_UID_KEY } from "../utils/constants";

const HomePage = (): JSX.Element => {
  const { storedValue: loggedInUserId } = useLocalStorage(LOCAL_STORAGE_UID_KEY, "");

  if (!loggedInUserId) {
    return <Redirect to='/' />;
  }

  const renderFeatureCard = (title: string, subtitle: string): JSX.Element => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DoneIcon fontSize='large' sx={{ mb: 2 }} color='primary' />
        <Typography variant='h6' paragraph color='primary' align='center'>
          {title}
        </Typography>
        <Typography align='center'>{subtitle}</Typography>
      </Paper>
    );
  };

  return (
    <PageLayoutWrapper>
      <Paper elevation={0} sx={{ bgcolor: "grey.800", px: 6, py: 8 }}>
        <Typography
          sx={{ maxWidth: "60%", margin: "auto" }}
          variant='h2'
          align='center'
          color='primary.light'
          fontWeight={400}
        >
          echo<span style={{ color: "orange" }}>.yl</span>
        </Typography>
        <Typography sx={{ color: "#FFF", maxWidth: "50%", marginX: "auto" }} variant='h3' align='center'>
          Plan, manage and track all your tasks in one place.
        </Typography>

        <Grid container mt={14} justifyContent='space-between' spacing={4}>
          <Grid item xs={12} lg={5}>
            <Typography sx={{ color: "#FFF" }} fontSize={20} align='justify'>
              <span style={{ color: teal[300] }}>echo</span> is a project management tool designed for software
              development teams working on multiple projects. With productivity-boosting features and increased
              visibility on all tasks, <span style={{ color: teal[300] }}>echo</span> facilitates better planning,
              communication and workflow among teams. Built with passion and coffee.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img src='/assets/landing_collab.svg' height='360px' alt='project collab' />
          </Grid>
        </Grid>

        <Grid
          container
          mt={10}
          justifyContent='space-evenly'
          alignItems='stretch'
          spacing={4}
          sx={{ maxWidth: "80%", marginX: "auto" }}
        >
          <Grid item xs={12} lg={4}>
            {renderFeatureCard(
              "Release better products",
              "With greater visibility, prioritise and develop what is truly important for your customers."
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            {renderFeatureCard(
              "Scrum ready",
              "Manage priorities, assignments and deadlines with built-in easy-to-use interface designed for scrum methodology."
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            {renderFeatureCard(
              "Increased transparency",
              "View and track assignments across different projects easily. Less remembering, more actual work done."
            )}
          </Grid>
        </Grid>
      </Paper>
    </PageLayoutWrapper>
  );
};

export default HomePage;
