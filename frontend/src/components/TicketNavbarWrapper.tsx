import React from "react";
import Paper from "@mui/material/Paper";

interface TicketNavbarWrapperProps {
  children: React.ReactNode;
}

const TicketNavbarWrapper = (props: TicketNavbarWrapperProps): JSX.Element => {
  const { children } = props;
  return (
    <Paper
      sx={{
        px: 3,
        py: 1,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "divider",
        gap: 1,
      }}
      elevation={0}
    >
      {children}
    </Paper>
  );
};

export default TicketNavbarWrapper;
