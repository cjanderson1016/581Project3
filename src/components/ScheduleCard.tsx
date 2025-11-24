/*
 * ScheduleCard.tsx
 * Date: November 3, 2025
 * Description: Card component displaying saved schedule with mini preview
 */

import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

interface ScheduleCardProps {
  title?: string;
  lastEdited?: string;
  isEmpty?: boolean;
  scheduleId?: number;
}

export default function ScheduleCard({
  title = "Untitled Schedule",
  lastEdited = "Never",
  isEmpty = false,
  scheduleId,
}: ScheduleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isEmpty && scheduleId) {
      // Navigate to the schedule editor page for this schedule
      navigate(`/builder/${scheduleId}`);
    }
  };

  return (
    <div
      className={`schedule-card ${isEmpty ? "empty-card" : ""}`}
      onClick={handleClick}
    >
      {!isEmpty ? (
        <>
          <div className="schedule-preview">
            {/* Mini schedule grid preview - simplified version of auth illustration */}
            <div className="preview-grid">
              <div className="preview-block" style={{ top: "15%", left: "10%", height: "30%", width: "15%" }}></div>
              <div className="preview-block" style={{ top: "20%", left: "30%", height: "25%", width: "15%" }}></div>
              <div className="preview-block" style={{ top: "50%", left: "10%", height: "20%", width: "15%" }}></div>
              <div className="preview-block" style={{ top: "10%", left: "50%", height: "35%", width: "15%" }}></div>
              <div className="preview-block" style={{ top: "55%", left: "50%", height: "25%", width: "15%" }}></div>
              <div className="preview-block" style={{ top: "25%", left: "70%", height: "30%", width: "15%" }}></div>
            </div>
          </div>
          <div className="schedule-info">
            <h3 className="schedule-title">{title}</h3>
            <p className="schedule-meta">Last edited: {lastEdited}</p>
          </div>
        </>
      ) : (
        <div className="empty-card-content">
          <p>No schedule</p>
        </div>
      )}
    </div>
  );
}
