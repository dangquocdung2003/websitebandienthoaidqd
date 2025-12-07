// src/components/home/HeroCarousel.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { isAuthenticated, logout, getUser, onAuthChange } from "@/lib/auth";
import { getCategories } from "@/lib/api";

// ================================
// 1. DATA SLIDE ĐẶT TRỰC TIẾP Ở ĐÂY
// (không cần file data/heroSlides nữa)
// ================================
const HERO_SLIDES = [
  {
    id: 1,
    titleTop: "PHIÊN BẢN ZANIA BLACK",
    titleMain: "VIỀN BO CONG\nÂM THANH KÉP",
    cta: "MUA NGAY",
    image:
      "https://cdn.baohatinh.vn/images/1e71a196269a6aae58ba732df8820f62406272fe600eeb697b95bbf8ce5e6b01fdd26ca7780531621d931f17c2041f9d59c1f4817d546ae4378a50074fe0561b/72d2135337t2077l4-ien-thoai-1.jpg",
  },
  {
    id: 2,
    titleTop: "HIỆU NĂNG VƯỢT TRỘI",
    titleMain: "MÀN HÌNH 120Hz\nPIN SIÊU KHỦNG",
    cta: "KHÁM PHÁ",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: 3,
    titleTop: "THIẾT KẾ TINH XẢO",
    titleMain: "MỎNG NHẸ\nSANG TRỌNG",
    cta: "XEM CHI TIẾT",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1920&q=85",
  },
];

HERO_SLIDES.sort(() => Math.random() - 0.5);

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;

  const [authed, setAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(getUser());

  // categories lấy từ BE
  const [categories, setCategories] = useState([]);

  const nav = useNavigate();

  // -------- load categories từ BE ----------
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

  // -------- auto slide ----------
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  // -------- listen login/logout ----------
  useEffect(() => {
    const unsub = onAuthChange((isAuth, u) => {
      setAuthed(isAuth);
      setUser(u);
    });
    return unsub;
  }, []);

  const go = (dir) => {
    setIndex((i) => (i + dir + total) % total);
  };

  const slide = HERO_SLIDES[index];

  async function handleLogout() {
    await logout();
    nav("/login");
  }

  return (
    <section className="relative isolate">
      {/* ========== MENU CHÍNH DÙNG CATEGORY ========== */}
      <div className="w-full bg-white shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          {/* Home cố định */}
          <Link
            to="/"
            className="text-gray-900 font-semibold hover:text-black transition"
          >
            Trang chủ
          </Link>

          {/* Các mục chính lấy từ categories */}
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="text-gray-700 font-medium hover:text-black transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ========== SLIDER ========== */}
      <div className="relative h-[560px] w-full overflow-hidden bg-black">
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* Logout góc phải */}
        {authed && (
          <div className="absolute right-6 top-6 z-20 flex items-center gap-3 text-white">
            <span className="hidden text-sm sm:inline">
              Xin chào, <b>{user?.username || user?.email}</b>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white hover:text-gray-900"
            >
              Đăng xuất
            </button>
          </div>
        )}

        {/* Nội dung slide */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm tracking-widest text-gray-200">
              {slide.titleTop}
            </p>
            <h1 className="whitespace-pre-line text-6xl font-extrabold leading-[1.1]">
              {slide.titleMain}
            </h1>
            <div className="mt-8">
              <Button className="bg-transparent text-white hover:bg-white hover:text-gray-900">
                {slide.cta.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide trước"
        >
          ‹
        </button>

        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide sau"
        >
          ›
        </button>
      </div>
    </section>
  );
}
