/*
 * Router.tsx
 * Date: November 3, 2025
 * Description: Main routing configuration for the application
 */

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScheduleBuilder from "./pages/ScheduleBuilder";

export default function Router() {
  return (
    <Routes>
      {/* Authentication routes - standalone pages for now */}
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="/signup" element={<Signup />} /> {/* Signup page */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Dashboard - main landing page after login */}
      <Route path="/dashboard" element={<Dashboard />} />


      {/*
       * TEMPORARY: /builder route to access original course schedule builder
       * TODO: Remove this route once dashboard integration is complete
       */}
      <Route path="/builder" element={<ScheduleBuilder />} /> {/* Original course schedule builder (TEMPORARY) */}
      
                  {/* Catch-all route - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
