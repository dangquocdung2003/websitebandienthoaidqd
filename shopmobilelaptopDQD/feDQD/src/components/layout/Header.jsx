import { useState } from "react";
import { TOP_NAV } from "@/data/menu";
import MegaMenu from "@/components/navigation/MegaMenu";
import LanguageDropdown from "@/components/layout/LanguageDropdown";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { ShoppingCart, User } from "lucide-react"; // ✅ thêm icon
import logo from "@/assets/logo.svg";

export default function Header() {
  const [showMega, setShowMega] = useState(false);
  const [showPagesMega, setShowPagesMega] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="PHONO" className="h-8 w-auto" />
            <span className="sr-only">PHONO</span>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {TOP_NAV.map((item) => {
              if (item.type === "mega") {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setShowMega(true)}
                    onMouseLeave={() => setShowMega(false)}
                    className="relative"
                  >
                    <button className="text-sm font-semibold text-gray-800 hover:text-red-600">
                      {item.label}
                      <span className="ml-1 text-red-500">▾</span>
                    </button>
                    {showMega && <MegaMenu />}
                  </div>
                );
              }
              if (item.type === "mega-pages") {
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setShowPagesMega(true)}
                    onMouseLeave={() => setShowPagesMega(false)}
                    className="relative"
                  >
                    <button className="text-sm font-semibold text-gray-800 hover:text-red-600">
                      {item.label}
                      <span className="ml-1 text-red-500">▾</span>
                    </button>
                    {showPagesMega && <MegaMenu />}
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-red-600"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* 🔍 Tìm kiếm */}
            <button
              onClick={() => setShowSearch(true)}
              aria-label="Mở tìm kiếm"
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              🔍
            </button>

            {/* 🌐 Ngôn ngữ */}
            <LanguageDropdown />

            {/* 🛒 Giỏ hàng */}
            <button
              className="relative p-2 text-gray-700 hover:text-red-600"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                2
              </span>
            </button>

            {/* 👤 Đăng nhập */}
            <button className="hidden sm:flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
              <User className="h-4 w-4 mr-2" />
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
