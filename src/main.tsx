import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { HelmetProvider } from "react-helmet-async";
import { GrobalStyles } from "./style/global-style";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <GrobalStyles />
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
