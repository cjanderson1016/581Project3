/*
 * Dashboard.tsx
 * Date: November 3, 2025
 * Description: Main dashboard page showing saved schedules and create new option
 */

import { useState, useEffect } from "react";
import NewScheduleCard from "../components/NewScheduleCard";
import ScheduleCard from "../components/ScheduleCard";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../services/userService";
import { fetchSchedule } from "../services/scheduleService";
import {isAdmin} from "../components/isAdmin"

// Interface for saved schedule data -- only includes fields needed for display
interface SavedSchedule {
  id: number;
  title: string;
  lastEdited: string;
}

export default function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const [savedSchedules, setSavedSchedules] = useState<SavedSchedule[]>([]);
  const [user, setUser] = useState<any>(null);

  // The following runs once on component mount to fetch user info and schedules
  useEffect(() => {
    // Load user and their saved schedules
    const loadUserAndSchedules = async () => {
      const token = localStorage.getItem("session_token"); // Get token from local storage
      try {
        const u = await fetchCurrentUser(token || undefined); // Fetch current user
        setUser(u); // Set user state

        const ids: number[] = Array.isArray(u?.schedule_ids) // Extract the user's schedule IDs
          ? u.schedule_ids
          : [];
        if (ids.length > 0) {
          // If user has saved schedules, fetch their details
          const schedules = await Promise.all(
            ids.map(async (id) => {
              try {
                const s = await fetchSchedule(id); // Fetch schedule details
                return {
                  id: s.id,
                  title: s.schedule_title,
                  lastEdited: s.last_updated_date,
                } as SavedSchedule;
              } catch (err) {
                // Handle schedule fetch errors
                console.error(`Failed to fetch schedule ${id}:`, err);
                return null;
              }
            })
          );

          setSavedSchedules(schedules.filter((s): s is SavedSchedule => !!s)); // Update state with fetched schedules
        }
      } catch (err) {
        // Handle user fetch errors
        console.error("Unable to find user:", err);
      }
    };

    loadUserAndSchedules(); // Invoke the async function to load data
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle profile icon click to toggle menu
  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu); // Toggle menu visibility
    console.log("Profile clicked");
  };

  // Generate empty placeholder cards to fill the grid
  const emptyCardsCount = Math.max(0, 7 - savedSchedules.length);
  const emptyCards = Array.from({ length: emptyCardsCount }, (_, i) => i);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">My Schedules</h1>
        </div>
        <div className="header-right">
  
            {isAdmin(user) ? 
            <div className="display-admin">
            <p>Welcome, Admin</p>
            </div> : 
            <div className="display-user-fullname">
            <p>Welcome, {user?.full_name}</p>
            </div>}
          <div className="profile-dropdown">
            <div className="profile-icon" onClick={handleProfileClick}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <button
                  className="profile-menu-item"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>
                {isAdmin(user) && (
                                  <button
                  className="profile-menu-item"
                  onClick={() => navigate("/elevate")}
                >
                  Elevate User
                </button>
                )}
                <button
                  className="profile-menu-item"
                  onClick={() => navigate("/login")}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Schedules Grid */}
      <main className="dashboard-main">
        <div className="schedules-grid">
          {/* Create New Schedule Card */}
          <NewScheduleCard />

          {/* Saved Schedules */}
          {savedSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              scheduleId={schedule.id}
              title={schedule.title}
              lastEdited={schedule.lastEdited}
            />
          ))}

          {/* Empty Placeholder Cards */}
          {emptyCards.map((index) => (
            <ScheduleCard key={`empty-${index}`} isEmpty={true} />
          ))}
        </div>
      </main>
    </div>
  );
}
