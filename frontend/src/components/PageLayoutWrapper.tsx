import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Navbar from "./Navbar";

const DRAWER_WIDTH = 240;

interface PageLayoutWrapperProps {
  children: React.ReactNode;
  disablePadding?: boolean;
  toolbarContent?: React.ReactNode;
}

const PageLayoutWrapper = (props: PageLayoutWrapperProps): JSX.Element => {
  const { children, toolbarContent, disablePadding = false } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderHamburgerIcon = (): JSX.Element => {
    return (
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
    );
  };

  const renderToolbarContent = (): JSX.Element => {
    if (toolbarContent) {
      return (
        <>
          {renderHamburgerIcon()}
          {toolbarContent}
        </>
      );
    }

    return (
      <>
        {renderHamburgerIcon()}
        <Typography variant='h6' noWrap component='div'>
          Echo
        </Typography>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position='fixed'
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
        color='inherit'
        elevation={0}
      >
        <Toolbar>{renderToolbarContent()}</Toolbar>
      </AppBar>
      <Box component='nav' sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
        >
          <Navbar />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
          open
        >
          <Navbar />
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: disablePadding ? 0 : 3, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default PageLayoutWrapper;
