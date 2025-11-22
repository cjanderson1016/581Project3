/*
 * CustomCourseMenu.tsx
 * Date: November 21, 2025
 * Description: Displays menu to create a custom course
 */

import type React from "react";
import "../styles/CustomCourseMenu.css";
import type { Course } from "../models/Course";

interface CustomCourseMenuProps {
    handleCustomSubmit: (e: React.FormEvent) => Promise<void>;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: Course,
}

export default function CustomCourseMenu({
    handleCustomSubmit,
    onInputChange,
    data,
}: CustomCourseMenuProps) {
    return (
        <div className="custom-course-menu">
            <form onSubmit={handleCustomSubmit}>
                <h4>Custom Course</h4>
                <label>
                    Title:  
                    <input type="text" name="title" value={data.title} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Days:  
                    <input type="text" name="days" value={data.days} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Start Time:  
                    <input type="text" name="start_time" value={data.start_time} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    End Time:  
                    <input type="text" name="end_time" value={data.end_time} onChange={onInputChange} required/>
                </label>
                <button type="submit">
                    Create Course
                </button>
            </form>
        </div>
    )
}