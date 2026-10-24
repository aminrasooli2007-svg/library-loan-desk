
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router";
import {
  BookOpen,
  House,
  LibraryBig,
  ArrowLeftRight,
  BookPlus,
  Users,
  Info,
  Mail,
  Languages,
  ChartNoAxesCombined,
  LogIn,
  LogOut,
} from "lucide-react";

import Home from "./pages/Home";
import Books from "./pages/Books";
import LoanDesk from "./pages/LoanDesk";
import ManageBooks from "./pages/ManageBooks";
import Members from "./pages/Members";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import { BooksProvider } from "./context/BooksContext";
import {
  LanguageProvider,
  useLanguage,
} from "./i18n/LanguageContext";
import { supabase } from "./lib/supabase";

const publicNavItems = [
  { to: "/", key: "home", icon: House, end: true },
  { to: "/books", key: "books", icon: LibraryBig },
  { to: "/about", key: "about", icon: Info },
  { to: "/contact", key: "contact", icon: Mail },
];

const adminNavItems = [
  { to: "/loans", key: "loanDesk", icon: ArrowLeftRight },
  { to: "/manage-books", key: "manageBooks", icon: BookPlus },
  { to: "/members", key: "members", icon: Users },
  { to: "/reports", key: "reports", icon: ChartNoAxesCombined },
];

function AdminRoute({ session, authLoading, children }) {
  const { language } = useLanguage();

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#777783]">
        {language === "fa"
          ? "در حال بررسی وضعیت ورود..."
          : "Checking sign-in status..."}
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { language, t, toggleLanguage } = useLanguage();
  const isPersian = language === "fa";

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (mounted) {
        setSession(error ? null : data.session);
        setAuthLoading(false);
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setLogoutLoading(true);

    const { error } = await supabase.auth.signOut();

    setLogoutLoading(false);

    if (error) {
      window.alert(
        isPersian
          ? "خروج انجام نشد. لطفاً دوباره تلاش کن."
          : "Sign out failed. Please try again."
      );
    }
  }

  const navItems = session
    ? [
        ...publicNavItems.slice(0, 2),
        ...adminNavItems,
        ...publicNavItems.slice(2),
      ]
    : [
        ...publicNavItems,
        { to: "/login", key: "login", icon: LogIn },
      ];

  function getNavLabel(key) {
    if (key === "login") {
      return isPersian ? "ورود مدیر" : "Admin Login";
    }

    return t(key);
  }

  return (
    <div
      className="min-h-screen bg-[#F8F7F4] text-[#252432]"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <header className="sticky top-0 z-50 border-b border-[#E7E7ED] bg-white/95 shadow-sm backdrop-blur-xl">
        <nav
          aria-label={isPersian ? "منوی اصلی" : "Main navigation"}
          className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between gap-3">
            <NavLink
              to="/"
              className="group flex min-w-0 items-center gap-3"
              aria-label={isPersian ? "صفحه اصلی" : "Home"}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4033C3] text-white shadow-md shadow-[#4033C3]/15 transition-transform duration-200 group-hover:scale-105">
                <BookOpen size={24} strokeWidth={1.8} />
              </span>

              <span className="min-w-0">
                <span className="block whitespace-nowrap text-lg font-bold tracking-tight text-[#252432] sm:text-xl">
                  {isPersian ? "کتابخانه" : "Library"}
                  <span className="text-[#4033C3]">
                    {isPersian ? "‌یار" : "Desk"}
                  </span>
                </span>

                <span className="mt-0.5 block truncate text-xs text-[#777783]">
                  {t("tagline")}
                </span>
              </span>
            </NavLink>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded-xl border border-[#E7E7ED] bg-white px-3 py-2.5 text-sm font-semibold text-[#4033C3] transition hover:border-[#4033C3]/30 hover:bg-[#F0EFFD]"
                aria-label={isPersian ? "تغییر زبان" : "Change language"}
              >
                <Languages size={17} />
                <span>{t("language")}</span>
              </button>

              {session && (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">
                    {logoutLoading
                      ? isPersian
                        ? "در حال خروج..."
                        : "Signing out..."
                      : isPersian
                        ? "خروج"
                        : "Logout"}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 border-t border-[#E7E7ED] pt-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center">
              {navItems.map(({ to, key, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-sm font-medium transition-all duration-200 sm:px-3 ${
                      isActive
                        ? "bg-[#4033C3] text-white shadow-sm shadow-[#4033C3]/20"
                        : key === "login"
                          ? "border border-[#4033C3]/20 bg-[#F0EFFD] text-[#4033C3] hover:bg-[#E7E4FF]"
                          : "border border-transparent text-[#777783] hover:border-[#E7E7ED] hover:bg-[#F8F7F4] hover:text-[#4033C3]"
                    }`
                  }
                >
                  <Icon
                    size={17}
                    className="shrink-0"
                    strokeWidth={1.9}
                  />
                  <span className="truncate">
                    {getNavLabel(key)}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/login"
            element={
              authLoading ? null : session ? (
                <Navigate to="/" replace />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/loans"
            element={
              <AdminRoute
                session={session}
                authLoading={authLoading}
              >
                <LoanDesk />
              </AdminRoute>
            }
          />

          <Route
            path="/manage-books"
            element={
              <AdminRoute
                session={session}
                authLoading={authLoading}
              >
                <ManageBooks />
              </AdminRoute>
            }
          />

          <Route
            path="/members"
            element={
              <AdminRoute
                session={session}
                authLoading={authLoading}
              >
                <Members />
              </AdminRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <AdminRoute
                session={session}
                authLoading={authLoading}
              >
                <Reports />
              </AdminRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      <footer className="border-t border-[#E7E7ED] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-[#777783] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-medium text-[#252432]">
            <span className="text-[#4033C3]">
              {isPersian ? "کتابخانه‌یار" : "LibraryDesk"}
            </span>
            {" — "}
            {t("footer")}
          </p>

          <p>{t("project")}</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BooksProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BooksProvider>
    </LanguageProvider>
  );
}

export default App;
