/*
 * Router.tsx
 * Date: October 28, 2025
 * Description: Routing configuration for login and signup pages (standalone, not integrated with main app yet)
 *
 * NOTE: The /builder route is a TEMPORARY workaround to keep the original course schedule builder
 * accessible while we develop the login/signup pages. This route should be removed once someone
 * implements the proper dashboard integration. The login/signup pages do NOT navigate anywhere yet.
 */

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App";

export default function Router() {
  return (
    <Routes>
      {/* Authentication routes - standalone pages for now */}
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="/signup" element={<Signup />} /> {/* Signup page */}

      {/*
       * TEMPORARY: /builder route to access original course schedule builder
       * TODO: Remove this route once dashboard integration is complete
       */}
      <Route path="/builder" element={<App />} /> {/* Original course schedule builder (TEMPORARY) */}

      {/* Default route - show login page */}
      <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root to login */}

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} /> {/* Handle 404s */}
    </Routes>
  );
}
