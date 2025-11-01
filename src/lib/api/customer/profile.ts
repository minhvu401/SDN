// src/lib/api/profile.ts
import { API_BASE_URL, authHeaders, handleResponse } from '../client';

// -----------------------------
// Kiểu dữ liệu hồ sơ khách hàng
// -----------------------------
export interface Vehicle {
  carModel: string;
  licensePlate: string;
}

export interface CustomerProfile {
  _id: string;
  username?: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  paymentMethod?: string;
  bankName?: string;
  cardNumber?: string;
  vehicles?: Vehicle[];
  isActive?: boolean;
  maintenanceCount?: number;
  
}

export async function getCustomerProfile(id: string): Promise<CustomerProfile> {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  // unwrap nếu backend trả { data: ... }
  const res = await handleResponse<any>(response);
  return res && res.data ? res.data as CustomerProfile : res as CustomerProfile;
}


export interface UpdateCustomerProfilePayload {
  fullName?: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
  bankName?: string;
  cardNumber?: string;
  vehicles?: Vehicle[];
}

export async function updateCustomerProfile(
  id: string,
  payload: UpdateCustomerProfilePayload
): Promise<CustomerProfile> {
  // Backend báo lỗi nếu gửi paymentMethod / bankName / cardNumber —
  // chỉ gửi các trường được phép (vd. fullName, phone, address, vehicles)
  const allowed = new Set(['fullName', 'phone', 'address', 'vehicles']);
  const filteredPayload: Record<string, any> = {};
  Object.entries(payload).forEach(([k, v]) => {
    if (allowed.has(k) && v !== undefined) filteredPayload[k] = v;
  });
  
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(filteredPayload),
  });
  const res = await handleResponse<any>(response);
  return res && res.data ? res.data as CustomerProfile : res as CustomerProfile;
}
