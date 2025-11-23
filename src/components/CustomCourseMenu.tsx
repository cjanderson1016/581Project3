/*
 * CustomCourseMenu.tsx
 * Date: November 21, 2025
 * Description: Displays menu to create a custom course
 */

import type React from "react";
import "../styles/CustomCourseMenu.css";
import type { Course } from "../models/Course";
import { useState } from "react";

function dropdown() {
    
}

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    return (
        <div className="custom-course-menu">
            <form onSubmit={handleCustomSubmit}>
                <h4 className="custom-course-header">Custom Course</h4>
                <label>
                    Subject:  
                    <input maxLength={100} className="custom-form-input" type="text" name="subject" value={data.subject} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Course Number:  
                    <input maxLength={3} className="custom-form-input" type="text" name="course_number" value={data.course_number} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Title:  
                    <input maxLength={100} className="custom-form-input" type="text" name="title" value={data.title} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Days:  
                    <input maxLength={11} className="custom-form-input" type="text" name="days" value={data.days} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    Start Time:  
                    <input maxLength={8} className="custom-form-input" type="time" name="start_time" value={data.start_time} onChange={onInputChange} required/>
                </label>
                <br/>
                <label>
                    End Time:  
                    <input maxLength={8} className="custom-form-input" type="time" name="end_time" value={data.end_time} onChange={onInputChange} required/>
                </label>
                <br/>
                <div className="advanced-dropdown-container">
                    <div className="button-container">
                        <button id="advanced_dropdown_button" className="advanced-dropdown-button" type="button" onClick={() =>{
                            const button = document.getElementById("advanced_dropdown_button")
                            button!.textContent == "Advanced >" ? button!.textContent = "Advanced v" : button!.textContent = "Advanced >" 
                            setIsDropdownOpen(!isDropdownOpen)
                        }}>Advanced &gt;</button>
                    </div>
                    {isDropdownOpen && (
                        <div>
                            
                            <label>
                                Registrar Course Number:  
                                <input className="custom-form-input" type="text" name="registrar_course_number" value={data.registrar_course_number} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Topic:  
                                <input maxLength={100} className="custom-form-input" type="text" name="topic" value={data.topic} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Class Number:  
                                <input className="custom-form-input" type="text" name="class_number" value={data.class_number} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Section Number:  
                                <input className="custom-form-input" type="text" name="section_number" value={data.section_number} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Credits Min:  
                                <input className="custom-form-input" type="text" name="credits_min" value={data.credits_min} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Credits Max:  
                                <input className="custom-form-input" type="text" name="credits_max" value={data.credits_max} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Seats Available:  
                                <input className="custom-form-input" type="text" name="seats_available" value={data.seats_available} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Total Enrolled:  
                                <input className="custom-form-input" type="text" name="total_enrolled" value={data.total_enrolled} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Enroll Cap:  
                                <input className="custom-form-input" type="text" name="enroll_cap" value={data.enroll_cap} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Type:  
                                <input maxLength={3} className="custom-form-input" type="text" name="type" value={data.type} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Consent:  
                                <input maxLength={100} className="custom-form-input" type="text" name="consent" value={data.consent} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Enrollable:  
                                <input maxLength={3} className="custom-form-input" type="text" name="enrollable" value={data.enrollable} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Instructor:  
                                <input maxLength={50} className="custom-form-input" type="text" name="instructor" value={data.instructor} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Begin Date:  
                                <input maxLength={6} className="custom-form-input" type="text" name="begin_date" value={data.begin_date} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                End Date:  
                                <input maxLength={6} className="custom-form-input" type="text" name="end_date" value={data.end_date} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Location:  
                                <input maxLength={50} className="custom-form-input" type="text" name="location" value={data.location} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Room:  
                                <input maxLength={50} className="custom-form-input" type="text" name="room" value={data.room} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                School:  
                                <input className="custom-form-input" type="text" name="school" value={data.school} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Department:  
                                <input className="custom-form-input" type="text" name="department" value={data.department} onChange={onInputChange}/>
                            </label>
                            <br/>
                            <label>
                                Building:  
                                <input className="custom-form-input" type="text" name="building" value={data.building} onChange={onInputChange}/>
                            </label>
                        </div>
                    )}
                </div>
                <button className="create-course-button" type="submit">
                    Create Course
                </button>
            </form>
        </div>
    )
}