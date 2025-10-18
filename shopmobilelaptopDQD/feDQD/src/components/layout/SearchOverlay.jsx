export default function SearchOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-white/85 backdrop-blur">
      <div className="mx-auto mt-6 flex max-w-3xl items-center gap-3 rounded-full border-2 border-red-300/80 bg-white px-4 py-3 shadow">
        <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-60">
          <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <input
          autoFocus
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full bg-transparent outline-none"
        />
        <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
          ✖
        </button>
      </div>
    </div>
  );
}
