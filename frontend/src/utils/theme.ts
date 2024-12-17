import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import teal from "@mui/material/colors/teal";

let theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        inputProps: { style: { padding: 7 } },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 100,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
