export const API_BASE_URL = 'https://sdn-mma.onrender.com';

export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => undefined);
    const message = data?.message || data?.error || `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return (await res.json().catch(() => ({}))) as T;
}

export function getAccessToken(): string | null {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  } catch {
    return null;
  }
}

export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  };
}


