/*
 * ScheduleHeader.tsx
 * Date: November 3, 2025
 * Description: Header component for schedule builder with name, actions, and navigation
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Props for ScheduleHeader component
interface ScheduleHeaderProps {
  scheduleName: string;
  onScheduleNameChange: (name: string) => void;
}

// ScheduleHeader component
export default function ScheduleHeader(
  
  {
  scheduleName,
  onScheduleNameChange,
}: ScheduleHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Render schedule header
  return (

    <header className="schedule-header">
      <div className="schedule-header-left">
        {isEditing ? (
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => onScheduleNameChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="schedule-name-input"
            autoFocus
          />
        ) : (
          <h1 className="schedule-name" onClick={() => setIsEditing(true)}>
            {scheduleName}
          </h1>
        )}
      </div>

      {/* Profile dropdown menu */}
      <div className="schedule-header-right">
        <div className="profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
              <svg
            fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
  >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
          </button>

          {/* Profile menu items */}
          {showProfileMenu && (
            <div className="profile-menu">
              <button className="profile-menu-item">Settings</button>
              <button className="profile-menu-item" onClick={() => navigate("/dashboard")}>My Schedules</button>
              <button className="profile-menu-item" onClick={() => navigate("/login")}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
