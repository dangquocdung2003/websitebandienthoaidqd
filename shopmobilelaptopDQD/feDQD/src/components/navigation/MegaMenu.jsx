// src/components/navigation/MegaMenu.jsx
import { Link } from "react-router-dom";

export default function MegaMenu({ categories = [] }) {
  if (!categories.length) return null;

  // chia categories thành 4 cột cho giống mega menu
  const cols = 4;
  const perCol = Math.ceil(categories.length / cols);
  const groups = Array.from({ length: cols }, (_, i) =>
    categories.slice(i * perCol, (i + 1) * perCol)
  );

  return (
    <div className="absolute left-1/2 z-40 w-[1100px] -translate-x-1/2 rounded-2xl border bg-white p-6 shadow-xl">
      <div className="grid grid-cols-4 gap-8">
        {groups.map((group, idx) => (
          <div key={idx}>
            <h4 className="mb-3 text-sm font-bold text-gray-900">
              {idx === 0 ? "Danh mục sản phẩm" : " "}
            </h4>
            <ul className="space-y-2 text-sm">
              {group.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
