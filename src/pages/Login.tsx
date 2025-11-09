/*
 * Login.tsx
 * Date: October 28, 2025
 * Description: Login page component with email/password form and navigation to signup
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "../components/AuthIllustration";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /*
     * TODO: Implement authentication logic
     *
     * 1. Email Validation:
     *    - Check if email matches required domain (e.g., must be @university.edu)
     *    - Validate email format using regex
     *
     * 2. Send login request to backend:
     *    - POST to Django endpoint: http://127.0.0.1:8000/api/auth/login/
     *    - Send credentials: { email, password }
     *    - Backend should verify credentials against database
     *
     * 3. Handle response:
     *    - On success: Store authentication token (JWT) in localStorage or cookies
     *    - Redirect to dashboard (will be implemented by dashboard team)
     *    - Set user session/context
     *
     * 4. Error handling:
     *    - Display error message for invalid credentials
     *    - Handle network errors
     *    - Show specific messages (e.g., "Invalid email or password", "Account not found")
     *
     * 5. Security considerations:
     *    - Implement rate limiting for login attempts
     *    - Add CAPTCHA after multiple failed attempts
     *    - Use HTTPS in production
     */

    // TEMPORARY: Navigate to /builder page without validation
    // TODO: Replace with proper authentication and navigate to dashboard
    console.log("Login attempt with:", { email, password }); // Log credentials for debugging
    navigate("/dashboard"); // Bypass validation and go to builder (TEMPORARY)
  };

  return (
    <div className="auth-container">
      {/* Left side - Login form */}
      <div className="auth-left-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Course Schedule Builder</h1>
            <h2>Welcome Back</h2>
            <p>Sign in to manage your course schedule</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="form-input"
              />
              {/* TODO: Add email domain validation hint */}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            {/*
             * TODO: Add "Forgot Password?" link
             * - Route to /forgot-password page
             * - Implement password reset flow via email
             */}
            <div className="form-footer">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>

          <div className="auth-redirect">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Schedule illustration */}
      <div className="auth-right-side">
        <AuthIllustration />
      </div>
    </div>
  );
}
