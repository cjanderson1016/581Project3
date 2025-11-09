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

export default function ScheduleBuilder() {
  const [scheduleName, setScheduleName] = useState("Schedule Builder");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // TODO: Replace with Django backend fetch
  // Search courses with debouncing
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // TODO: Replace searchCourses() with Django API call:
          // const response = await fetch(`http://127.0.0.1:8000/api/courses/?search=${searchQuery}`);
          // const data = await response.json();
          // setSearchResults(data);
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
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
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
            courses={selectedCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </aside>

        {/* Main Calendar Grid */}
        <main className="schedule-content">
          {/* Schedule Navigation */}
          <div className="schedule-navigation">
            <button className="nav-arrow-btn">←</button>
            <span className="schedule-counter">0 of 0</span>
            <button className="nav-arrow-btn">→</button>
          </div>

          {/* Action Buttons */}
          <div className="schedule-actions">
            <button onClick={handleSave} className="action-btn action-btn-primary">
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
            courses={selectedCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </main>
      </div>
    </div>
  );
}
