import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import auLocale from "date-fns/locale/en-AU";

import App from "./App";
import theme from "./utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={DateAdapter} locale={auLocale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
