import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import Navbar from "./Navbar";
import { DRAWER_WIDTH } from "../../utils/constants";

interface PageLayoutWrapperProps {
  children: React.ReactNode;
  disablePadding?: boolean;
  toolbarContent?: React.ReactNode;
}

const PageLayoutWrapper = (props: PageLayoutWrapperProps) => {
  const { children, toolbarContent, disablePadding = false } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderHamburgerIcon = () => {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { lg: "none" } }}
      >
        <MenuIcon />
      </IconButton>
    );
  };

  const renderToolbarContent = () => {
    if (toolbarContent) {
      return (
        <>
          {renderHamburgerIcon()}
          {toolbarContent}
        </>
      );
    }

    return <>{renderHamburgerIcon()}</>;
  };

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { lg: `${DRAWER_WIDTH}px` },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
        color="inherit"
        elevation={0}
      >
        <Toolbar>{renderToolbarContent()}</Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
        >
          <Navbar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
          open
        >
          <Navbar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: disablePadding ? 0 : 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mb: 10,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default PageLayoutWrapper;
