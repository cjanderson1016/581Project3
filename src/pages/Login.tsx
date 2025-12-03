/*
 * Login.tsx
 * Date: October 28, 2025
 * Description: Login page component with email/password form and navigation to signup
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "../components/AuthIllustration";
import "../styles/Auth.css";
import AxiosInstance from "../components/AxiosInstance";
import React, { useEffect } from 'react';

import Alert from "../components/Alerts"
import "../styles/Alerts.css"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert ] = useState(false);


  localStorage.removeItem("session_token")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Authenticate the user's login request. Uses AxiosInstance.tsx in the components folder
    try{
  
    const authenticate = await AxiosInstance.post("/api/login/",{
    email,
    password
    });
    //Successful login, should prob implement some errors at some point 
    console.log("Login attempt with:", { email, password }); 
    const token = authenticate.data.token;
    localStorage.setItem("session_token", token);
    console.log("token:", token)

    navigate("/dashboard");  // Go to dashboard

    } catch (error){

      alert("Invalid Email or Password!\nPlease try again...")
      
    }

  };

  return (
    <div className="auth-container">
      {/* Left side - Login form */}
      <div className="auth-left-side">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Course Semester Planner</h1>
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
                <p>
                  {" "}
                  <Link to="/reset">
                    Forgot Password?
                  </Link>
                </p>
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
