import { API_BASE_URL, handleResponse, authHeaders } from '../../api/client';

export interface CustomerVehicle {
  carModel: string;
  licensePlate: string;
  _id: string;
}

export interface CustomerItem {
  _id: string;
  username: string;
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  note?: string;
  role: string;
  vehicles: CustomerVehicle[];
  isActive: boolean;
  maintenanceCount?: number;
  lastMaintenanceDate?: string;
}

export interface CustomersResponse {
  data: CustomerItem[];
}

export async function listCustomers() {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CustomersResponse>(res);
}


