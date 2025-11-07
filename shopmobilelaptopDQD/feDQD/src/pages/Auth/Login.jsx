// src/pages/Auth/Login.jsx
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { z } from "zod";
import SEO from "@/components/SEO";
import { login, isAuthenticated } from "@/lib/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email không hợp lệ."),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự."),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Nếu đã login → chuyển hướng (ưu tiên từ ?redirect=...)
  useEffect(() => {
    if (isAuthenticated()) {
      const redirect = new URLSearchParams(location.search).get("redirect") || "/";
      nav(redirect, { replace: true });
    }
  }, [location.search, nav]);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Đăng nhập",
    "url": typeof window !== "undefined" ? window.location.href : undefined
  }), []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const parsed = schema.safeParse({
      email: form.email.trim(),
      password: form.password,
      remember: !!form.remember,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    try {
      setSubmitting(true);
      await login(parsed.data);
      const redirect = new URLSearchParams(location.search).get("redirect") || "/";
      nav(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <SEO
        title="Đăng nhập | Cửa hàng"
        description="Đăng nhập để theo dõi đơn hàng, lưu sổ địa chỉ và nhận ưu đãi dành riêng cho bạn."
        canonical={typeof window !== "undefined" ? window.location.href : undefined}
        jsonLd={jsonLd}
      />
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">Đăng nhập</h1>

      {error && (
        <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm(v => ({ ...v, password: e.target.value }))}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPw(s => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-600 hover:bg-gray-100"
              aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm(v => ({ ...v, remember: e.target.checked }))}
            />
            Ghi nhớ đăng nhập
          </label>

          {/* Placeholder: sau này trỏ tới trang quên mật khẩu thật */}
          <Link to="/forgot-password" className="text-sm text-gray-900 underline hover:opacity-80">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          aria-label="Đăng nhập"
        >
          <LogIn className="h-5 w-5" />
          {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-gray-900 underline hover:opacity-80">Đăng ký</Link>
        </p>
      </form>
    </main>
  );
}
