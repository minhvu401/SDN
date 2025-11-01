import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface BookingItem {
  _id: string;
  customerId: string;
  serviceId: string;
  centerId?: string;
  technicianId?: string;
  status: string;
  appointmentDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStaffDto {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: string;
}

export interface UpdateBookingStatusDto {
  status: string;
}

export interface AssignTechnicianDto {
  technicianId: string;
}

export async function createStaff(payload: CreateStaffDto) {
  const res = await fetch(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<any>(res);
}

export async function getStaffBookings() {
  const res = await fetch(`${API_BASE_URL}/staff/bookings`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<BookingItem[]>(res);
}

export async function updateBookingStatus(id: string, payload: UpdateBookingStatusDto) {
  const res = await fetch(`${API_BASE_URL}/staff/bookings/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

export async function assignTechnicianToBooking(id: string, payload: AssignTechnicianDto) {
  const res = await fetch(`${API_BASE_URL}/staff/bookings/${id}/assign-technician`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

