// placeholder to flesh out project file structure// placeholder to flesh out project file structure -- initial generation by ChatGPT

import type { Course } from "../App";

interface ScheduleGridProps {
  courses: Course[];
  onRemove: (id: number) => void;
}

export default function ScheduleGrid({ courses, onRemove }: ScheduleGridProps) {
  return (
    <div>
      <h2>Your Schedule</h2>
      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "0.5rem" }}>
              <b>
                {course.subject} {course.course_number}
              </b>{" "}
              — <b>{course.title}</b> — {course.days} @ {course.start_time} -{" "}
              {course.end_time} with {course.instructor}{" "}
              <button onClick={() => onRemove(course.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
