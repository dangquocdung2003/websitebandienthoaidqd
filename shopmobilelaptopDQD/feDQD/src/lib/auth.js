// src/lib/auth.js
// Dùng API thật + localStorage để lưu token & user

import { api } from "./api.tsx";

const TOKEN_KEY = "auth_token_v1";
const USER_KEY = "auth_user_v1";

let listeners = new Set();

export function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
  catch { return null; }
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

// Gọi BE: POST /api/auth/login
export async function login({ email, password }) {
  const data = await api.post("/api/auth/login", {
    usernameOrEmail: email,
    password,
  });

  const { token, user } = data;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  emit();
  return user;
}

// Gọi BE: POST /api/auth/register
// Ở FE đang có field "name", BE yêu cầu "username" → map name -> username
export async function register({ name, email, password }) {
  await api.post("/api/auth/register", {
    username: name,     // hoặc tự thiết kế lại FE thành username
    email,
    password,
  });
  // Có thể không cần lưu gì, vì sau đăng ký sẽ điều hướng sang /login
  return { name, email };
}

// (optional) gọi /api/users/me để lấy lại user từ token
export async function fetchCurrentUser() {
  const user = await api.get("/api/users/me");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  emit();
  return user;
}

// Gọi BE: POST /api/auth/logout + xóa token local
export async function logout() {
  try {
    await api.post("/api/auth/logout");
  } catch (e) {
    // nếu token expire hoặc lỗi BE thì vẫn xoá local cho chắc
    console.error(e);
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emit();
}

export function onAuthChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emit() {
  listeners.forEach((cb) => cb(isAuthenticated(), getUser()));
}
