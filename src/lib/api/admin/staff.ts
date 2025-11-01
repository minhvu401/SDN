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

export interface StaffItem {
  staffId: string; // API trả về staffId, không phải _id
  _id?: string; // Alias cho staffId để backward compatibility
  username: string;
  email: string;
  fullName: string;
  phone?: string; // Optional vì một số staff có thể không có phone
  role?: string; // API không trả về role trong response
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffListResponse {
  success: boolean;
  data: StaffItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function listStaff() {
  const res = await fetch(`${API_BASE_URL}/staff`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const response = await handleResponse<StaffListResponse>(res);
  // Map staffId thành _id để backward compatibility
  const staffList = response.data?.map((staff) => ({
    ...staff,
    _id: staff.staffId, // Thêm _id từ staffId
  })) || [];
  return staffList as StaffItem[];
}

export async function createStaff(payload: CreateStaffDto) {
  const res = await fetch(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<StaffItem>(res);
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

