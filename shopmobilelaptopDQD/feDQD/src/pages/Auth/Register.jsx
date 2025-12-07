// src/pages/Auth/Register.jsx
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { z } from "zod";
import SEO from "@/components/SEO";
import { isAuthenticated, register } from "@/lib/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(2, "Tên tối thiểu 2 ký tự."),
    email: z.string().email("Email không hợp lệ."),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự."),
    confirm: z.string().min(6, "Nhập lại mật khẩu."),
    agree: z.literal(true, {
      errorMap: () => ({ message: "Bạn cần đồng ý điều khoản." }),
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu nhập lại không khớp.",
    path: ["confirm"],
  });

function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4); // 0..4
}

export default function RegisterPage() {
  const nav = useNavigate();
  const location = useLocation();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  // Nếu đã đăng nhập, chuyển hướng khỏi trang đăng ký
  useEffect(() => {
    if (isAuthenticated()) {
      const redirect =
        new URLSearchParams(location.search).get("redirect") || "/";
      nav(redirect, { replace: true });
    }
  }, [location.search, nav]);

  const strength = passwordStrength(form.password);
  const strengthLabel = ["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh"][
    strength
  ];

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Đăng ký tài khoản",
      potentialAction: {
        "@type": "RegisterAction",
        target:
          typeof window !== "undefined" ? window.location.href : undefined,
      },
    }),
    []
  );

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setSubmitting(true);
      // 👉 hàm register ở src/lib/auth.js sẽ gọi POST /api/auth/register
      // và map name -> username cho backend
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      const redirect =
        new URLSearchParams(location.search).get("redirect") || "/";
      nav(`/login?redirect=${encodeURIComponent(redirect)}`, {
        replace: true,
      });
    } catch (err) {
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <SEO
        title="Đăng ký | Cửa hàng"
        description="Tạo tài khoản để theo dõi đơn hàng, lưu địa chỉ và nhận ưu đãi dành riêng cho bạn."
        canonical={
          typeof window !== "undefined" ? window.location.href : undefined
        }
        jsonLd={jsonLd}
      />
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">Đăng ký</h1>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium"
          >
            Họ và tên
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="Nguyễn Văn A"
            value={form.name}
            onChange={(e) =>
              setForm((v) => ({ ...v, name: e.target.value }))
            }
            required
            minLength={2}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm((v) => ({ ...v, email: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Ít nhất 6 ký tự"
              value={form.password}
              onChange={(e) =>
                setForm((v) => ({ ...v, password: e.target.value }))
              }
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-600 hover:bg-gray-100"
              aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPw ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mt-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-gray-900 transition-all"
                style={{ width: `${(strength + 1) * 20}%` }}
                aria-hidden="true"
              />
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Độ mạnh mật khẩu: <b>{strengthLabel}</b>
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="mb-1 block text-sm font-medium"
          >
            Nhập lại mật khẩu
          </label>
          <div className="relative">
            <input
              id="confirm"
              type={showPw2 ? "text" : "password"}
              autoComplete="new-password"
              className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Nhập lại mật khẩu"
              value={form.confirm}
              onChange={(e) =>
                setForm((v) => ({ ...v, confirm: e.target.value }))
              }
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPw2((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-600 hover:bg-gray-100"
              aria-label={showPw2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPw2 ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) =>
              setForm((v) => ({ ...v, agree: e.target.checked }))
            }
          />
          <span>
            Tôi đồng ý với{" "}
            <a href="/terms" className="underline">
              Điều khoản
            </a>{" "}
            và{" "}
            <a href="/privacy" className="underline">
              Chính sách
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          aria-label="Đăng ký"
        >
          <UserPlus className="h-5 w-5" />
          {submitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-gray-900 underline hover:opacity-80"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </main>
  );
}
