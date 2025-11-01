// src/lib/api/centers.ts
import { API_BASE_URL } from './client';

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

/**
 * 🟢 Lấy danh sách tất cả trung tâm bảo dưỡng
 */
export async function fetchCenters(): Promise<Center[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/centers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
