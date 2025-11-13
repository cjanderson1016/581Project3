/*
 * Signup.tsx
 * Date: October 28, 2025
 * Description: User registration page with form validation and navigation to login
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "../components/AuthIllustration";
import "../styles/Auth.css";
import AxiosInstance from "../components/AxiosInstance";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Passwords the userputs in must match
    if (password !== confirmPassword){
      setError ("Need matching passwords!")
      return;
    }

    // POST the user's data to the Register data model Uses AxiosInstance.tsx in the components folder
    const api_response = await AxiosInstance.post("/api/register/",{
      full_name: name,
      email,
      password
    });
    //Successful registration. User goes to login page
    console.log("User Registered!");
    navigate("/login"); 
    /*
     * TODO: Implement user registration logic
     *
     * 1. Email Validation:
 
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
     */

    // TEMPORARY: Navigate to /builder page without validation
    // TODO: Replace with proper validation, authentication and navigate to dashboard
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
 
               */}
            </div>

            {/*

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
