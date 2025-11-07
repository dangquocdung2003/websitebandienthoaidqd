import { NavLink, Outlet, useLocation } from "react-router-dom";

const Item = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-xl text-sm
       ${isActive ? "bg-black text-white" : "text-slate-700 hover:bg-slate-100"}`
    }
  >
    <span aria-hidden="true">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default function AdminLayout() {
  const { pathname } = useLocation();
  const titleMap = {
    "/admin": "Tổng quan",
    "/admin/categories": "Danh mục",
  };
  const pageTitle = titleMap[pathname] || "Bảng điều khiển";

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 p-4">
        <div className="text-xl font-semibold mb-6">Admin Panel</div>
        <nav className="space-y-1">
          <Item to="/admin" icon="📊" label="Tổng quan" />
          <Item to="/admin/categories" icon="🗂️" label="Danh mục" />
          {/* add thêm các mục khác tại đây */}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 text-sm text-slate-500">
          UI demo (no API)
        </div>
      </aside>

      <main className="pl-64">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 justify-between">
          <div className="font-medium">{pageTitle}</div>
          <input
            aria-label="Tìm kiếm"
            placeholder="Tìm kiếm…"
            className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring w-72"
          />
        </header>
        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
