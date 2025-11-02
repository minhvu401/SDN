import { API_BASE_URL, handleResponse, authHeaders } from "../client";

export interface TechnicianSummary {
  id: string;
  fullName: string;
  phone: string;
  role?: string;
  specialization?: string[];
  isActive?: boolean;
}

export interface BookingSummary {
  bookingId: string;
  customer: {
    fullName: string;
    phone: string;
  };
  service: any[];
  center: any;
  technician: TechnicianSummary | null;
  bookingDate: string;
  estimatedEndTime?: string;
  status: string; // pending | confirmed | completed
  totalPrice?: number;
  licensePlates?: string[];
}

export async function getActiveTechnicians() {
  const res = await fetch(`${API_BASE_URL}/technicians/active`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean; data: TechnicianSummary[] }>(res);
}

export async function getStaffBookings() {
  const res = await fetch(`${API_BASE_URL}/staff/bookings`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean; data: BookingSummary[] }>(res);
}

export async function setBookingStatus(bookingId: string, status: string) {
  // For staff operations the backend exposes a staff-scoped endpoint.
  // Use /staff/bookings/{id}/status so staff can change booking status.
  const res = await fetch(
    `${API_BASE_URL}/staff/bookings/${bookingId}/status`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    }
  );
  return handleResponse<any>(res);
}

export async function assignTechnicianToBooking(
  bookingId: string,
  technicianId: string
) {
  const res = await fetch(
    `${API_BASE_URL}/staff/bookings/${bookingId}/assign-technician`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ technicianId }),
    }
  );
  return handleResponse<any>(res);
}

export async function completeStaffBooking(bookingId: string) {
  const urlComplete = `${API_BASE_URL}/staff/bookings/${bookingId}/complete`;
  const urlStatus = `${API_BASE_URL}/staff/bookings/${bookingId}/status`;

  // 1) Try PATCH /.../complete with an explicit empty JSON body (some servers
  // may expect a JSON body even for state transitions).
  try {
    const resPatch = await fetch(urlComplete, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({}),
    });

    if (resPatch.ok) return handleResponse<any>(resPatch);

    // If server explicitly returns 404 (endpoint not found), try the status endpoint next.
    if (resPatch.status === 404) {
      // 2) Try PATCH /.../status { status: 'completed' }
      const resStatus = await fetch(urlStatus, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: "completed" }),
      });

      if (resStatus.ok) return handleResponse<any>(resStatus);

      // 3) As a last resort, try POST /.../complete (some deployments expect POST)
      const resPost = await fetch(urlComplete, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({}),
      });
      return handleResponse<any>(resPost);
    }

    // For other non-ok statuses, let handleResponse throw a useful error.
    return handleResponse<any>(resPatch);
  } catch (err) {
    // Network or other unexpected error — rethrow so callers can handle it.
    throw err;
  }
}
