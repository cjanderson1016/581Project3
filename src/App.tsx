import { useEffect, useState } from "react";
import CourseList from "./components/CourseList";
import ScheduleGrid from "./components/ScheduleGrid";
import AddClassForm from "./components/AddClassForm";

export interface Course {
  id: number;
  subject: string;
  course_number: string;
  title: string;
  days: string;
  start_time: string;
  end_time: string;
  instructor: string;
}

const sampleCourses: Course[] = [
  {
    id: 1,
    subject: "CS",
    course_number: "101",
    title: "Computer Science 101",
    days: "MWF",
    start_time: "10:00 AM",
    end_time: "11:00 AM",
    instructor: "instructor, sample",
  },
  {
    id: 2,
    subject: "MATH",
    course_number: "202",
    title: "College Algebra 2",
    days: "TuTh",
    start_time: "9:00 AM",
    end_time: "10:30 AM",
    instructor: "instructor, sample",
  },
  {
    id: 3,
    subject: "ENG",
    course_number: "150",
    title: "English II",
    days: "MW",
    start_time: "1:00 PM",
    end_time: "2:45 PM",
    instructor: "instructor, sample",
  },
];

export default function App() {
  const [schedule, setSchedule] = useState<Course[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((res) => res.json())
      .then((data: Course[]) => setCourses(data))
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setCourses(sampleCourses);
      });
  }, []);

  const addCourse = (course: Course) => {
    if (schedule.find((c) => c.id === course.id)) {
      alert("Already added!");
      return;
    }
    setSchedule([...schedule, course]);
  };

  const removeCourse = (id: number) => {
    setSchedule(schedule.filter((c) => c.id !== id));
  };

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
