export const API_BASE_URL = 'https://sdn-mma-be.onrender.com';

export async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    // Try to parse JSON error; otherwise fall back to text or status
    let message = `Request failed with ${res.status}`;
    try {
      if (contentType.includes('application/json')) {
        const data: any = await res.json();
        message = data?.message || data?.error || message;
      } else {
        const text = await res.text();
        message = text || message;
      }
    } catch {
      // Keep default message
    }
    throw new Error(message);
  }

  // No content
  if (res.status === 204) {
    return {} as T;
  }

  // If response is JSON, parse it; else return empty object
  if (contentType.includes('application/json')) {
    try {
      return (await res.json()) as T;
    } catch {
      return {} as T;
    }
  }

  // Attempt text for non-JSON responses, but cast to T as empty payload
  await res.text().catch(() => '');
  return {} as T;
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


