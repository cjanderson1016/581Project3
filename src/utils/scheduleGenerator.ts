// scheduleGenerator.ts
// Creates all schedules that aren't conflicting from the selected courses

import type { Course } from "../models/Course";

// same day map idea as calendarUtils
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

function parseDays(days: string): number[] {
  if (!days) return [];

  const dayNumbers: number[] = [];
  let i = 0;

  while (i < days.length) {
    if (i + 1 < days.length) {
      const twoChar = days.substring(i, i + 2);
      if (dayMap[twoChar] !== undefined) {
        dayNumbers.push(dayMap[twoChar]!);
        i += 2;
        continue;
      }
    }
    const oneChar = days[i];
    if (oneChar && dayMap[oneChar] !== undefined) {
      dayNumbers.push(dayMap[oneChar]!);
    }
    i++;
  }

  return [...new Set(dayNumbers)].sort();
}

function convertTo24Hour(time: string): string {
  if (!time) return "00:00";

  const cleaned = time.trim().toUpperCase();
  const match = cleaned.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/);

  if (!match) return "00:00";

  let hours = parseInt(match[1]!, 10);
  const minutes = match[2] || "00";
  const period = match[3];

  if (period === "PM" && hours < 12) hours += 12;
  else if (period === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = convertTo24Hour(time).split(":").map(Number);
  return h * 60 + m;
}

function coursesConflict(a: Course, b: Course): boolean {
  const daysA = parseDays(a.days);
  const daysB = parseDays(b.days);

  // any shared day?
  const sharedDay = daysA.some((d) => daysB.includes(d));
  if (!sharedDay) return false;

  const aStart = timeToMinutes(a.start_time);
  const aEnd = timeToMinutes(a.end_time);
  const bStart = timeToMinutes(b.start_time);
  const bEnd = timeToMinutes(b.end_time);

  // overlap if one starts before the other ends and vice versa
  return aStart < bEnd && bStart < aEnd;
}


export function generateSchedules(selectedCourses: Course[]): Course[][] {
  if (selectedCourses.length === 0) return [];

  // group by course "family" (same subject + number)
  const groupsMap = new Map<string, Course[]>();

  for (const c of selectedCourses) {
    const key = `${c.subject}-${c.course_number}`;
    const arr = groupsMap.get(key) ?? [];
    arr.push(c);
    groupsMap.set(key, arr);
  }

  const groups = Array.from(groupsMap.values());

  const result: Course[][] = [];

  function backtrack(groupIndex: number, current: Course[]) {
    if (groupIndex === groups.length) {
      // full combo
      result.push([...current]);
      return;
    }

    for (const course of groups[groupIndex]!) {
      // check conflict with what we already picked
      const hasConflict = current.some((c) => coursesConflict(c, course));
      if (hasConflict) continue;

      current.push(course);
      backtrack(groupIndex + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);

  // if  nothing valid fall back to everything you picked
  if (result.length === 0) {
    result.push([...selectedCourses]);
  }

  return result;
}

