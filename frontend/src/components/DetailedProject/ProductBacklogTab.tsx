import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import FilterIcon from "@mui/icons-material/FilterList";

import ProjectInterface from "../../types/ProjectInterface";
import ProductBacklogTicket from "../ProductBacklogTicket";

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
      <ProductBacklogTicket />
    </div>
  );
};

export default ProductBacklogTab;
