/*
 * CourseSearchResults.tsx
 * Date: November 8, 2025
 * Description: Displays search results for courses with glassmorphism effect
 */

import type { DisplayCourse } from "../models/Course";
import "../styles/CourseSearchResults.css";

// Props for CourseSearchResults component
interface CourseSearchResultsProps {
  courses: DisplayCourse[];
  onAddCourse: (course: DisplayCourse) => void;
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

  if (courses.length === 0) return null;

  return (
    <div className="course-search-results">
      <div className="search-results-header">
        <span className="results-count">{courses.length} results</span>
      </div>
      <div className="search-results-list">
        {courses.map((course) => (
          <div key={`${course.subject}-${course.course_number}`} className="search-result-item">
            <div className="search-result-info">
              <div className="search-result-code">
                {course.subject} {course.course_number}
              </div>
              <div className="search-result-title">{course.title}</div>
              <div className="search-result-details">
                <span className="search-result-instructor">
                  {course.instructors.join(", ")}
                </span>
                <span className="search-result-sections">{course.sections.length} sections</span>
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
