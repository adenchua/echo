import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import FilterIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import BugIcon from "@mui/icons-material/BugReport";
import HighPriorityIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";

import ProjectInterface from "../../types/ProjectInterface";

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const renderMobileHeaderButtons = (): JSX.Element => {
    return (
      <>
        <IconButton
          color='primary'
          sx={{ display: { sm: "none" }, border: "1px solid", borderRadius: "4px" }}
          size='small'
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color='primary'
          sx={{ display: { sm: "none" }, border: "1px solid", borderRadius: "4px" }}
          size='small'
        >
          <FilterIcon />
        </IconButton>
      </>
    );
  };

  const renderDesktopHeaderButtons = (): JSX.Element => {
    return (
      <>
        <Button
          startIcon={<AddIcon />}
          variant='outlined'
          sx={{ minWidth: "128px", minHeight: "40px", display: { xs: "none", sm: "flex" } }}
        >
          Add Ticket
        </Button>
        <Button
          startIcon={<FilterIcon />}
          variant='outlined'
          sx={{
            minWidth: "128px",
            justifyContent: "flex-start",
            minHeight: "40px",
            display: { xs: "none", sm: "flex" },
          }}
        >
          Filter
        </Button>
      </>
    );
  };

  const renderBacklogTicket = (): JSX.Element => {
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

  return (
    <div>
      <Typography variant='h5' paragraph>
        Product Backlog
      </Typography>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        {renderDesktopHeaderButtons()}
        {renderMobileHeaderButtons()}
        <TextField placeholder='Search...' size='small' />
      </Box>
      {renderBacklogTicket()}
      {renderBacklogTicket()}
      {renderBacklogTicket()}
      {renderBacklogTicket()}
      {renderBacklogTicket()}
      {renderBacklogTicket()}
    </div>
  );
};

export default ProductBacklogTab;
