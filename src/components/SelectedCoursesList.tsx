/*
 * SelectedCoursesList.tsx
 * Date: November 3, 2025
 * Description: Bottom panel showing list of selected courses
 */

import type { DisplayCourse } from "../models/Course";

// Props for SelectedCoursesList component
interface SelectedCoursesListProps {
  courses: DisplayCourse[];
  onRemoveCourse: (course: DisplayCourse) => void;
  conflictingIds?: number[];
}

// SelectedCoursesList component - now shows one entry per course (grouped sections)
export default function SelectedCoursesList({
  courses,
  onRemoveCourse,
  conflictingIds = [],

}: SelectedCoursesListProps) {
  if (courses.length === 0) {
    return (
      <div className="selected-courses-list empty">
        <p className="empty-message">No courses selected yet. Add courses to your schedule to get started.</p>
      </div>
    );
  }

  return (
    <div className="selected-courses-list">
      <h3 className="selected-courses-title">Selected Classes</h3>
      <div className="courses-list-grid">
        {courses.map((course) => (
          <div key={`${course.subject}-${course.course_number}`} className="course-list-item">
            <button
              onClick={() => onRemoveCourse(course)}
              className="course-list-remove"
              aria-label="Remove course"
            >
              ×
            </button>
            <div className="course-list-info">
              <span className="course-list-code">
                {course.subject} {course.course_number}
              </span>
              <span className="course-list-title">{course.title}</span>
              <span className="course-list-sections">{course.sections.length} sections</span>
              <span className="course-list-instructor">{course.instructors.join(", ")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
