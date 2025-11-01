// src/api/services.ts
import { API_BASE_URL } from './client';

// 🟢 Định nghĩa kiểu dữ liệu trả về từ API
export interface Service {
  _id: string;
  name: string;
  serviceType: string;
  description: string;
  basePrice: number;
  estimatedDuration: number;
  duration?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 🧩 Lấy danh sách tất cả dịch vụ
 */
export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // tránh cache khi SSR/CSR
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }

    const data: Service[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

/**
 * 🧩 Lấy chi tiết một dịch vụ theo ID
 */
export async function fetchServiceById(id: string): Promise<Service> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Service not found');
      }
      throw new Error(`Failed to fetch service: ${response.status}`);
    }

    const data: Service = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    throw error;
  }
}
