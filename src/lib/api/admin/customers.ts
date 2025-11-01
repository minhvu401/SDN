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

export interface CreateCustomerDto {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address?: string;
  note?: string;
  vehicles?: Array<{ carModel: string; licensePlate: string }>;
}

export interface UpdateCustomerDto {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  vehicles?: Array<{ carModel: string; licensePlate: string }>;
}

export async function createCustomer(payload: CreateCustomerDto) {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<CustomerItem>(res);
}

export async function listCustomers() {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CustomersResponse>(res);
}

export async function getCustomerById(id: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CustomerItem>(res);
}

export async function updateCustomer(id: string, payload: UpdateCustomerDto) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<CustomerItem>(res);
}

export async function deleteCustomer(id: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

export async function getCustomersByLevel(level: string) {
  const res = await fetch(`${API_BASE_URL}/customers/level/${encodeURIComponent(level)}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CustomerItem[]>(res);
}

export async function searchCustomerByPhone(phone: string) {
  const url = new URL(`${API_BASE_URL}/customers/search/by-phone`);
  url.searchParams.set('phone', phone);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CustomerItem>(res);
}

export async function updateCustomerLevel(id: string, level: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}/level`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ level }),
  });
  return handleResponse<CustomerItem>(res);
}

export async function updateCustomerMaintenanceDate(id: string, date: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}/maintenance-date`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ maintenanceDate: date }),
  });
  return handleResponse<CustomerItem>(res);
}

export async function deleteCustomerVehicle(id: string, licensePlate: string) {
  const res = await fetch(`${API_BASE_URL}/customers/${id}/vehicles/${encodeURIComponent(licensePlate)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}


