import { Trash2, Minus, Plus } from "lucide-react";

export default function CartItem({ item, onQty, onRemove }) {
  return (
    <div className="grid grid-cols-[96px_1fr_auto] gap-4 p-4 rounded-2xl border">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl"
        loading="lazy"
      />
      <div className="space-y-1">
        <h3 className="text-base font-semibold">{item.name}</h3>
        {item.variant && <p className="text-sm text-gray-500">Phân loại: {item.variant}</p>}
        <div className="flex items-center gap-2 mt-2" role="group" aria-label={`Số lượng của ${item.name}`}>
          <button
            className="p-2 rounded-lg border"
            aria-label="Giảm số lượng"
            onClick={() => onQty(Math.max(1, item.qty - 1))}
          ><Minus className="size-4" /></button>
          <span className="px-3 py-1 rounded-lg border bg-gray-50 min-w-10 text-center" aria-live="polite">{item.qty}</span>
          <button
            className="p-2 rounded-lg border"
            aria-label="Tăng số lượng"
            onClick={() => onQty(item.qty + 1)}
          ><Plus className="size-4" /></button>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <div className="font-semibold">{(item.price * item.qty).toLocaleString()}₫</div>
        <button
          onClick={onRemove}
          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
          aria-label={`Xóa ${item.name} khỏi giỏ`}
        >
          <Trash2 className="size-4" /> Xóa
        </button>
      </div>
    </div>
  );
}
