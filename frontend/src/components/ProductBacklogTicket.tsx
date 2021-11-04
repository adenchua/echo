import React from "react";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import BugIcon from "@mui/icons-material/BugReport";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";

const ProductBacklogTicket = (): JSX.Element => {
  const renderDesktopTicket = (): JSX.Element => {
    return (
      <Paper
        sx={{
          "&:hover": {
            backgroundColor: "grey.50",
          },
          borderBottom: "1px solid",
          borderColor: "grey.200",
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "0px 8px",
        }}
        square
        elevation={0}
      >
        <Checkbox defaultChecked size='small' />
        <IconButton size='small' color='error'>
          <HighPriorityIcon />
        </IconButton>
        <IconButton size='small' color='error' disabled>
          <BugIcon color='error' fontSize='small' />
        </IconButton>
        <Typography variant='body2' noWrap>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s,
        </Typography>
      </Paper>
    );
  };

  const renderMobileTicket = (): JSX.Element => {
    return (
      <Paper sx={{ marginBottom: 1, padding: 1 }} elevation={0}>
        <Box display='flex' alignItems='center' gap={1} mb={1}>
          <HighPriorityIcon color='error' />
          <BugIcon color='error' fontSize='small' />
          <Box flexGrow={1} />
          <Chip label='In Sprint' size='small' />
        </Box>
        <Typography variant='body2'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s,
        </Typography>
      </Paper>
    );
  };
  return (
    <>
      <Hidden mdDown>{renderDesktopTicket()}</Hidden>
      <Hidden mdUp>{renderMobileTicket()}</Hidden>
    </>
  );
};

export default ProductBacklogTicket;
