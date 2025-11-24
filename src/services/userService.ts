/*
 * userService.ts
 * Date: November 23, 2025
 * Description: Service functions for managing user data via API
 */

import AxiosInstance from "../components/AxiosInstance";

// Fetch current user details using the token
export async function fetchCurrentUser(token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;
  const res = await AxiosInstance.get("/api/user/", { headers });
  return res.data;
}

// Update current user details (such as the schedule_ids associated with the user)
export async function updateCurrentUser(data: any, token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;
  const res = await AxiosInstance.patch("/api/user/", data, { headers });
  return res.data;
}
