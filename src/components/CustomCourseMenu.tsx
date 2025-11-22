/*
 * CustomCourseMenu.tsx
 * Date: November 21, 2025
 * Description: Displays menu to create a custom course
 */

import "../styles/CustomCourseMenu.css";

export default function CustomCourseMenu() {
    return (
        <div className="custom-course-menu">
            <h4>Custom Course</h4>
            <label>
                Title:  
                <input type="text" name="title"/>
            </label>
            <br/>
            <label>
                Days:  
                <input type="text" name="days"/>
            </label>
            <br/>
            <label>
                Start Time:  
                <input type="text" name="start_time"/>
            </label>
            <br/>
            <label>
                End Time:  
                <input type="text" name="end_time"/>
            </label>
            <button
            
            >
                Create
            </button>
        </div>
    )
}