
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { supabase } from "../lib/supabase";

function Login() {
  const { language, toggleLanguage } = useLanguage();
  const isPersian = language === "fa";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const text = {
    fa: {
      title: "ورود مدیر",
      subtitle: "به پنل مدیریت کتابخانه‌یار خوش آمدید",
      email: "ایمیل",
      emailPlaceholder: "ایمیل خود را وارد کنید",
      password: "رمز عبور",
      passwordPlaceholder: "رمز عبور خود را وارد کنید",
      button: "ورود به حساب",
      loading: "در حال ورود...",
      back: "بازگشت به صفحه اصلی",
      language: "English",
      note: "ورود فقط برای مدیران مجاز است.",
      error: "ورود ناموفق بود. ایمیل و رمز عبور را بررسی کنید.",
    },
    en: {
      title: "Admin Login",
      subtitle: "Welcome to the LibraryDesk management panel",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      button: "Sign In",
      loading: "Signing in...",
      back: "Back to Home",
      language: "فارسی",
      note: "Authorized administrators only.",
      error: "Sign-in failed. Please check your email and password.",
    },
  };

  const t = text[isPersian ? "fa" : "en"];

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(t.error);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <div
      dir={isPersian ? "rtl" : "ltr"}
      className="flex min-h-[80vh] items-center justify-center bg-[#F8F7F4] px-4 py-12"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4033C3] text-white">
              <BookOpen size={26} />
            </span>
            <span>
              <span className="block text-lg font-bold text-[#252432]">
                {isPersian ? "کتابخانه‌یار" : "LibraryDesk"}
              </span>
              <span className="text-sm text-[#777783]">
                {isPersian ? "مدیریت کتابخانه" : "Library Management"}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-xl border border-[#E7E7ED] bg-white px-3 py-2 text-sm font-semibold text-[#4033C3] transition hover:bg-[#F0EFFD]"
          >
            {t.language}
          </button>
        </div>

        <div className="rounded-3xl border border-[#E7E7ED] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#252432]">{t.title}</h1>
            <p className="mt-2 text-sm leading-6 text-[#777783]">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#252432]"
              >
                {t.email}
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-[#E7E7ED] px-4 transition focus-within:border-[#4033C3] focus-within:ring-2 focus-within:ring-[#4033C3]/10">
                <Mail size={18} className="shrink-0 text-[#777783]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#252432] outline-none placeholder:text-[#A0A0AA]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#252432]"
              >
                {t.password}
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-[#E7E7ED] px-4 transition focus-within:border-[#4033C3] focus-within:ring-2 focus-within:ring-[#4033C3]/10">
                <LockKeyhole size={18} className="shrink-0 text-[#777783]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#252432] outline-none placeholder:text-[#A0A0AA]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-[#777783] transition hover:text-[#4033C3]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#4033C3] px-4 py-3.5 font-semibold text-white transition hover:bg-[#3328A5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t.loading : t.button}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-[#777783]">{t.note}</p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-[#4033C3] transition hover:underline"
          >
            ← {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
