import { Link } from "react-router-dom";

export default function CategoriesList() {
  // Tạm thời mock dữ liệu để trang chạy
  const items = [{ id: 1, name: "Phones", slug: "phones" }];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Categories</h1>
        <Link to="new" className="bg-slate-900 text-white px-3 py-2 rounded-xl">+ Thêm mới</Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left p-3">Tên</th>
              <th className="text-left p-3">Slug</th>
              <th className="p-3 w-32 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Link to={String(c.id)} className="px-2 py-1 rounded-lg border border-slate-200">Sửa</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
