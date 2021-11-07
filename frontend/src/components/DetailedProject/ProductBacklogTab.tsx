import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ProjectInterface from "../../types/ProjectInterface";
import ProductBacklogTicket from "../ProductBacklogTicket";
import useProductBacklog from "../../hooks/useProductBacklog";
import CreateTicketButtonWithDialog from "../CreateTicketButtonWithDialog";

interface ProductBacklogTabProps {
  project: ProjectInterface;
}

const ProductBacklogTab = (props: ProductBacklogTabProps): JSX.Element => {
  const { project } = props;
  const { backlogIds, _id: projectId } = project;
  const { tickets, isLoading, onAddTicket, onUpdateTicket } = useProductBacklog(backlogIds);
  const [searchInput, setSearchInput] = useState<string>("");

  const renderMobileHeaderButtons = (): JSX.Element => {
    return (
      <>
        <CreateTicketButtonWithDialog projectId={projectId} variant='mobile' onAddTicket={onAddTicket} />
        {/* <IconButton
          color='primary'
          sx={{ display: { sm: "none" }, border: "1px solid", borderRadius: "4px" }}
          size='small'
        >
          <FilterIcon />
        </IconButton> */}
      </>
    );
  };

  const renderDesktopHeaderButtons = (): JSX.Element => {
    return (
      <>
        <CreateTicketButtonWithDialog projectId={projectId} variant='desktop' onAddTicket={onAddTicket} />
        {/* <Button
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
        </Button> */}
      </>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Typography variant='h5' paragraph>
        Product Backlog
      </Typography>
      <Box display='flex' alignItems='center' gap={2} mb={3}>
        {renderDesktopHeaderButtons()}
        {renderMobileHeaderButtons()}
        <TextField
          placeholder='Search...'
          size='small'
          margin='none'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Box>
      {tickets.map((ticket) => {
        if (ticket.title.toLowerCase().includes(searchInput.toLowerCase())) {
          return <ProductBacklogTicket ticket={ticket} key={ticket._id} onUpdateTicket={onUpdateTicket} />;
        }
        return null;
      })}
      {tickets && tickets.length === 0 && (
        <Typography variant='body2' color='GrayText'>
          There are no tickets in the backlog.
        </Typography>
      )}
    </>
  );
};

export default ProductBacklogTab;
