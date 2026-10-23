
import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../i18n/LanguageContext";

function Reports() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: null,
    activeLoans: 0,
    returnedLoans: 0,
    overdueLoans: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const text = isFa
    ? {
        title: "گزارش‌های کتابخانه",
        subtitle: "خلاصه‌ای از وضعیت کتاب‌ها، اعضا و امانت‌ها",
        totalBooks: "مجموع کتاب‌ها",
        totalMembers: "مجموع اعضا",
        activeLoans: "امانت‌های فعال",
        returnedLoans: "امانت‌های برگشتی",
        overdueLoans: "امانت‌های دیرکرددار",
        refresh: "به‌روزرسانی",
        loading: "در حال دریافت گزارش‌ها...",
        error: "دریافت اطلاعات با خطا مواجه شد.",
        lastUpdated: "اطلاعات از پایگاه داده دریافت می‌شود.",
        membersLocked: "پس از ورود مدیر",
      }
    : {
        title: "Library Reports",
        subtitle: "An overview of books, members, and loans",
        totalBooks: "Total Books",
        totalMembers: "Total Members",
        activeLoans: "Active Loans",
        returnedLoans: "Returned Loans",
        overdueLoans: "Overdue Loans",
        refresh: "Refresh",
        loading: "Loading reports...",
        error: "Failed to load report data.",
        lastUpdated: "Data is retrieved from the database.",
        membersLocked: "Available after admin login",
      };

  async function loadReports() {
    setLoading(true);
    setError("");

    try {
      const [booksResult, loansResult] = await Promise.all([
        supabase
          .from("books")
          .select("id", { count: "exact", head: true }),
        supabase.rpc("get_loan_history"),
      ]);

      if (booksResult.error) {
        throw new Error(booksResult.error.message);
      }

      if (loansResult.error) {
        throw new Error(loansResult.error.message);
      }

      const loans = loansResult.data || [];
      const today = new Date();
      const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-");

      const activeLoans = loans.filter(
        (loan) => loan.status === "active"
      );

      const returnedLoans = loans.filter(
        (loan) => loan.status === "returned"
      );

      const overdueLoans = activeLoans.filter(
        (loan) => loan.due_date < todayString
      );

      setStats({
        totalBooks: booksResult.count ?? 0,
        totalMembers: null,
        activeLoans: activeLoans.length,
        returnedLoans: returnedLoans.length,
        overdueLoans: overdueLoans.length,
      });
    } catch (err) {
      console.error("Reports error:", err);
      setError(err.message || text.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const cards = [
    {
      key: "totalBooks",
      label: text.totalBooks,
      value: stats.totalBooks,
      icon: BookOpen,
    },
    {
      key: "totalMembers",
      label: text.totalMembers,
      value: stats.totalMembers === null ? "—" : stats.totalMembers,
      note: stats.totalMembers === null ? text.membersLocked : "",
      icon: Users,
    },
    {
      key: "activeLoans",
      label: text.activeLoans,
      value: stats.activeLoans,
      icon: ArrowLeftRight,
    },
    {
      key: "returnedLoans",
      label: text.returnedLoans,
      value: stats.returnedLoans,
      icon: CheckCircle2,
    },
    {
      key: "overdueLoans",
      label: text.overdueLoans,
      value: stats.overdueLoans,
      icon: AlertTriangle,
    },
  ];

  return (
    <section
      className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8 sm:px-8 sm:py-12"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#252432] sm:text-3xl">
            {text.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#777783] sm:text-base">
            {text.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={loadReports}
          disabled={loading}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3328A5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          {text.refresh}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 break-words rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-semibold">{text.error}</p>
          <p className="mt-2">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[#E7E7ED] bg-white p-10 text-center text-sm text-[#777783]">
          {text.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ key, label, value, note, icon: Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#777783]">
                    {label}
                  </p>
                  <p className="mt-4 text-3xl font-bold tabular-nums text-[#252432]">
                    {value}
                  </p>
                  {note && (
                    <p className="mt-2 text-xs text-[#777783]">
                      {note}
                    </p>
                  )}
                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F0EFFD] text-[#4033C3]">
                  <Icon size={23} strokeWidth={1.8} />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs text-[#777783]">
        <span className="h-2 w-2 rounded-full bg-[#4033C3]" />
        {text.lastUpdated}
      </div>
    </section>
  );
}

export default Reports;
