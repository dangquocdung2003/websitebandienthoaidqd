// src/admin/Dashboard.jsx (ví dụ)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUser, onAuthChange } from "@/lib/auth";

export default function Dashboard() {
  const nav = useNavigate();
  const [authed, setAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(getUser());

  // Nếu chưa login thì đá về /login
  useEffect(() => {
    if (!isAuthenticated()) {
      nav("/login?redirect=/admin", { replace: true });
    }
  }, [nav]);

  // Lắng nghe thay đổi login/logout
  useEffect(() => {
    const unsub = onAuthChange((isAuth, u) => {
      setAuthed(isAuth);
      setUser(u);
      if (!isAuth) {
        nav("/login?redirect=/admin", { replace: true });
      }
    });
    return unsub;
  }, [nav]);

  async function handleLogout() {
    await logout();
    nav("/login", { replace: true });
  }

  const cards = [
    { title: "Today's Prompts", value: "1,245", sub: "Yesterday 1,110" },
    { title: "Active Users", value: "342", sub: "Avg. Session 4m12s" },
    { title: "Response Accuracy", value: "94.3%", sub: "↑ Stable" },
    { title: "Token Usage", value: "920,400", sub: "Yesterday 865,100" },
  ];

  return (
    <div className="space-y-4">
      {/* Thanh header nhỏ có logout */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        {authed && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">
              Xin chào, <b>{user?.username || user?.email}</b>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>

      {/* Nội dung dashboard cũ */}
      <div className="grid md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <div className="text-slate-500 text-sm">{c.title}</div>
            <div className="text-2xl font-semibold">{c.value}</div>
            <div className="text-xs text-slate-500">{c.sub}</div>
          </div>
        ))}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="font-semibold mb-2">AI Requests (Last 30 days)</div>
          <div className="h-40 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
            (Biểu đồ placeholder)
          </div>
        </div>
      </div>
    </div>
  );
}
