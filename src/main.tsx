import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
);
