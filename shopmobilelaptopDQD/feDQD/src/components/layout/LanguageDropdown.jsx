import { useState } from "react";

const LANGS = [
  { code: "VN", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "JP", label: "日本語", flag: "🇯🇵" },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGS[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
      >
        <span className="text-sm font-medium">{current.code}</span>
        <span className="text-lg">{current.flag}</span>
        <svg width="14" height="14" viewBox="0 0 20 20" className="opacity-60">
          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl border bg-white shadow-lg">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setCurrent(l);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
