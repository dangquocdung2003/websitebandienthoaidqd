import { MEGA_MENU } from "@/data/menu";

export default function MegaMenu() {
  return (
    <div className="absolute left-1/2 z-40 w-[1100px] -translate-x-1/2 rounded-2xl border bg-white p-6 shadow-xl">
      <div className="grid grid-cols-4 gap-8">
        {MEGA_MENU.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-bold text-gray-900">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
