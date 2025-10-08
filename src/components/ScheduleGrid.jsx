// placeholder to flesh out project file structure// placeholder to flesh out project file structure -- initial generation by ChatGPT

export default function ScheduleGrid({ courses, onRemove }) {
  return (
    <div>
      <h2>Your Schedule</h2>
      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "0.5rem" }}>
              <b>{course.name}</b> — {course.days.join(", ")} {course.time}{" "}
              <button onClick={() => onRemove(course.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
