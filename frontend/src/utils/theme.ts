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
