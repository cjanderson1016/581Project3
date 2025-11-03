/*
 * NewScheduleCard.tsx
 * Date: November 3, 2025
 * Description: Card component with "+" button to create new schedules
 */

import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function NewScheduleCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the schedule builder page
    navigate("/builder");
  };

  return (
    <div className="schedule-card new-schedule-card" onClick={handleClick}>
      <div className="new-schedule-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <p className="new-schedule-text">Create New Schedule</p>
    </div>
  );
}
