import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";

import { DRAWER_WIDTH, TICKET_DRAWER_WIDTH } from "../utils/constants";

interface TicketNavbarWrapperProps {
  isTicketSelected: boolean;
  children: React.ReactNode;
}

const TicketNavbarWrapper = (props: TicketNavbarWrapperProps): JSX.Element => {
  const { children, isTicketSelected } = props;
  return (
    <AppBar
      position='fixed'
      sx={{
        mt: "65px",
        width: { lg: `calc(100% - ${DRAWER_WIDTH}px - ${isTicketSelected ? TICKET_DRAWER_WIDTH : 0}px)` },
        ml: { lg: `${DRAWER_WIDTH}px` },
        mr: isTicketSelected ? `${TICKET_DRAWER_WIDTH}px` : "",
      }}
      elevation={0}
    >
      <Paper
        sx={{
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          gap: 2,
        }}
        elevation={0}
        square
      >
        {children}
      </Paper>
    </AppBar>
  );
};

export default TicketNavbarWrapper;
