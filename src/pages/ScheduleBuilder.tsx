/*
 * ScheduleBuilder.tsx
 * Date: November 3, 2025
 * Description: Main schedule builder page with weekly calendar grid
 */

import { useState, useEffect } from "react";
import ScheduleHeader from "../components/ScheduleHeader";
import CalendarView from "../components/CalendarView";
import SelectedCoursesList from "../components/SelectedCoursesList";
import CourseSearchResults from "../components/CourseSearchResults";
import type { Course, DisplayCourse } from "../models/Course";
import { createDisplayCourses } from "../models/Course";
import type { User } from "../models/User";
import { searchCourses } from "../services/courseService";
import "../styles/ScheduleBuilder.css";
import "../styles/CustomCourseMenu.css";
import { generateSchedules } from "../utils/scheduleGenerator";
import CustomCourseMenu from "../components/CustomCourseMenu";

export default function ScheduleBuilder() {
  const [scheduleName, setScheduleName] = useState("Schedule Builder");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DisplayCourse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [possibleSchedules, setPossibleSchedules] = useState<Course[][]>([]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  //Custom Courses Menu
  const [isCustomMenuVisible, setIsCustomMenuVisible] = useState(false)
  const [customLoading, setCustomLoading] = useState(false)
  const [customError, setCustomError] = useState<string | null>(null)
  const [customData, setCustomData] = useState<Course>({
    title: '',
    start_time: '',
    end_time: '',
    days: '',
    uploaded_by: 'muffin',
    subject: '',
    course_number: 0,
    registrar_course_number: 0,
    topic:'',
    class_number: 0,
    section_number: 0,
    credits_min: 0,
    credits_max: 0,
    seats_available: 0,
    total_enrolled: 0,
    enroll_cap: 0,
    type:'',
    consent:'',
    enrollable:'',
    instructor:'',
    begin_date:'',
    end_date:'',
    location:'',
    room:'',
    school:'',
    department:'',
    building:'',
  });
  const [userData, setUserData] = useState<User>({
    full_name: 'muffin'
  });

  // Search courses with debouncing
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // Query the backend for results
          const results = await searchCourses(searchQuery);
          // Convert Course[] (sections) into grouped DisplayCourse[] for UI
          const display = createDisplayCourses(results);
          setSearchResults(display);
        } catch (error) {
          console.error("Error searching courses:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Recompute possible schedules whenever selected courses change
  useEffect(() => {
    if (selectedCourses.length === 0) {
      setPossibleSchedules([]);
      setCurrentScheduleIndex(0);
      return;
    }

    // TODO: make courses with different types (e.g. lecture, lab, discussion) be considered different courses when generating schedules so they show up together
    const schedules = generateSchedules(selectedCourses);
    setPossibleSchedules(schedules);
    setCurrentScheduleIndex(0);
  }, [selectedCourses]);

  const handleAddCourse = (displayCourse: DisplayCourse) => {
    // Add all sections from the selected DisplayCourse, avoiding duplicates by id
    const existingIds = new Set(selectedCourses.map((c) => c.id));
    const toAdd = displayCourse.sections.filter((s) => !existingIds.has(s.id));
    if (toAdd.length > 0) {
      setSelectedCourses([...selectedCourses, ...toAdd]);
    }
    // Clear search after adding
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveCourse = (courseId: number|undefined) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  // Remove all sections that belong to the given DisplayCourse (by subject + course_number)
  const handleRemoveDisplayCourse = (displayCourse: DisplayCourse) => {
    setSelectedCourses(
      selectedCourses.filter(
        (c) => !(c.subject === displayCourse.subject && c.course_number === displayCourse.course_number)
      )
    );
  };

  const toggleCustomCourseMenu = () => {
    setIsCustomMenuVisible(!isCustomMenuVisible)
  }

  //Google AI
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target; // sets name to the name of the element that changed, same with value
    setCustomData(prevData => ({ //creates new variable to replace old form data
      ...prevData, //keeps all previous form elements the same
      [name]: value, //Changes only the variable for the form field that changed
    }))
  }
  
  //Google AI and Matthew
  const getCookie = (name: string): string | null => {
    // This solves the CORS Issue that was happening when trying to post a course via the website
    // Look for the cookie starting with the exact name, then extract its value.
    const cookieMatch = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith(`${name}=`));
    if (cookieMatch) {
        // Extract the value after the '=' sign and decode it
        return decodeURIComponent(cookieMatch.trim().substring(name.length + 1));
    }
    return null;
  };

  //Google AI and Matthew
  const handleCustomSubmit = async (e: React.FormEvent) => {
    //Handle Submission of the Custom Course
    e.preventDefault()
    setCustomLoading(true)
    setCustomError(null)
    const API_URL = `http://127.0.0.1:8000/api/courses/`
    setCustomData(prevData => ({ //creates new variable to replace old form data
      ...prevData, //keeps all previous form elements the same
      uploaded_by: 'muffin', //Changes only the variable for the form field that changed
    }))
    try {
      const csrftoken = getCookie('csrftoken'); 
      const response = await fetch(API_URL, {
        method: 'POST', // We are creating a new resource
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken || '', 
        },
        body: JSON.stringify(customData), // Send the entire formData object as a JSON string
      });

      if (!response.ok) {
        // If the server response was not successful (e.g., 404, 500, 400 Bad Request)
        throw new Error('Failed to create course');
      }

      // If it was successful, parse the JSON response from Django
      const newCourse = await response.json(); 
      console.log('Course created successfully:', newCourse);
      
      // Add new course to schedule
      handleAddCourse(newCourse)

      // Close the UI menu and reset the input fields
      setIsCustomMenuVisible(false);
      setCustomData({title: '', days: '', start_time: '', end_time: '', uploaded_by: 'muffin'});


    } catch (err) {
      // If the network request fails or we throw an error above, this runs
      setCustomError('An error occurred while saving.');
    } finally {
      // This runs whether the request succeeded or failed
      setCustomLoading(false);
    }
  }

  const handleSave = () => {
    /*
     * TODO: Save schedule to backend
     * - POST to /api/schedules/
     * - Save course selections and schedule name
     */
    console.log("Saving schedule:", scheduleName, selectedCourses);
    alert("Schedule saved! (Backend integration pending)");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear this schedule?")) {
      setSelectedCourses([]);
    }
  };

  const handleExport = () => {
    /*
     * TODO: Export schedule as PDF or image
     * - Generate PDF with schedule grid
     * - Download file
     */
    console.log("Exporting schedule");
    alert("Export feature coming soon!");
  };

  // ensures that if possibleSchedules[currentScheduleIndex] is undefined, it safely falls back to selectedCourses
  // this guarantes displayedCourses is of type Course[]
  const displayedCourses: Course[] =
    possibleSchedules[currentScheduleIndex] ?? selectedCourses;

  const totalSchedules = possibleSchedules.length;
  const currentDisplay =
    totalSchedules === 0
      ? "0 of 0"
      : `${currentScheduleIndex + 1} of ${totalSchedules}`;

  return (
    <div className="schedule-builder-container">
      <ScheduleHeader
        scheduleName={scheduleName}
        onScheduleNameChange={setScheduleName}
      />

      <div className="schedule-builder-main">
        {/* Left Sidebar */}
        <aside className="schedule-sidebar">
          {/* Search Bar with Dropdown Results */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Results Dropdown */}
            {(searchQuery.trim().length > 0 || isSearching) && (
              <CourseSearchResults
                courses={searchResults}
                onAddCourse={handleAddCourse}
                isLoading={isSearching}
              />
            )}
          </div>
          {/* Button and menu for custom course creation*/}
          <div className="custom-course-container">
            <button 
              onClick={() => toggleCustomCourseMenu()}
              className="action-btn"
            >
              Create Custom Course
            </button>
            {isCustomMenuVisible && (
              <CustomCourseMenu
                handleCustomSubmit={handleCustomSubmit}
                onInputChange={handleInputChanges}
                data={customData}
              />
            )}
          </div>
          
          {/* Selected Courses List (Glassmorphism) */}
          <SelectedCoursesList
            courses={createDisplayCourses(selectedCourses)}
            onRemoveCourse={handleRemoveDisplayCourse}
          />
        </aside>

        {/* Main Calendar Grid */}
        <main className="schedule-content">
          {/* Schedule Navigation */}
          <div className="schedule-navigation">
            <button
              className="nav-arrow-btn"
              onClick={() =>
                setCurrentScheduleIndex((idx) => Math.max(0, idx - 1))
              }
              disabled={totalSchedules === 0 || currentScheduleIndex === 0}
            >
              ←
            </button>

            <span className="schedule-counter">{currentDisplay}</span>

            <button
              className="nav-arrow-btn"
              onClick={() =>
                setCurrentScheduleIndex((idx) =>
                  totalSchedules === 0
                    ? 0
                    : Math.min(totalSchedules - 1, idx + 1)
                )
              }
              disabled={
                totalSchedules === 0 ||
                currentScheduleIndex === totalSchedules - 1
              }
            >
              →
            </button>
          </div>

          {/* Action Buttons */}
          <div className="schedule-actions">
            <button
              onClick={handleSave}
              className="action-btn action-btn-primary"
            >
              Save
            </button>
            <button onClick={handleReset} className="action-btn">
              Reset
            </button>
            <button onClick={handleExport} className="action-btn">
              Export
            </button>
          </div>

          <CalendarView
            courses={displayedCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </main>
      </div>
    </div>
  );
}
