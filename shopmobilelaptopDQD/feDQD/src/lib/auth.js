// src/lib/auth.js
// Auth mock đơn giản bằng localStorage. Thay bằng API thật khi sẵn sàng.

const TOKEN_KEY = "auth_token_v1";
const USER_KEY = "auth_user_v1";
const USERS_KEY = "auth_users_v1"; // danh sách user giả lập [{email,name,passwordHash?/plain}]

let listeners = new Set();

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
  catch { return null; }
}
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export async function login({ email, password }) {
  await new Promise(r => setTimeout(r, 300)); // giả lập trễ mạng

  // kiểm tra trong danh sách users mock
  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!found) throw new Error("Tài khoản không tồn tại.");

  // ⚠️ Demo: so sánh plain. Khi làm thật phải hash + kiểm tra server-side
  if ((found.password || "") !== password) {
    throw new Error("Mật khẩu không đúng.");
  }

  const token = "mock-token";
  const user = { email: found.email, name: found.name || found.email.split("@")[0] };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  emit();
  return user;
}

export async function register({ name, email, password }) {
  await new Promise(r => setTimeout(r, 300)); // giả lập trễ mạng

  const users = getUsers();
  const existed = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (existed) throw new Error("Email đã được đăng ký.");

  // ⚠️ Demo: lưu password plain. Khi làm thật: không bao giờ lưu plain ở client
  users.push({ name, email, password });
  saveUsers(users);
  return { name, email };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emit();
}

export function onAuthChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function emit() { listeners.forEach(cb => cb(isAuthenticated(), getUser())); }
