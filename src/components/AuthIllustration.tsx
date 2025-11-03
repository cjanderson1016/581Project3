/*
 * AuthIllustration.tsx
 * Date: October 28, 2025
 * Description: Abstract weekly schedule visualization for login/signup pages
 */

import "../styles/AuthIllustration.css";

export default function AuthIllustration() {
  return (
    <div className="illustration-container">
      <div className="schedule-mockup">
        {/* Day labels above each column */}
        <div className="day-label" style={{ left: '3%' }}>M</div>
        <div className="day-label" style={{ left: '22%' }}>T</div>
        <div className="day-label" style={{ left: '41%' }}>W</div>
        <div className="day-label" style={{ left: '60%' }}>TH</div>
        <div className="day-label" style={{ left: '79%' }}>F</div>

        {/* Abstract time blocks representing a 5-day weekly schedule - well spaced */}

        {/* Monday blocks - far left */}
        <div className="time-block block-1" style={{ top: '10%', left: '3%', height: '25%', width: '10%' }}></div>
        <div className="time-block block-2" style={{ top: '42%', left: '3%', height: '20%', width: '10%' }}></div>
        <div className="time-block block-11" style={{ top: '70%', left: '3%', height: '18%', width: '10%' }}></div>

        {/* Tuesday blocks */}
        <div className="time-block block-3" style={{ top: '15%', left: '22%', height: '30%', width: '10%' }}></div>
        <div className="time-block block-4" style={{ top: '50%', left: '22%', height: '25%', width: '10%' }}></div>

        {/* Wednesday blocks - center */}
        <div className="time-block block-5" style={{ top: '8%', left: '41%', height: '22%', width: '10%' }}></div>
        <div className="time-block block-6" style={{ top: '38%', left: '41%', height: '28%', width: '10%' }}></div>
        <div className="time-block block-12" style={{ top: '74%', left: '41%', height: '16%', width: '10%' }}></div>

        {/* Thursday blocks */}
        <div className="time-block block-7" style={{ top: '12%', left: '60%', height: '27%', width: '10%' }}></div>
        <div className="time-block block-8" style={{ top: '45%', left: '60%', height: '23%', width: '10%' }}></div>

        {/* Friday blocks - far right */}
        <div className="time-block block-9" style={{ top: '18%', left: '79%', height: '24%', width: '10%' }}></div>
        <div className="time-block block-10" style={{ top: '48%', left: '79%', height: '20%', width: '10%' }}></div>
        <div className="time-block block-13" style={{ top: '76%', left: '79%', height: '15%', width: '10%' }}></div>
      </div>

      <div className="illustration-text">
        <p>Plan your courses with ease</p>
      </div>
    </div>
  );
}
