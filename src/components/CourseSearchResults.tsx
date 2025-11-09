/*
 * CourseSearchResults.tsx
 * Date: November 8, 2025
 * Description: Displays search results for courses with glassmorphism effect
 */

import type { Course } from "../models/Course";
import "../styles/CourseSearchResults.css";

// Props for CourseSearchResults component
interface CourseSearchResultsProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  isLoading?: boolean;
}

// CourseSearchResults component
export default function CourseSearchResults({
  courses,
  onAddCourse,
  isLoading = false,
  
  // Destructure props
}: CourseSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="course-search-results">
        <div className="search-loading">Searching courses...</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  // Render search results  
  return (
    <div className="course-search-results">
      <div className="search-results-header">
        <span className="results-count">{courses.length} courses found</span>
      </div>
      <div className="search-results-list">
        {courses.map((course) => (
          <div key={course.id} className="search-result-item">
            <div className="search-result-info">
              <div className="search-result-code">
                {course.subject} {course.course_number}
              </div>
              <div className="search-result-title">{course.title}</div>
              <div className="search-result-details">
                <span className="search-result-time">
                  {course.days} {course.start_time} - {course.end_time}
                </span>
                <span className="search-result-instructor">
                  {course.instructor}
                </span>
              </div>
            </div>
            <button
              onClick={() => onAddCourse(course)}
              className="search-result-add-btn"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
