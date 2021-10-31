import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const SprintBacklogTicket = (): JSX.Element => {
  return (
    <Paper
      sx={{
        borderBottom: "1px solid",
        borderColor: "grey.200",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0px 16px",
        overflowX: "hidden",
      }}
      square
      elevation={0}
    >
      <Box sx={{ padding: "8px 0px" }} flexGrow={1}>
        <Typography variant='body2' noWrap sx={{ maxWidth: "1200px", flexShrink: 1 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </Typography>
      </Box>
      <Box sx={{ padding: "8px 0px" }}>
        <Avatar style={{ height: 32, width: 32 }}></Avatar>
      </Box>
      <Box
        sx={{ height: 48, width: 120, backgroundColor: "success.light", cursor: "pointer", flexShrink: 0 }}
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography color='#FFF' variant='body2' noWrap>
          Done
        </Typography>
      </Box>
      <Box sx={{ padding: "8px 0px" }}>
        <Chip label='Dec 13' />
      </Box>
      <div />
    </Paper>
  );
};

export default SprintBacklogTicket;
