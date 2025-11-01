import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface TechnicianItem {
  _id: string;
  fullName?: string;
  name?: string; // Alias for fullName
  email?: string;
  phone?: string;
  password?: string; // Only for create
  role?: string;
  specializations?: string[];
  joinDate?: string;
  bio?: string;
  yearsOfExperience?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTechnicianDto {
  fullName: string;
  phone: string;
  password: string;
  role?: string; // Default: "TECHNICIAN"
  specializations?: string[];
  joinDate?: string;
  bio?: string;
  yearsOfExperience?: number;
}

export interface SpecializationsResponse {
  specializations: string[];
}

export async function getTechSpecializations() {
  const res = await fetch(`${API_BASE_URL}/technicians/specializations/list`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const response = await handleResponse<SpecializationsResponse>(res);
  return response.specializations || [];
}

export async function createTechnician(payload: CreateTechnicianDto) {
  const res = await fetch(`${API_BASE_URL}/technicians`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      ...payload,
      role: payload.role || 'TECHNICIAN',
    }),
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


