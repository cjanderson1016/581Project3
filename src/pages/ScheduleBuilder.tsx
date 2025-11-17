/*
 * ScheduleBuilder.tsx
 * Date: November 3, 2025
 * Description: Main schedule builder page with weekly calendar grid
 */

import { useState, useEffect } from "react";
import ScheduleHeader from "../components/ScheduleHeader";
import CalendarView from "../components/CalendarView";
import SelectedCoursesList from "../components/SelectedCoursesList";
import CourseSearchResults from "../components/CourseSearchResults";
import type { Course } from "../models/Course";
import { searchCourses } from "../services/courseService";
import "../styles/ScheduleBuilder.css";
import { generateSchedules } from "../utils/scheduleGenerator";

export default function ScheduleBuilder() {
  const [scheduleName, setScheduleName] = useState("Schedule Builder");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [possibleSchedules, setPossibleSchedules] = useState<Course[][]>([]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  // Search courses with debouncing
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // Query the backend for results
          const results = await searchCourses(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching courses:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Recompute possible schedules whenever selected courses change
  useEffect(() => {
    if (selectedCourses.length === 0) {
      setPossibleSchedules([]);
      setCurrentScheduleIndex(0);
      return;
    }

    const schedules = generateSchedules(selectedCourses);
    setPossibleSchedules(schedules);
    setCurrentScheduleIndex(0);
  }, [selectedCourses]);

  const handleAddCourse = (course: Course) => {
    // Check if course is already added
    const isDuplicate = selectedCourses.some((c) => c.id === course.id);
    if (!isDuplicate) {
      setSelectedCourses([...selectedCourses, course]);
      // Clear search after adding
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleRemoveCourse = (courseId: number) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  const handleSave = () => {
    /*
     * TODO: Save schedule to backend
     * - POST to /api/schedules/
     * - Save course selections and schedule name
     */
    console.log("Saving schedule:", scheduleName, selectedCourses);
    alert("Schedule saved! (Backend integration pending)");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear this schedule?")) {
      setSelectedCourses([]);
    }
  };

  const handleExport = () => {
    /*
     * TODO: Export schedule as PDF or image
     * - Generate PDF with schedule grid
     * - Download file
     */
    console.log("Exporting schedule");
    alert("Export feature coming soon!");
  };

  // ensures that if possibleSchedules[currentScheduleIndex] is undefined, it safely falls back to selectedCourses
  // this guarantes displayedCourses is of type Course[]
  const displayedCourses: Course[] =
    possibleSchedules[currentScheduleIndex] ?? selectedCourses;

  const totalSchedules = possibleSchedules.length;
  const currentDisplay =
    totalSchedules === 0
      ? "0 of 0"
      : `${currentScheduleIndex + 1} of ${totalSchedules}`;

  return (
    <div className="schedule-builder-container">
      <ScheduleHeader
        scheduleName={scheduleName}
        onScheduleNameChange={setScheduleName}
      />

      <div className="schedule-builder-main">
        {/* Left Sidebar */}
        <aside className="schedule-sidebar">
          {/* Search Bar with Dropdown Results */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Results Dropdown */}
            {(searchQuery.trim().length > 0 || isSearching) && (
              <CourseSearchResults
                courses={searchResults}
                onAddCourse={handleAddCourse}
                isLoading={isSearching}
              />
            )}
          </div>

          {/* Selected Courses List (Glassmorphism) */}
          <SelectedCoursesList
            courses={displayedCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </aside>

        {/* Main Calendar Grid */}
        <main className="schedule-content">
          {/* Schedule Navigation */}
          <div className="schedule-navigation">
            <button
              className="nav-arrow-btn"
              onClick={() =>
                setCurrentScheduleIndex((idx) => Math.max(0, idx - 1))
              }
              disabled={totalSchedules === 0 || currentScheduleIndex === 0}
            >
              ←
            </button>

            <span className="schedule-counter">{currentDisplay}</span>

            <button
              className="nav-arrow-btn"
              onClick={() =>
                setCurrentScheduleIndex((idx) =>
                  totalSchedules === 0
                    ? 0
                    : Math.min(totalSchedules - 1, idx + 1)
                )
              }
              disabled={
                totalSchedules === 0 ||
                currentScheduleIndex === totalSchedules - 1
              }
            >
              →
            </button>
          </div>

          {/* Action Buttons */}
          <div className="schedule-actions">
            <button
              onClick={handleSave}
              className="action-btn action-btn-primary"
            >
              Save
            </button>
            <button onClick={handleReset} className="action-btn">
              Reset
            </button>
            <button onClick={handleExport} className="action-btn">
              Export
            </button>
          </div>

          <CalendarView
            courses={displayedCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </main>
      </div>
    </div>
  );
}
