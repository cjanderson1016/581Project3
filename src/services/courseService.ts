/*
 * courseService.ts
 * Date: November 8, 2025
 * Description: Service for fetching and searching courses
 */

import type { Course } from "../models/Course";

// Mock course data - will be replaced with actual API calls
// Note: MWF classes are 50 minutes, T/Th classes are 1 hour 15 minutes
// Commented becuase these do not fit the Course interface
// const mockCourses: Course[] = [
//   {
//     id: 1,
//     subject: "CS",
//     course_number: "101",
//     title: "Introduction to Computer Science",
//     days: "MWF",
//     start_time: "9:00 AM",
//     end_time: "9:50 AM", // 50 minutes
//     instructor: "Dr. Smith",
//   },
//   {
//     id: 2,
//     subject: "CS",
//     course_number: "201",
//     title: "Data Structures",
//     days: "TTh",
//     start_time: "11:00 AM",
//     end_time: "12:15 PM", // 1 hour 15 minutes
//     instructor: "Dr. Johnson",
//   },
//   {
//     id: 3,
//     subject: "CS",
//     course_number: "301",
//     title: "Algorithms",
//     days: "MWF",
//     start_time: "1:00 PM",
//     end_time: "1:50 PM", // 50 minutes
//     instructor: "Dr. Williams",
//   },
//   {
//     id: 4,
//     subject: "MATH",
//     course_number: "151",
//     title: "Calculus I",
//     days: "MWF",
//     start_time: "10:00 AM",
//     end_time: "10:50 AM", // 50 minutes
//     instructor: "Dr. Brown",
//   },
//   {
//     id: 5,
//     subject: "MATH",
//     course_number: "152",
//     title: "Calculus II",
//     days: "TTh",
//     start_time: "2:00 PM",
//     end_time: "3:15 PM", // 1 hour 15 minutes
//     instructor: "Dr. Davis",
//   },
//   {
//     id: 6,
//     subject: "CS",
//     course_number: "350",
//     title: "Software Engineering",
//     days: "MW",
//     start_time: "3:00 PM",
//     end_time: "3:50 PM", // 50 minutes
//     instructor: "Dr. Martinez",
//   },
//   {
//     id: 7,
//     subject: "CS",
//     course_number: "401",
//     title: "Database Systems",
//     days: "TTh",
//     start_time: "9:30 AM",
//     end_time: "10:45 AM", // 1 hour 15 minutes
//     instructor: "Dr. Garcia",
//   },
//   {
//     id: 8,
//     subject: "PHYS",
//     course_number: "201",
//     title: "Physics I",
//     days: "MWF",
//     start_time: "11:00 AM",
//     end_time: "11:50 AM", // 50 minutes
//     instructor: "Dr. Anderson",
//   },
//   {
//     id: 9,
//     subject: "ENG",
//     course_number: "101",
//     title: "English Composition",
//     days: "TTh",
//     start_time: "1:00 PM",
//     end_time: "2:15 PM", // 1 hour 15 minutes
//     instructor: "Dr. Wilson",
//   },
//   {
//     id: 10,
//     subject: "CS",
//     course_number: "450",
//     title: "Computer Networks",
//     days: "MW",
//     start_time: "5:00 PM",
//     end_time: "5:50 PM", // 50 minutes
//     instructor: "Dr. Lee",
//   },
// ];

/**
 * Search for courses by query string
 * @param query - Search query (matches subject, course number, or title)
 * @returns Promise with array of matching courses
 */
export async function searchCourses(query: string): Promise<Course[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = encodeURIComponent(query.trim());

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/courses/?search=${searchTerm}`
    );

    if (!response.ok) {
      console.error("Failed to fetch search results:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data as Course[];
  } catch (error) {
    console.error("Error searching courses:", error);
    return [];
  }
}

/**
 * Get all available courses
 * @returns Promise with array of all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/courses/`);

    if (!response.ok) {
      console.error("Failed to fetch all courses:", response.statusText);
      return [];
    }

    return (await response.json()) as Course[];
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return [];
  }
}
