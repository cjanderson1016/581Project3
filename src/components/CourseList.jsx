// placeholder to flesh out project file structure -- initial generation by ChatGPT

export default function CourseList({ courses, onAdd }) {
  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "0.5rem" }}>
            <b>{course.name}</b> — {course.days.join(", ")} {course.time}{" "}
            <button onClick={() => onAdd(course)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
