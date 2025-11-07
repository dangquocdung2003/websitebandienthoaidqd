import { useNavigate, useParams } from "react-router-dom";
export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); navigate("/admin/categories"); }} className="max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold">{isEdit ? "Sửa" : "Thêm"} category</h1>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Tên</label>
          <input className="w-full border rounded-xl px-3 py-2" defaultValue={isEdit ? "Phones" : ""} required />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Slug</label>
          <input className="w-full border rounded-xl px-3 py-2" defaultValue={isEdit ? "phones" : ""} required />
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl">Lưu</button>
          <button type="button" onClick={()=>navigate(-1)} className="border px-4 py-2 rounded-xl">Hủy</button>
        </div>
      </div>
    </form>
  );
}
