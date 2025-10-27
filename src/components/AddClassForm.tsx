//ChatGPT
import { useState } from "react";
import type { Course } from "../models/Course";

interface AddClassFormProps {
  onAdd: (course: Course) => void;
}

export default function AddClassForm({ onAdd }: AddClassFormProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [days, setDays] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [instructor, setInstructor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !department ||
      !code ||
      !credits ||
      !days ||
      !start_time ||
      !end_time ||
      !instructor
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newClass: Course = {
      id: Math.floor(Math.random() * 1000000),
      subject: department,
      course_number: code,
      title: name,
      days,
      start_time,
      end_time,
      instructor,
    };

    onAdd(newClass);

    // Clear form
    setName("");
    setDepartment("");
    setCode("");
    setCredits("");
    setDays("");
    setStartTime("");
    setEndTime("");
    setInstructor("");
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Add a New Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Programming I"
          />
        </div>
        <div>
          <label>Course Department: </label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. EECS"
          />
        </div>
        <div>
          <label>Course Code: </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. 168"
          />
        </div>
        <div>
          <label>Credits: </label>
          <input
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="e.g. 4"
          />
        </div>
        <div>
          <label>Days: </label>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g. MWF or TuTh"
          />
        </div>
        <div>
          <label>Start Time: </label>
          <input
            value={start_time}
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>End Time: </label>
          <input
            value={end_time}
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <label>Instructor: </label>
          <input
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="e.g. Gibbons, John"
          />
        </div>
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Add Class
        </button>
      </form>
    </div>
  );
}
