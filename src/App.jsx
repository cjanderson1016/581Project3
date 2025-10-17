import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import ScheduleGrid from "./components/ScheduleGrid";
import AddClassForm from "./components/AddClassForm";

const sampleCourses = [
  { id: 1, subject: "CS", course_number: "101", days: "MWF", time: "10:00-11:00" },
  { id: 2, subject: "MATH", course_number: "202", days: "TuTh", time: "9:00-10:30" },
  { id: 3, subject: "ENG", course_number: "150", days: "MW", time: "13:00-14:15" },
];

export default function App() {
  const [schedule, setSchedule] = useState([]);
  const [courses, setCourses] = useState([]);

  // get the courses from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((res) => res.json()) // covert the body of the response to JSON
      .then((data) => setCourses(data)) // set courses to the JSON (should be an array of courses)
      .catch((err) => { // if there is an error getting the courses from the backend... 
        console.error("Error fetching courses:", err); // report it in the console
        setCourses(sampleCourses) // use the sample courses
      });
  }, []);

  // add a course to the schedule
  const addCourse = (course) => {
    // Prevent duplicates
    if (schedule.find((c) => c.id === course.id)) return alert("Already added!");
    setSchedule([...schedule, course]);
  };

  // remove a course from the schedule
  const removeCourse = (id) => {
    setSchedule(schedule.filter((c) => c.id !== id));
  };

  // clear the schedule
  const clearSchedule = () => setSchedule([]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Course Schedule Builder</h1>
      <AddClassForm onAdd={addCourse} />
      <CourseList courses={courses} onAdd={addCourse} />
      <hr style={{ margin: "2rem 0" }} />
      <ScheduleGrid courses={schedule} onRemove={removeCourse} />
      <button onClick={clearSchedule}>Clear Schedule</button>
    </div>
  );
}
