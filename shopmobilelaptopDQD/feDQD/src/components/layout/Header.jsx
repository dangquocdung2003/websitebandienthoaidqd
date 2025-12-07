// src/components/layout/Header.jsx
import { useEffect, useState } from "react";
import MegaMenu from "@/components/navigation/MegaMenu";
import LanguageDropdown from "@/components/layout/LanguageDropdown";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { ShoppingCart, User } from "lucide-react";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { getCategories } from "@/lib/api";   // 🔥 lấy category từ BE

// Nếu muốn vẫn có vài link cố định ngoài categories
const STATIC_NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/shop" },
];

export default function Header() {
  const [showMega, setShowMega] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);

  // load categories từ BE
  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories(); // GET /api/categories
        setCategories(data);
      } catch (e) {
        console.error("Lỗi load categories:", e);
      }
    }
    load();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="PHONO" className="h-8 w-auto" />
            <span className="sr-only">PHONO</span>
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {/* Các link tĩnh */}
            {STATIC_NAV.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-semibold text-gray-800 hover:text-red-600"
              >
                {item.label}
              </Link>
            ))}

            {/* Nút mở MegaMenu dùng categories */}
            <div
              onMouseEnter={() => setShowMega(true)}
              onMouseLeave={() => setShowMega(false)}
              className="relative"
            >
              <button className="text-sm font-semibold text-gray-800 hover:text-red-600">
                Danh mục
                <span className="ml-1 text-red-500">▾</span>
              </button>

              {showMega && <MegaMenu categories={categories} />}
            </div>
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
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-red-600"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                2
              </span>
            </Link>

            {/* 👤 Đăng nhập */}
            <Link
              to="/login"
              className="hidden sm:flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
            >
              <User className="h-4 w-4 mr-2" />
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
