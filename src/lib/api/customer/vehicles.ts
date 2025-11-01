// src/lib/api/customer/vehicles.ts
import { API_BASE_URL, authHeaders, handleResponse } from '../client';

export interface Vehicle {
  _id?: string;
  carModel: string;
  licensePlate: string;
}

export interface CustomerProfileResponse {
  _id: string;
  vehicles: Vehicle[];
}

export async function getCustomerVehicles(): Promise<CustomerProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: authHeaders(),
  });
  return handleResponse<CustomerProfileResponse>(res);
}

export async function createVehicle(
  customerId: string,
  vehicle: { carModel: string; licensePlate: string }
) {
  const res = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
    method: 'PATCH',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vehicles: [vehicle] }),
  });
  return handleResponse<any>(res);
}


export interface UpdateVehiclePayload {
  vehicleId: string;
  carModel: string;
  licensePlate: string;
}

// 🧩 API: Cập nhật thông tin xe của khách hàng
export async function updateVehicle(
  customerId: string,
  payload: UpdateVehiclePayload
) {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/vehicles`, {
    method: 'PATCH',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

// -------------------------
// 🗑️ Xóa xe của khách hàng
// -------------------------
export async function deleteVehicle(customerId: string, licensePlate: string) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${customerId}/vehicles/${licensePlate}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Không thể xóa xe: ${errorText}`);
  }

  return handleResponse(response);
}
