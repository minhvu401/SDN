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
  parts?: Array<{
    partId: string;
    quantity: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingDto {
  customerId: string;
  serviceId: string;
  centerId?: string;
  appointmentDate?: string;
  notes?: string;
  parts?: Array<{
    partId: string;
    quantity: number;
  }>;
}

export interface UpdateBookingStatusDto {
  status: string;
}

export async function createBooking(payload: CreateBookingDto) {
  const res = await fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

export async function listBookings() {
  const res = await fetch(`${API_BASE_URL}/booking`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<BookingItem[]>(res);
}

export async function getMyBookings() {
  const res = await fetch(`${API_BASE_URL}/booking/my-bookings`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<BookingItem[]>(res);
}

export async function updateBookingStatus(id: string, payload: UpdateBookingStatusDto) {
  const res = await fetch(`${API_BASE_URL}/booking/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

