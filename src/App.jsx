import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import ScheduleGrid from "./components/ScheduleGrid";
import AddClassForm from "./components/AddClassForm";

const sampleCourses = [
  { id: 1, subject: "CS", course_number: "101", title: "Computer Science 101", days: "MWF", start_time: "10:00 AM", end_time: "11:00 AM", instructor: "instructor, sample"},
  { id: 2, subject: "MATH", course_number: "202", title: "College Algebra 2", days: "TuTh", start_time: "9:00 AM", end_time: "10:30 AM", instructor: "instructor, sample"},
  { id: 3, subject: "ENG", course_number: "150", title: "English II", days: "MW", start_time: "1:00 PM", end_time: "2:45 PM", instructor: "instructor, sample"},
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
