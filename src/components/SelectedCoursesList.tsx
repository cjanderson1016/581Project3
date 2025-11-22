/*
 * SelectedCoursesList.tsx
 * Date: November 3, 2025
 * Description: Bottom panel showing list of selected courses
 */

import type { Course } from "../models/Course";

// Props for SelectedCoursesList component
interface SelectedCoursesListProps {
  courses: Course[];
  onRemoveCourse: (id: number|undefined) => void;
}

// SelectedCoursesList component
export default function SelectedCoursesList({
  courses,
  onRemoveCourse,
}: SelectedCoursesListProps) {
  if (courses.length === 0) {
    return (
      <div className="selected-courses-list empty">
        <p className="empty-message">No courses selected yet. Add courses to your schedule to get started.</p>
      </div>
    );
  }

  // Render selected courses list
  return (
    <div className="selected-courses-list">
      <h3 className="selected-courses-title">Selected Classes</h3>
      <div className="courses-list-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-list-item">
            
            {/* Remove course button */}
            <button
              onClick={() => onRemoveCourse(course.id)}
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
              <span className="course-list-time">
                {course.days} • {course.start_time} - {course.end_time}
              </span>
              <span className="course-list-instructor">{course.instructor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
