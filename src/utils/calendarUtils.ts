/*
 * calendarUtils.ts
 * Date: November 8, 2025
 * Description: Utility functions to convert Course data to FullCalendar event format
 */

import type { Course } from "../models/Course";
import type { EventInput } from "@fullcalendar/core";

// Map day abbreviations to FullCalendar daysOfWeek (Sunday = 0, Monday = 1, etc.)
const dayMap: Record<string, number> = {
  Su: 0,
  M: 1,
  Tu: 2,
  T: 2,  
  W: 3,
  Th: 4,
  R: 4,  
  F: 5,
  Sa: 6,
};

// Color palette for courses (7 distinct colors harmonizing with purple theme)
const courseColors = [
  { bg: "#667eea", border: "#5568d3" },  // Purple
  { bg: "#8b5cf6", border: "#7c3aed" },  // Violet
  { bg: "#d946ef", border: "#c026d3" },  // Magenta
  { bg: "#3b82f6", border: "#2563eb" },  // Blue
  { bg: "#14b8a6", border: "#0d9488" },  // Teal
  { bg: "#f43f5e", border: "#e11d48" },  // Rose
  { bg: "#6366f1", border: "#4f46e5" },  // Indigo
];

/**
 * Get color for a course by index (cycles through palette)
 * @param index - Index of the course in the courses array
 * @returns Object with backgroundColor and borderColor
 */
function getColorByIndex(index: number): { bg: string; border: string } {
  return courseColors[index % courseColors.length]!;
}

/**
 * Parse a days string (e.g., "MWF", "TuTh", "MW") into an array of day numbers
 * @param days - String containing day abbreviations (e.g., "MWF", "TuTh")
 * @returns Array of day numbers for FullCalendar (0 = Sunday, 1 = Monday, etc.)
 */
function parseDays(days: string): number[] {
  if (!days) return [];

  const dayNumbers: number[] = [];
  let i = 0;

  while (i < days.length) {
    // Try two-letter abbreviations first (Tu, Th, Su, Sa)
    if (i + 1 < days.length) {
      const twoChar = days.substring(i, i + 2);
      if (dayMap[twoChar] !== undefined) {
        dayNumbers.push(dayMap[twoChar]!);
        i += 2;
        continue;
      }
    }

    // Try single-letter abbreviations
    const oneChar = days[i];
    if (oneChar && dayMap[oneChar] !== undefined) {
      dayNumbers.push(dayMap[oneChar]!);
    }
    i++;
  }

  // Remove duplicates and sort
  return [...new Set(dayNumbers)].sort();
}

/**
 * Convert 12-hour time format to 24-hour format for FullCalendar
 * @param time - Time string in 12-hour format (e.g., "10:00 AM", "2:30 PM")
 * @returns Time string in 24-hour format (e.g., "10:00", "14:30")
 */
function convertTo24Hour(time: string): string {
  if (!time) return "00:00";

  // Remove spaces and convert to uppercase
  const cleaned = time.trim().toUpperCase();

  // Extract time and period
  const match = cleaned.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/);
  if (!match) return "00:00";

  let hours = parseInt(match[1]!, 10);
  const minutes = match[2] || "00";
  const period = match[3];

  // Convert to 24-hour format
  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Format as HH:MM
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/**
 * Convert a Course object to a FullCalendar EventInput
 * @param course - Course object from the database/API
 * @param colorIndex - Optional index for color assignment (defaults to 0)
 * @returns FullCalendar EventInput object
 */
export function courseToCalendarEvent(course: Course, colorIndex: number = 0): EventInput {
  const daysOfWeek = parseDays(course.days);
  const startTime = convertTo24Hour(course.start_time);
  const endTime = convertTo24Hour(course.end_time);
  const colors = getColorByIndex(colorIndex);

  return {
    id: course.id.toString(),
    title: `${course.subject} ${course.course_number}`,
    daysOfWeek,
    startTime,
    endTime,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    extendedProps: {
      courseTitle: course.title,
      instructor: course.instructor,
      subject: course.subject,
      courseNumber: course.course_number,
    },
  };
}

/**
 * Convert an array of Courses to FullCalendar EventInput array
 * @param courses - Array of Course objects
 * @returns Array of FullCalendar EventInput objects
 */
export function coursesToCalendarEvents(courses: Course[]): EventInput[] {
  return courses.map((course, index) => courseToCalendarEvent(course, index));
}
