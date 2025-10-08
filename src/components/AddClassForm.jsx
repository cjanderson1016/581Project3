//ChatGPT
import { useState } from "react";
import Class from "../models/Class";

export default function AddClassForm({ onAdd }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !days || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const dayList = days.split(",").map((d) => d.trim());
    const newClass = new Class(name, dayList, time);
    onAdd(newClass);

    // Clear form
    setName("");
    setDays("");
    setTime("");
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
            placeholder="e.g. ART 210"
          />
        </div>
        <div>
          <label>Days (comma separated): </label>
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Mon, Wed, Fri"
          />
        </div>
        <div>
          <label>Time (HH:MM-HH:MM): </label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="10:00-11:00"
          />
        </div>
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Add Class
        </button>
      </form>
    </div>
  );
}
