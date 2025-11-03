/*
 * Router.tsx
 * Date: November 3, 2025
 * Description: Main routing configuration for the application
 */

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import App from "./App";

export default function Router() {
  return (
    <Routes>
      {/* Default route - redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard - main landing page after login */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Schedule Builder - the existing course builder */}
      <Route path="/builder" element={<App />} />

      {/* Catch-all route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
