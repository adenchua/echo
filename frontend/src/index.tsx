import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import auLocale from "date-fns/locale/en-AU";

import App from "./App";
import theme from "./utils/theme";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={auLocale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
