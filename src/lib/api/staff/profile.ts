import { API_BASE_URL, handleResponse, authHeaders } from "../client";

export interface StaffProfile {
  email: string;
  fullName: string;
  phone: string;
}

export interface StaffDetail {
  staffId: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateStaffProfilePayload {
  email?: string;
  fullName?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// Overloads: call without id to fetch the authenticated staff's profile
// or call with an id to fetch any staff by id using `/staff/{id}`.
export async function getMyProfile(): Promise<StaffProfile>;
export async function getMyProfile(id: string): Promise<StaffDetail>;
export async function getMyProfile(id?: string) {
  if (id) {
    const res = await fetch(`${API_BASE_URL}/staff/${id}`, {
      method: "GET",
      headers: authHeaders(),
    });
    // According to your swagger the response shape is: { success: true, data: { ... } }
    const result = await handleResponse<{
      success: boolean;
      data: StaffDetail;
    }>(res);
    return result.data;
  }

  const res = await fetch(`${API_BASE_URL}/staff/me/profile`, {
    method: "GET",
    headers: authHeaders(),
  });
  // many backends return { success: true, data: { ... } }
  const result = await handleResponse<any>(res);
  // unwrap when backend uses { success, data } wrapper, otherwise return the object directly
  if (result && typeof result === "object" && "data" in result) {
    return result.data as StaffProfile;
  }
  return result as StaffProfile;
}

export async function updateMyProfile(payload: UpdateStaffProfilePayload) {
  const res = await fetch(`${API_BASE_URL}/staff/me/profile`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  // unwrap common wrapper { success, data } when present
  const result = await handleResponse<any>(res);
  if (result && typeof result === "object" && ("data" in result)) {
    return result.data as StaffProfile;
  }
  return result as StaffProfile;
}

export async function changeMyPassword(payload: ChangePasswordPayload) {
  const res = await fetch(`${API_BASE_URL}/staff/me/password`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<any>(res);
}
