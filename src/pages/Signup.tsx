/*
 * Signup.tsx
 * Date: October 28, 2025
 * Description: User registration page with form validation and navigation to login
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "../components/AuthIllustration";
import "../styles/Auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /*
     * TODO: Implement user registration logic
     *
     * 1. Email Validation:
     *    - Must be a valid email format
     *    - Check if email matches required domain (e.g., @university.edu for students, @staff.university.edu for instructors)
     *    - Verify email doesn't already exist in database
     *
     * 2. Password Requirements:
     *    - Minimum 8 characters
     *    - Must contain at least one uppercase letter
     *    - Must contain at least one lowercase letter
     *    - Must contain at least one number
     *    - Must contain at least one special character (@$!%*?&)
     *    - Password and confirmPassword must match
     *
     * 3. Name Validation:
     *    - Required field
     *    - Minimum 2 characters
     *    - Only letters and spaces allowed
     *
     * 4. Send registration request to backend:
     *    - POST to Django endpoint: http://127.0.0.1:8000/api/auth/signup/
     *    - Send data: { name, email, password }
     *    - Backend should:
     *      - Hash password using bcrypt or similar
     *      - Create new user in database
     *      - Send verification email (optional)
     *      - Return authentication token
     *
     * 5. Handle response:
     *    - On success:
     *      - Store authentication token in localStorage
     *      - Redirect to dashboard (will be implemented by dashboard team)
     *      - Optionally show success message or email verification prompt
     *    - On error:
     *      - Display appropriate error messages:
     *        - "Email already exists"
     *        - "Invalid email domain"
     *        - "Password does not meet requirements"
     *        - "Network error, please try again"
     *
     * 6. User Role Assignment:
     *    - Determine if user is student or instructor based on email domain
     *    - Students: Can create personal schedules
     *    - Instructors/Admin: Can create and manage courses globally
     *
     * 7. Security Considerations:
     *    - Implement CAPTCHA to prevent bot registrations
     *    - Rate limit signup attempts
     *    - Use HTTPS in production
     *    - Consider email verification before account activation
     */

    // TEMPORARY: Navigate to /builder page without validation
    // TODO: Replace with proper validation, authentication and navigate to dashboard
    console.log("Signup attempt with:", { name, email, password }); // Log signup data for debugging
    navigate("/dashboard"); // Bypass validation and go to builder (TEMPORARY)
  };

  return (
    <div className="auth-container">
      {/* Left side - Signup form */}
      <div className="auth-left-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Course Schedule Builder</h1>
            <h2>Create Account</h2>
            <p>Join us to start building your course schedule</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="form-input"
              />
            </div>

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
              {/*
               * TODO: Add real-time email validation
               * - Show green checkmark if valid domain
               * - Show red X if invalid domain
               * - Display helper text: "Must use university email address"
               */}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="form-input"
              />
              {/*
               * TODO: Add password strength indicator
               * - Show strength meter (weak/medium/strong)
               * - Display requirements checklist:
               *   ✓ At least 8 characters
               *   ✓ Contains uppercase letter
               *   ✓ Contains lowercase letter
               *   ✓ Contains number
               *   ✓ Contains special character
               */}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="form-input"
              />
              {/*
               * TODO: Add real-time password match validation
               * - Show green checkmark when passwords match
               * - Show red X when passwords don't match
               */}
            </div>

            {/*
             * TODO: Add Terms of Service and Privacy Policy checkboxes
             * - Required checkbox for terms acceptance
             * - Link to /terms and /privacy pages
             */}

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <div className="auth-redirect">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
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
