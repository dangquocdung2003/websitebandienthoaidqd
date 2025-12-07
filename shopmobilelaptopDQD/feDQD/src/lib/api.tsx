// src/lib/api.tsx
const API_BASE_URL = "http://localhost:1313";
const TOKEN_KEY = "auth_token_v1";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let msg = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ======================================
// API chung
// ======================================
export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, body?: any) =>
    request(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
};

// ======================================
// TYPES & API SẢN PHẨM
// (mapping đúng với BE)
// ======================================
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName?: string; // optional
}

// danh sách sản phẩm nổi bật
export function getFeaturedProducts(): Promise<Product[]> {
  return api.get("/api/products") as Promise<Product[]>;
}

// lấy 1 sản phẩm theo id
export function getProductById(id: string | number): Promise<Product> {
  return api.get(`/api/products/${id}`) as Promise<Product>;
}
export function getCategories() {
  return api.get("/api/categories");
}

