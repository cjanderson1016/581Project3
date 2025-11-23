/*
 * Settings.tsx
 * Date: November 23, 2025
 * Description: User settings page for updating profile name and password
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance";
import type { User } from "../models/User";
import "../styles/Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Name update form
  const [newName, setNewName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");

  // Password update form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("session_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await AxiosInstance.get("/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        setNewName(response.data.full_name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setNameSuccess("");

    if (!newName.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    setNameLoading(true);

    try {
      const token = localStorage.getItem("session_token");
      await AxiosInstance.post(
        "/api/update-profile/",
        { full_name: newName },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setNameSuccess("Name updated successfully!");
      setUser({ ...user!, full_name: newName });
    } catch (error) {
      console.error("Failed to update name:", error);
      setNameError("Failed to update name. Please try again.");
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      const token = localStorage.getItem("session_token");
      await AxiosInstance.post(
        "/api/change-password/",
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setPasswordSuccess("Password updated successfully!");
      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Failed to update password:", error);
      if (error.response?.data?.error) {
        setPasswordError(error.response.data.error);
      } else {
        setPasswordError("Failed to update password. Please try again.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="settings-container">
        <div className="settings-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-content">
        <div className="settings-header">
          <button onClick={() => navigate("/dashboard")} className="back-button">
            ← Back to Dashboard
          </button>
          <h1 className="settings-title">Account Settings</h1>
        </div>

        {/* Update Name Section */}
        <div className="settings-section">
          <h2 className="section-title">Update Name</h2>
          <form onSubmit={handleNameUpdate} className="settings-form">
            <div className="form-group">
              <label htmlFor="current-name">Current Name</label>
              <input
                id="current-name"
                type="text"
                value={user.full_name}
                disabled
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-name">New Name</label>
              <input
                id="new-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your new name"
                className="form-input"
                disabled={nameLoading}
              />
            </div>

            {nameError && <div className="error-message">{nameError}</div>}
            {nameSuccess && <div className="success-message">{nameSuccess}</div>}

            <button
              type="submit"
              className="settings-button"
              disabled={nameLoading || newName === user.full_name}
            >
              {nameLoading ? "Updating..." : "Update Name"}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="settings-section">
          <h2 className="section-title">Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="settings-form">
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="form-input"
                disabled={passwordLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="form-input"
                disabled={passwordLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="form-input"
                disabled={passwordLoading}
              />
            </div>

            {passwordError && <div className="error-message">{passwordError}</div>}
            {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

            <button
              type="submit"
              className="settings-button"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
