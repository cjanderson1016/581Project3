/*
 * main.tsx
 * Date: October 28, 2025
 * Description: Application entry point with React Router setup
 *
 * NOTE: Routing is enabled here to allow viewing/testing of login/signup pages
 * The /builder route is temporary to keep the original course builder accessible
 * This routing setup will be replaced when dashboard integration is implemented
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Router";

const rootElement = document.getElementById("root"); // Get root DOM element

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter> {/* Enable client-side routing for login/signup pages */}
      <Router /> {/* Main routing component */}
    </BrowserRouter>
  </StrictMode>
);
