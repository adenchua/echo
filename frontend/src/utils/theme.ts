import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import teal from "@mui/material/colors/teal";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/lato";

let theme = createTheme({
  typography: {
    fontFamily: ["lato", "roboto", "serif"].join(","),
  },
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
