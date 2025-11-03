/*
 * main.tsx
 * Date: November 3, 2025
 * Description: Application entry point with React Router setup
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
