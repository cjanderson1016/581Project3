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

export async function createSchedule(payload: SchedulePayload) {
  const res = await AxiosInstance.post("api/schedules/", payload);
  return res.data;
}

export async function fetchSchedules() {
  const res = await AxiosInstance.get("api/schedules/");
  return res.data;
}

export async function fetchSchedule(id: number) {
  const res = await AxiosInstance.get(`api/schedules/${id}/`);
  return res.data;
}

export async function updateSchedule(id: number, payload: Partial<SchedulePayload>) {
  const res = await AxiosInstance.put(`api/schedules/${id}/`, payload);
  return res.data;
}

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
  const selected_ids = selected.map((c) => c.id);
  const displayed_ids = displayed.map((d) => d.id);

  const payload: Partial<SchedulePayload> = {
    schedule_title: title,
    selected_course_ids: selected_ids,
    displayed_course_ids: displayed_ids,
  };

  if (description !== undefined) payload.schedule_description = description;

  return payload as SchedulePayload;
}
