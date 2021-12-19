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
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        inputProps: {
          style: {
            fontSize: 14,
          },
        },
        InputProps: {
          style: {
            borderRadius: 0,
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
