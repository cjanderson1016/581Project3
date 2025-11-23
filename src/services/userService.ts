import AxiosInstance from "../components/AxiosInstance";

export async function fetchCurrentUser(token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;
  const res = await AxiosInstance.get("/api/user/", { headers });
  return res.data;
}

export async function updateCurrentUser(data: any, token?: string) {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;
  const res = await AxiosInstance.patch("/api/user/", data, { headers });
  return res.data;
}
