// src/lib/api/customer/booking.ts
import { API_BASE_URL, authHeaders, handleResponse } from '../client';

// 🟢 Kiểu dữ liệu đặt lịch
export interface Service {
  name: string;
  basePrice: number;
  serviceType: string;
}

export interface Center {
  name: string;
  address: string;
  phone: string;
}

export interface Booking {
  _id?: string;
  bookingId?: string;
  bookingDate: string;
  estimatedDuration?: number;
  totalPrice?: number;
  status?: 'pending' | 'confirmed' | 'completed' | 'canceled';
  licensePlates: string[];

  // ✅ thêm các field populate từ server
  center?: Center;
  services?: Service[];

  // ✅ vẫn giữ cho các API khác
  centerId?: string;
  serviceIds?: string[];
  parts?: any[];
  createdAt?: string;
  updatedAt?: string;
}

// 🧩 1️⃣: Tạo mới đơn đặt lịch
export async function createBooking(payload: Booking): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Booking>(response);
}

// 🧩 2️⃣: Lấy danh sách các đặt lịch của khách hàng
export async function getMyBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_BASE_URL}/booking/my-bookings`, {
    method: 'GET',
    headers: authHeaders(),
  });

  return handleResponse<Booking[]>(response);
}

// 🧩 3️⃣: Cập nhật ngày bảo dưỡng (PATCH /customers/{id}/maintenance-date)
export async function updateMaintenanceDate(
  customerId: string,
  maintenanceDate: string
): Promise<{ message: string }> {
  const response = await fetch(
    `${API_BASE_URL}/customers/${customerId}/maintenance-date`,
    {
      method: 'PATCH',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ maintenanceDate }),
    }
  );

  return handleResponse<{ message: string }>(response);
}
