import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface BookingItem {
  bookingId: string;
  customer: {
    fullName: string;
    phone: string;
  };
  services: Array<{
    name: string;
    basePrice: number;
    serviceType: string;
  }>;
  center: {
    name: string;
    address: string;
    phone: string;
  };
  bookingDate: string;
  estimatedEndTime: string;
  status: string;
  totalPrice: number;
  licensePlates: string[];
}

export interface BookingResponse {
  success: boolean;
  data: BookingItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateBookingDto {
  serviceIds: string[];
  centerId: string;
  bookingDate: string;
  licensePlates: string[];
  parts?: Array<{
    partId: string;
    quantity: number;
  }>;
}

export interface UpdateBookingStatusDto {
  status: string;
}

export interface ListBookingsParams {
  status?: string;
  centerId?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export async function createBooking(payload: CreateBookingDto) {
  const res = await fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

export async function listBookings(params?: ListBookingsParams): Promise<BookingResponse> {
  const url = new URL(`${API_BASE_URL}/booking`);
  if (params) {
    if (params.status) url.searchParams.set('status', params.status);
    if (params.centerId) url.searchParams.set('centerId', params.centerId);
    if (params.userId) url.searchParams.set('userId', params.userId);
    if (params.page) url.searchParams.set('page', params.page.toString());
    if (params.limit) url.searchParams.set('limit', params.limit.toString());
  }
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<BookingResponse>(res);
}

export async function getMyBookings(): Promise<BookingResponse> {
  const res = await fetch(`${API_BASE_URL}/booking/my-bookings`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<BookingResponse>(res);
}

export async function updateBookingStatus(id: string, payload: UpdateBookingStatusDto) {
  const res = await fetch(`${API_BASE_URL}/booking/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<BookingItem>(res);
}

