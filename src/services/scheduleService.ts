/*
 * scheduleService.ts
 * Date: November 23, 2025
 * Description: Service functions for managing schedules via API
 */

import AxiosInstance from "../components/AxiosInstance";
import type { Course, DisplayCourse } from "../models/Course";

export interface SchedulePayload {
  schedule_title: string;
  schedule_description?: string;
  // field names match Django serializer write-only fields
  selected_course_ids: number[]; // course ids (sections)
  displayed_course_ids: number[]; // representative course ids for displayed courses
  term?: string;
  is_active?: boolean;
}

// Create a new schedule
export async function createSchedule(payload: SchedulePayload) {
  const res = await AxiosInstance.post("api/schedules/", payload);
  return res.data;
}

// Fetch all schedules
export async function fetchSchedules() {
  const res = await AxiosInstance.get("api/schedules/");
  return res.data;
}

// Fetch a specific schedule by ID
export async function fetchSchedule(id: number) {
  const res = await AxiosInstance.get(`api/schedules/${id}/`);
  return res.data;
}

// Update an existing schedule
export async function updateSchedule(id: number, payload: Partial<SchedulePayload>) {
  const res = await AxiosInstance.put(`api/schedules/${id}/`, payload);
  return res.data;
}

// Delete a schedule by ID
export async function deleteSchedule(id: number) {
  const res = await AxiosInstance.delete(`api/schedules/${id}/`);
  return res.data;
}

// Helper to extract IDs for payload
export function buildSchedulePayload(
  title: string,
  description: string | undefined,
  selected: Course[],
  displayed: Course[]
): SchedulePayload {
  // Extract IDs from Course objects
  const selected_ids = selected.map((c) => c.id).filter((id): id is number => typeof id === "number");
  const displayed_ids = displayed.map((d) => d.id).filter((id): id is number => typeof id === "number");
  
  // Construct payload
  const payload: Partial<SchedulePayload> = {
    schedule_title: title,
    selected_course_ids: selected_ids,
    displayed_course_ids: displayed_ids,
  };

  // Only include description if provided
  if (description !== undefined) payload.schedule_description = description;
  // Return as SchedulePayload
  return payload as SchedulePayload;
}
