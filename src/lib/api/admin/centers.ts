import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface Center {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CenterItem {
  _id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  manager?: string;
  isActive?: boolean;
  openingHours?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateCenterDto {
  name: string;
  address?: string;
  phone?: string;
  isActive: boolean; // Required - backend yêu cầu
}

export interface UpdateCenterDto {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
}

export async function createCenter(payload: CreateCenterDto) {
  const res = await fetch(`${API_BASE_URL}/centers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<CenterItem>(res);
}

export async function listCenters() {
  const res = await fetch(`${API_BASE_URL}/centers`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CenterItem[]>(res);
}

/**
 * 🟢 Lấy danh sách tất cả trung tâm bảo dưỡng
 */
export async function fetchCenters(): Promise<Center[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/centers`, {
      method: 'GET',
      headers: authHeaders(),
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch centers: ${response.status}`);
    }
    const data: Center[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching centers:', error);
    throw error;
  }
}

export async function getCenterById(id: string) {
  const res = await fetch(`${API_BASE_URL}/centers/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<CenterItem>(res);
}

export async function updateCenter(id: string, payload: UpdateCenterDto) {
  // Chỉ giữ lại các trường được backend hỗ trợ: name, address, phone, isActive
  const allowedFields = ['name', 'address', 'phone', 'isActive'];
  const filteredPayload: Record<string, any> = {};
  
  Object.keys(payload).forEach((key) => {
    if (allowedFields.includes(key) && payload[key as keyof UpdateCenterDto] !== undefined) {
      filteredPayload[key] = payload[key as keyof UpdateCenterDto];
    }
  });

  const res = await fetch(`${API_BASE_URL}/centers/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(filteredPayload),
  });
  return handleResponse<CenterItem>(res);
}

export async function deleteCenter(id: string) {
  const res = await fetch(`${API_BASE_URL}/centers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

