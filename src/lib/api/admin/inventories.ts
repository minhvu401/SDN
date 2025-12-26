import { API_BASE_URL, authHeaders, handleResponse } from '../../api/client';

export interface InventoryItem {
  _id: string;
  partCode: string;
  partName: string;
  category?: string;
  description?: string;
  quantity?: number;
  minQuantity?: number; // Số lượng tối thiểu để cảnh báo
  unitPrice?: number;
  supplier?: string;
  productLink?: string;
  warranty?: string;
  status?: string;
  isActive?: boolean;
}

export async function createInventory(payload: Partial<InventoryItem>) {
  const res = await fetch(`${API_BASE_URL}/inventories`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<InventoryItem>(res);
}

export async function listInventories() {
  const res = await fetch(`${API_BASE_URL}/inventories`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<InventoryItem[]>(res);
}

export async function listActiveInventories() {
  const res = await fetch(`${API_BASE_URL}/inventories/active`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<InventoryItem[]>(res);
}

export async function searchInventoriesByName(name: string) {
  const url = new URL(`${API_BASE_URL}/inventories/search-name`);
  url.searchParams.set('name', name);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<InventoryItem[]>(res);
}

export async function getInventoryByCode(partCode: string) {
  const res = await fetch(`${API_BASE_URL}/inventories/code/${encodeURIComponent(partCode)}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<InventoryItem>(res);
}

export async function getInventoryById(id: string) {
  const res = await fetch(`${API_BASE_URL}/inventories/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse<InventoryItem>(res);
}

export async function updateInventory(id: string, payload: Partial<InventoryItem>) {
  const res = await fetch(`${API_BASE_URL}/inventories/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<InventoryItem>(res);
}

export async function deleteInventory(id: string) {
  const res = await fetch(`${API_BASE_URL}/inventories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<{ success: boolean }>(res);
}

export async function reduceInventoryQuantity(id: string, quantity: number) {
  const res = await fetch(`${API_BASE_URL}/inventories/${id}/reduce-quantity`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  return handleResponse<InventoryItem>(res);
}

export async function increaseInventoryQuantity(id: string, quantity: number) {
  const res = await fetch(`${API_BASE_URL}/inventories/${id}/increase-quantity`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  return handleResponse<InventoryItem>(res);
}


