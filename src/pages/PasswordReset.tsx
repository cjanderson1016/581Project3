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

export default function PasswordReset() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError("Need matching passwords!");
        alert("Passwords must match!")
        return;
    }

    try {
        await AxiosInstance.post("/api/reset-pass/", {
        email,
        password,
        });

        alert("Password successfully changed!");
        navigate("/login");
    } catch (error) {
        console.error(error);
        alert("Could not reset password!");
    }

  };

  return (
    <div className="auth-container">
      {/* Left side - Signup form */}
      <div className="auth-left-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Reset Password</h1>
            <h3>Enter your email and confirm password</h3>
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
              {/*
               */}
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
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
              <label htmlFor="confirmPassword">Confirm New Password</label>
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
              Reset Password
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
