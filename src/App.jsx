import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import {
  BookOpen,
  House,
  LibraryBig,
  ArrowLeftRight,
  BookPlus,
  Info,
  Mail,
  Languages,
} from "lucide-react";

import Home from "./pages/Home";
import Books from "./pages/Books";
import LoanDesk from "./pages/LoanDesk";
import ManageBooks from "./pages/ManageBooks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BooksProvider } from "./context/BooksContext";
import {
  LanguageProvider,
  useLanguage,
} from "./i18n/LanguageContext";

const navItems = [
  { to: "/", key: "home", icon: House, end: true },
  { to: "/books", key: "books", icon: LibraryBig },
  { to: "/loans", key: "loanDesk", icon: ArrowLeftRight },
  { to: "/manage-books", key: "manageBooks", icon: BookPlus },
  { to: "/about", key: "about", icon: Info },
  { to: "/contact", key: "contact", icon: Mail },
];

function AppContent() {
  const { language, t, toggleLanguage } = useLanguage();

  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-[#F8F7F4] text-[#252432]"
        dir={language === "fa" ? "rtl" : "ltr"}
      >
        <header className="sticky top-0 z-50 border-b border-[#E7E7ED] bg-white/95 backdrop-blur-md">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex w-full items-center justify-between gap-3 lg:w-auto">
              <NavLink to="/" className="group flex w-fit items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4033C3] text-white shadow-sm transition group-hover:-rotate-3 group-hover:scale-105">
                  <BookOpen size={24} strokeWidth={1.8} />
                </span>

                <span>
                  <span className="block text-lg font-bold tracking-tight text-[#252432]">
                    Library
                    <span className="text-[#4033C3]">Desk</span>
                  </span>

                  <span className="mt-0.5 block text-xs tracking-wide text-[#777783]">
                    {t("tagline")}
                  </span>
                </span>
              </NavLink>

              <button
                type="button"
                onClick={toggleLanguage}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E7E7ED] bg-white px-3 py-2.5 text-sm font-semibold text-[#4033C3] transition hover:bg-[#F0EFFD] lg:hidden"
                aria-label="Change language"
              >
                <Languages size={17} />
                <span>{t("language")}</span>
              </button>
            </div>

            <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-2">
              <div className="flex min-w-0 gap-1 overflow-x-auto pb-1 lg:pb-0">
                {navItems.map(({ to, key, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#4033C3] text-white shadow-sm"
                          : "text-[#777783] hover:bg-[#E7E7ED] hover:text-[#4033C3]"
                      }`
                    }
                  >
                    <Icon size={16} strokeWidth={1.9} />
                    <span>{t(key)}</span>
                  </NavLink>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleLanguage}
                className="hidden shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E7E7ED] bg-white px-3 py-2.5 text-sm font-semibold text-[#4033C3] transition hover:bg-[#F0EFFD] lg:flex"
                aria-label="Change language"
              >
                <Languages size={17} />
                <span>{t("language")}</span>
              </button>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/loans" element={<LoanDesk />} />
            <Route path="/manage-books" element={<ManageBooks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="border-t border-[#E7E7ED] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-[#777783] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="font-medium text-[#252432]">
              <span className="text-[#4033C3]">LibraryDesk</span>
              {" — "}
              {t("footer")}
            </p>

            <p>{t("project")}</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BooksProvider>
        <AppContent />
      </BooksProvider>
    </LanguageProvider>
  );
}

export default App;
