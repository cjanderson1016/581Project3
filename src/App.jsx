import { useState } from "react";
import CourseList from "./components/CourseList";
import ScheduleGrid from "./components/ScheduleGrid";
import AddClassForm from "./components/AddClassForm";

const sampleCourses = [
  { id: 1, name: "CS 101", days: ["Mon", "Wed", "Fri"], time: "10:00-11:00" },
  { id: 2, name: "MATH 202", days: ["Tue", "Thu"], time: "9:00-10:30" },
  { id: 3, name: "ENG 150", days: ["Mon", "Wed"], time: "13:00-14:15" },
];

export default function App() {
  const [schedule, setSchedule] = useState([]);

  const addCourse = (course) => {
    // Prevent duplicates
    if (schedule.find((c) => c.id === course.id)) return alert("Already added!");
    setSchedule([...schedule, course]);
  };

  const removeCourse = (id) => {
    setSchedule(schedule.filter((c) => c.id !== id));
  };

  const clearSchedule = () => setSchedule([]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Course Schedule Builder</h1>
      <AddClassForm onAdd={addCourse} />
      <CourseList courses={sampleCourses} onAdd={addCourse} />
      <hr style={{ margin: "2rem 0" }} />
      <ScheduleGrid courses={schedule} onRemove={removeCourse} />
      <button onClick={clearSchedule}>Clear Schedule</button>
    </div>
  );
}
