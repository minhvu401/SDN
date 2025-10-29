import { API_BASE_URL, handleResponse, authHeaders } from './client';

export interface VehicleInput {
  carModel: string;
  licensePlate: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: 'customer' | 'staff' | 'admin' | string;
  vehicles?: VehicleInput[];
}

export const ALLOWED_CAR_MODELS: string[] = [
  'VinFast VF 2',
  'VinFast VF 3',
  'VinFast VF e34',
  'VinFast VF 5',
  'VinFast VF 6',
  'VinFast VF 7',
  'VinFast VF 8',
  'VinFast VF 9',
  'VinFast Limo Green',
  'VinFast Fadil',
  'BYD Seal',
  'BYD Dolphin',
  'BYD Atto 3',
  'BYD Han',
  'BYD Tang',
  'BYD Yangwang U8',
];

export async function register(payload: RegisterPayload) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      phone: payload.phone,
      role: payload.role ?? 'customer',
      vehicles: payload.vehicles,
    }),
  });
  return handleResponse<any>(response);
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
    }),
  });
  return handleResponse<any>(response);
}

export interface ProfileResponse {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  vehicle?: VehicleInput[];
  isActive?: boolean;
}

export async function getProfile() {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<ProfileResponse>(response);
}

export interface UpdateProfilePayload {
  fullName?: string;
  role?: string;
  phone?: string;
  password?: string;
  vehicles?: VehicleInput[];
}

export async function updateProfile(id: string, payload: UpdateProfilePayload) {
  const response = await fetch(`${API_BASE_URL}/auth/profile/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<any>(response);
}


