import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enAU } from "date-fns/locale/en-AU";

import App from "./App";
import theme from "./utils/theme";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </LocalizationProvider>
);
