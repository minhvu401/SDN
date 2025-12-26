import { API_BASE_URL, authHeaders, handleResponse } from "../client";

// 🧩 Cập nhật mật khẩu khách hàng
export async function updateCustomerPassword(
  id: string,
  newPassword: string
): Promise<void> {
  const payload = { password: newPassword };

  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  await handleResponse(response);
}
