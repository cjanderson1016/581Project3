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
import { searchCourses } from "../services/courseService";
import "../styles/ScheduleBuilder.css";
import "../styles/CustomCourseMenu.css";
import {
  generateSchedules,
  findConflictingCourseIds,
} from "../utils/scheduleGenerator";

import {
  createSchedule,
  buildSchedulePayload,
} from "../services/scheduleService";
import { fetchSchedule, updateSchedule } from "../services/scheduleService";
import { useParams, useNavigate } from "react-router-dom";
import CustomCourseMenu from "../components/CustomCourseMenu";
import { fetchCurrentUser, updateCurrentUser } from "../services/userService";

export default function ScheduleBuilder() {
  const [scheduleName, setScheduleName] = useState("Schedule Builder");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DisplayCourse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [possibleSchedules, setPossibleSchedules] = useState<Course[][]>([]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  const [loadedDisplayedIds, setLoadedDisplayedIds] = useState<number[] | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const editingScheduleId = params.id ? Number(params.id) : undefined;

  //Custom Courses Menu
  const [isCustomMenuVisible, setIsCustomMenuVisible] = useState(false);
  const [customLoading, setCustomLoading] = useState(false); // for potential loading state
  const [customError, setCustomError] = useState<string | null>(null); // for potential error state
  const [customData, setCustomData] = useState<Course>({ // initial empty course data
    title: "",
    start_time: "",
    end_time: "",
    days: "",
    uploaded_by_user_id: 0,
    is_public:false,
    subject: "",
    course_number: 0,
    registrar_course_number: 0,
    topic: "",
    class_number: 0,
    section_number: 0,
    credits_min: 0,
    credits_max: 0,
    seats_available: 0,
    total_enrolled: 0,
    enroll_cap: 0,
    type: "",
    consent: "",
    enrollable: "",
    instructor: "",
    begin_date: "",
    end_date: "",
    location: "",
    room: "",
    school: "",
    department: "",
    building: "",
  });
  const [userID, setUserID] = useState<number | undefined>(undefined); 
  
  useEffect(() => { 
    // Fetch user ID on component mount
    const fetchUserIdAsync = async () => {
      const token = localStorage.getItem("session_token"); 
      if (token) {
        const user = await fetchCurrentUser(token); // Waits for the user object
        
        // Use the synchronous setUserID function with the resolved value
        setUserID(user?.id); 
      }
    };

    // Call the async function immediately within useEffect
    fetchUserIdAsync();

  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Search courses with debouncing
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // Query the backend for results
          const results = await searchCourses(searchQuery,userID);
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

    const schedules = generateSchedules(selectedCourses);
    setPossibleSchedules(schedules);
    setCurrentScheduleIndex(0);
    // TODO: if we are loading a schedule, we want to find the courses that were displayed when it was saved
    
  }, [selectedCourses]);

  // If route contains an id, load that schedule for editing
  useEffect(() => {
    const loadSchedule = async (id: number) => {
      try {
        const s = await fetchSchedule(id);
        // s should include selected_courses (array of Course)
        if (s) {
          setScheduleName(s.schedule_title || "Schedule Builder");
          setSelectedCourses(
            Array.isArray(s.selected_courses) ? s.selected_courses : []
          ); // this triggers schedule generation
          // capture displayed course ids so we can match generated schedules
          if (Array.isArray(s.displayed_courses)) {
            const ids = s.displayed_courses
              .map((c: Course) => (typeof c.id === "number" ? c.id : undefined))
              .filter((id: number | undefined): id is number => id !== undefined);
            setLoadedDisplayedIds(ids.length > 0 ? ids : null);
          }
        }
      } catch (err) {
        console.error(`Failed to load schedule ${id}:`, err);
      }
    };

    if (editingScheduleId) {
      loadSchedule(editingScheduleId);
    }
  }, [editingScheduleId]);

  // When possible schedules are generated, if we have loadedDisplayedIds from the backend,
  // find the first generated schedule whose set of course ids matches the backend's displayed_courses.
  useEffect(() => {
    if (!loadedDisplayedIds || possibleSchedules.length === 0) return;

    const targetSet = new Set(loadedDisplayedIds);
    let matchIndex = -1;

    for (let i = 0; i < possibleSchedules.length; i++) {
      const schedule = possibleSchedules[i];
      if (!schedule) continue;
      const ids = schedule
        .map((c) => (typeof c.id === "number" ? c.id : undefined))
        .filter((id): id is number => id !== undefined);
      const idSet = new Set(ids);
      if (idSet.size === targetSet.size) {
        let allPresent = true;
        for (const id of targetSet) {
          if (!idSet.has(id)) {
            allPresent = false;
            break;
          }
        }
        if (allPresent) {
          matchIndex = i;
          break;
        }
      }
    }

    if (matchIndex >= 0) {
      setCurrentScheduleIndex(matchIndex);
      // clear so we don't repeatedly attempt matching
      setLoadedDisplayedIds(null);
    } else {
      // don't clear loadedDisplayedIds so we can retry when possibleSchedules changes again
      console.warn(
        "No generated schedule matched the backend displayed_courses ids yet; will retry when generation changes."
      );
    }
  }, [possibleSchedules, loadedDisplayedIds]);

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

  const handleRemoveCourse = (courseId: number | undefined) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
  };

  // Remove all sections that belong to the given DisplayCourse (by subject + course_number)
  const handleRemoveDisplayCourse = (displayCourse: DisplayCourse) => {
    setSelectedCourses(
      selectedCourses.filter(
        (c) =>
          !(
            c.subject === displayCourse.subject &&
            c.course_number === displayCourse.course_number
          )
      )
    );
  };

  const toggleCustomCourseMenu = () => {
    // Toggle visibility of custom course creation menu
    setIsCustomMenuVisible(!isCustomMenuVisible);
  };

  //Google AI
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input changes for custom course form
    const { name, value, type, checked } = e.target;  // Destructure name, value, type, and checked from the event target

    const newValue = type === 'checkbox' ? checked : value; // Determine new value based on input type

    setCustomData((prevData) => ({ // update state based on previous state
      ...prevData,
      [name]: newValue,
    }));
  };


  //Google AI and Matthew
  const getCookie = (name: string): string | null => {
    // This solves the CORS Issue that was happening when trying to post a course via the website
    // Look for the cookie starting with the exact name, then extract its value.
    const cookieMatch = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith(`${name}=`));
    if (cookieMatch) {
      // Extract the value after the '=' sign and decode it
      return decodeURIComponent(cookieMatch.trim().substring(name.length + 1));
    }
    return null;
  };

  //Google AI and Matthew
  const handleCustomSubmit = async (e: React.FormEvent) => {
    //Handle Submission of the Custom Course
    e.preventDefault(); // Prevent default form submission behavior
    setCustomLoading(true); // For a potential loading screen
    setCustomError(null); // Reset any previous errors
    const API_URL = `http://127.0.0.1:8000/api/courses/`; // Django REST API endpoint for creating courses
    const updatedData = { // Ensure to include user ID in the payload
      ...customData,
      uploaded_by_user_id: userID
    }
    try {
      const csrftoken = getCookie("csrftoken");// Get CSRF token from cookies
      const response = await fetch(API_URL, { // Make the POST request to create a new course
        method: "POST", // We are creating a new resource
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify(updatedData), // Send the entire formData object as a JSON string
      });

      if (!response.ok) {
        // If the server response was not successful (e.g., 404, 500, 400 Bad Request)
        throw new Error("Failed to create course");
      }

      // If it was successful, parse the JSON response from Django
      const newCourse = await response.json();
      console.log("Course created successfully:", newCourse);

      // Add new course to schedule
      try {
        // Query the backend for results
        const results = await searchCourses(
          newCourse.subject + " " + newCourse.course_number, 
          userID
        );
        // Convert Course[] (sections) into grouped DisplayCourse[] for UI
        const display = createDisplayCourses(results);
        const customDisplay = display.find( // find the DisplayCourse that contains the newCourse
          (item) =>
            item.subject == newCourse.subject &&
            item.course_number == newCourse.course_number
        );
        customDisplay
          ? handleAddCourse(customDisplay)
          : console.log("Failed to add new course to selected courses");
      } catch {
        console.log("Failed to add new course to selected courses");
      }

      // Close the UI menu and reset the input fields
      setIsCustomMenuVisible(false);
      setCustomData({
        title: "",
        start_time: "",
        end_time: "",
        days: "",
        uploaded_by_user_id: 0,
        is_public:false,
        subject: "",
        course_number: 0,
        registrar_course_number: 0,
        topic: "",
        class_number: 0,
        section_number: 0,
        credits_min: 0,
        credits_max: 0,
        seats_available: 0,
        total_enrolled: 0,
        enroll_cap: 0,
        type: "",
        consent: "",
        enrollable: "",
        instructor: "",
        begin_date: "",
        end_date: "",
        location: "",
        room: "",
        school: "",
        department: "",
        building: "",
      });
    } catch (err) {
      // If the network request fails or we throw an error above, this runs
      setCustomError("An error occurred while saving.");
    } finally {
      // This runs whether the request succeeded or failed
      setCustomLoading(false);
    }
  };

  const handleSave = async () => {
    // Build payload: selected sections and representative displayed courses
    try {
      const payload = buildSchedulePayload(
        scheduleName,
        undefined,
        selectedCourses,
        displayedCourses
      );
      console.log("Saving schedule payload:", payload);
      if (editingScheduleId) {
        // updating existing schedule
        const updated = await updateSchedule(editingScheduleId, payload);
        console.log("Schedule updated:", updated);
        alert("Schedule updated successfully.");
      } else {
        const created = await createSchedule(payload);
        console.log("Schedule created:", created);

        // If user token exists, append new schedule id to their schedule_ids
        const token = localStorage.getItem("session_token");
        if (token && created && typeof created.id === "number") {
          try {
            const user = await fetchCurrentUser(token); // get the user based on the token
            const existing: number[] = Array.isArray(user?.schedule_ids)
              ? user.schedule_ids
              : [];
            if (!existing.includes(created.id)) {
              // if the new schedule id is not present
              const updated = [...existing, created.id]; // append it
              await updateCurrentUser({ schedule_ids: updated }, token); // update user
            }
          } catch (err) {
            console.error("Failed to update user's schedule_ids:", err);
          }
        }

        alert("Schedule saved successfully.");
      }
    } catch (err) {
      console.error("Error saving schedule:", err);
      alert("Failed to save schedule. See console for details.");
    }
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
    // Finds which selected courses are in time conflict
  const conflictingIds = findConflictingCourseIds(displayedCourses);
  const hasConflicts = conflictingIds.length > 0;


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
            conflictingIds={conflictingIds}

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

          {/* Conflict Warning */}
          {hasConflicts && (
            <div className="conflict-warning">
              Some selected courses overlap in time.
            </div>
)}
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
