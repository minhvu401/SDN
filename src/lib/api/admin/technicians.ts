import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface TechnicianItem {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  specializations?: string[];
  isActive?: boolean;
}

export async function getTechSpecializations() {
  const res = await fetch(`${API_BASE_URL}/technicians/specializations/list`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<string[]>(res);
}

export async function createTechnician(payload: Partial<TechnicianItem>) {
  const res = await fetch(`${API_BASE_URL}/technicians`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<TechnicianItem>(res);
}

export async function listTechnicians() {
  const res = await fetch(`${API_BASE_URL}/technicians`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<TechnicianItem[]>(res);
}

export async function listActiveTechnicians() {
  const res = await fetch(`${API_BASE_URL}/technicians/active`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<TechnicianItem[]>(res);
}

export async function searchTechniciansByName(name: string) {
  const url = new URL(`${API_BASE_URL}/technicians/search/by-name`);
  url.searchParams.set('name', name);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<TechnicianItem[]>(res);
}

export async function getTechnicianById(id: string) {
  const res = await fetch(`${API_BASE_URL}/technicians/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<TechnicianItem>(res);
}

export async function updateTechnician(id: string, payload: Partial<TechnicianItem>) {
  const res = await fetch(`${API_BASE_URL}/technicians/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<TechnicianItem>(res);
}

export async function deleteTechnician(id: string) {
  const res = await fetch(`${API_BASE_URL}/technicians/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}


