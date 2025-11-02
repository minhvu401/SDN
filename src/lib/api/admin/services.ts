import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface ServiceItem {
  _id: string;
  name: string;
  serviceType?: string;
  type?: string; // alias for serviceType
  description?: string;
  basePrice?: number;
  price?: number; // alias for basePrice
  estimatedDuration?: number;
  duration?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export async function createService(payload: Partial<ServiceItem>) {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<ServiceItem>(res);
}

export async function listServices() {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ServiceItem[]>(res);
}

export async function listActiveServices() {
  const res = await fetch(`${API_BASE_URL}/services/active`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ServiceItem[]>(res);
}

export async function searchServiceByName(name: string) {
  const url = new URL(`${API_BASE_URL}/services/search-name`);
  url.searchParams.set('name', name);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ServiceItem[]>(res);
}

export async function searchServiceByType(type: string) {
  const url = new URL(`${API_BASE_URL}/services/search-type`);
  url.searchParams.set('type', type);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ServiceItem[]>(res);
}

export async function getServiceById(id: string) {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ServiceItem>(res);
}

export async function updateService(id: string, payload: Partial<ServiceItem>) {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<ServiceItem>(res);
}

export async function deleteService(id: string) {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}


