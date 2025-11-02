export const API_BASE_URL = "https://sdn-mma-be.onrender.com";

export async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    // Try to parse JSON error; otherwise fall back to text or status
    let message = `Request failed with ${res.status}`;
    try {
      if (contentType.includes("application/json")) {
        const data: any = await res.json();
        message = data?.message || data?.error || message;
      } else {
        const text = await res.text();
        message = text || message;
      }
    } catch {
      // Keep default message
    }
    // If auth expired (401) clear local tokens and redirect to login so user can re-auth.
    if (res.status === 401) {
      try {
        if (typeof window !== "undefined") {
          // remove known token keys if present
          try {
            localStorage.removeItem("accessToken");
          } catch {}
          try {
            localStorage.removeItem("refreshToken");
          } catch {}
          // redirect to login with a query flag so UI can show an explanatory message
          const loginPath = "/login?reason=expired";
          // avoid infinite loops if already on login
          if (!window.location.pathname.startsWith("/login")) {
            window.location.href = loginPath;
          }
        }
      } catch (e) {
        // ignore any errors during cleanup
      }
    }

    throw new Error(message);
  }

  // No content
  if (res.status === 204) {
    return {} as T;
  }

  // If response is JSON, parse it; else return empty object
  if (contentType.includes("application/json")) {
    try {
      return (await res.json()) as T;
    } catch {
      return {} as T;
    }
  }

  // Attempt text for non-JSON responses, but cast to T as empty payload
  await res.text().catch(() => "");
  return {} as T;
}

export function getAccessToken(): string | null {
  try {
    return typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  } catch {
    return null;
  }
}

export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  };
}

/**
 * Try to extract a user id from the stored access token (client-side).
 * Returns `sub`, `id` or `_id` fields from the token payload if present.
 */
export function getIdFromAccessToken(): string | null {
  try {
    const token = getAccessToken();
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    // base64 url -> base64
    const payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    let json = "";
    if (typeof window !== "undefined" && typeof atob === "function") {
      json = atob(payloadB64);
    } else if (typeof Buffer !== "undefined") {
      json = Buffer.from(payloadB64, "base64").toString("utf-8");
    } else {
      return null;
    }

    const payload = JSON.parse(json);
    return payload.sub || payload.id || payload._id || null;
  } catch {
    return null;
  }
}
