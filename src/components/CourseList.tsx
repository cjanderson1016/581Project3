// placeholder to flesh out project file structure -- initial generation by ChatGPT
// "courses" is being passed in here directly from the json from the backend (meaning its attributes do not need to line up with the class rn)
import type { Course } from "../models/Course";

interface CourseListProps {
  courses: Course[];
  onAdd: (course: Course) => void;
}

export default function CourseList({ courses, onAdd }: CourseListProps) {
  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "0.5rem" }}>
            <b>
              {course.subject} {course.course_number}
            </b>{" "}
            — <b>{course.title}</b> — {course.days} @ {course.start_time} -{" "}
            {course.end_time} with {course.instructor}{" "}
            <button onClick={() => onAdd(course)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
