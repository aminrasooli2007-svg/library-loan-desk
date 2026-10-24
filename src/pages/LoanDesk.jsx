
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BookCheck,
  RotateCcw,
  Plus,
  Minus,
  CalendarDays,
  UserRound,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
} from "lucide-react";
import { useBooks } from "../context/BooksContext";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../i18n/LanguageContext";

const translations = {
  en: {
    title: "Loan Desk",
    subtitle: "Manage book loans and returns",
    availableCopies: "Available Copies",
    activeLoans: "Active Loans",
    returnedLoans: "Returned Loans",
    available: "available",
    searchBooks: "Search books by title or author...",
    noBooksFound: "No books found.",
    noAvailableCopies: "No copies available",
    addToLoan: "Add to Loan",
    selectedBooks: "Selected Books",
    emptyBasket: "No books selected yet.",
    removeOne: "Remove one copy",
    addOne: "Add one copy",
    copies: "copies",
    borrower: "Borrower Name",
    borrowerPlaceholder: "Enter borrower's name",
    dueDate: "Due Date",
    confirmLoan: "Confirm Loan",
    submitting: "Processing...",
    loanHistory: "Loan History",
    noLoans: "No loan records yet.",
    returned: "Returned",
    active: "Active",
    returnBook: "Return Books",
    returning: "Returning...",
    requiredFields: "Please complete all fields and select at least one book.",
    pastDueDate: "Due date cannot be in the past.",
    notAvailable: "No copies of this book are available.",
    noMoreCopies: "No more available copies of this book.",
    loanSuccess: "Loan registered successfully.",
    returnSuccess: "Books returned successfully.",
    loadError: "Could not load data. Please try again.",
    loanError: "Could not register the loan. Please try again.",
    returnError: "Could not return the books. Please try again.",
    refresh: "Refresh",
    loading: "Loading data...",
    totalSelected: "Total Selected Copies",
    book: "Book",
    author: "Author",
    due: "Due",
    borrowerRequired: "Borrower name is required.",
    today: "Today",
    copiesLabel: "copies",
    tryAgain: "Try Again",
    unavailable: "Unavailable",
  },
  fa: {
    title: "بخش امانت کتاب",
    subtitle: "مدیریت امانت‌ها و بازگشت کتاب‌ها",
    availableCopies: "نسخه‌های موجود",
    activeLoans: "امانت‌های فعال",
    returnedLoans: "امانت‌های بازگشتی",
    available: "نسخه موجود",
    searchBooks: "جستجو بر اساس عنوان یا نویسنده...",
    noBooksFound: "کتابی پیدا نشد.",
    noAvailableCopies: "نسخه‌ای موجود نیست",
    addToLoan: "افزودن به امانت",
    selectedBooks: "کتاب‌های انتخاب‌شده",
    emptyBasket: "هنوز کتابی انتخاب نشده است.",
    removeOne: "حذف یک نسخه",
    addOne: "افزودن یک نسخه",
    copies: "نسخه",
    borrower: "نام امانت‌گیرنده",
    borrowerPlaceholder: "نام امانت‌گیرنده را وارد کنید",
    dueDate: "تاریخ سررسید",
    confirmLoan: "ثبت امانت",
    submitting: "در حال ثبت...",
    loanHistory: "تاریخچه امانت‌ها",
    noLoans: "هنوز سابقه‌ای از امانت وجود ندارد.",
    returned: "بازگشت‌شده",
    active: "فعال",
    returnBook: "ثبت بازگشت کتاب‌ها",
    returning: "در حال بازگشت...",
    requiredFields: "تمام فیلدها را تکمیل و حداقل یک کتاب انتخاب کنید.",
    pastDueDate: "تاریخ سررسید نمی‌تواند در گذشته باشد.",
    notAvailable: "از این کتاب نسخه‌ای موجود نیست.",
    noMoreCopies: "نسخهٔ بیشتری از این کتاب موجود نیست.",
    loanSuccess: "امانت با موفقیت ثبت شد.",
    returnSuccess: "بازگشت کتاب‌ها با موفقیت ثبت شد.",
    loadError: "بارگذاری اطلاعات انجام نشد. دوباره تلاش کنید.",
    loanError: "ثبت امانت انجام نشد. دوباره تلاش کنید.",
    returnError: "بازگشت کتاب‌ها انجام نشد. دوباره تلاش کنید.",
    refresh: "بارگذاری مجدد",
    loading: "در حال دریافت اطلاعات...",
    totalSelected: "مجموع نسخه‌های انتخاب‌شده",
    book: "کتاب",
    author: "نویسنده",
    due: "سررسید",
    borrowerRequired: "وارد کردن نام امانت‌گیرنده ضروری است.",
    today: "امروز",
    copiesLabel: "نسخه",
    tryAgain: "تلاش دوباره",
    unavailable: "ناموجود",
  },
};

function formatDate(value, language) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(
    language === "fa" ? "fa-IR" : "en-GB",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

function LoanDesk() {
  const { books, setBooks } = useBooks();
  const { language } = useLanguage();

  const isPersian = language === "fa";
  const copy = translations[isPersian ? "fa" : "en"];

  const todayString = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [activeLoans, setActiveLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returningLoanId, setReturningLoanId] = useState(null);

  const showMessage = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  }, []);

  const loadBooks = useCallback(async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    const mappedBooks = (data || []).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      subject: book.subject,
      totalCopies: Number(book.total_copies),
      borrowedCopies: Number(book.borrowed_copies),
      availableCopies:
        Number(book.total_copies) - Number(book.borrowed_copies),
    }));

    setBooks(mappedBooks);

    return mappedBooks;
  }, [setBooks]);

  const loadLoans = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_loan_history");

    if (error) {
      throw error;
    }

    const mappedLoans = (data || []).map((loan) => ({
      id: loan.id,
      borrowerName: loan.borrower_name,
      dueDate: loan.due_date,
      returned: loan.status === "returned",
      books: (loan.items || []).map((item) => ({
        id: item.book_id ?? item.id,
        title: item.title,
        quantity: Number(item.quantity),
      })),
    }));

    setActiveLoans(mappedLoans);

    return mappedLoans;
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    try {
      await Promise.all([loadBooks(), loadLoans()]);
    } catch {
      showMessage(copy.loadError, "error");
    } finally {
      setIsLoading(false);
    }
  }, [loadBooks, loadLoans, showMessage, copy.loadError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return books;

    return books.filter((book) => {
      const title = String(book.title || "").toLowerCase();
      const author = String(book.author || "").toLowerCase();

      return title.includes(query) || author.includes(query);
    });
  }, [books, search]);

  const availableCopies = books.reduce(
    (total, book) =>
      total + Math.max(0, book.totalCopies - book.borrowedCopies),
    0
  );

  const activeLoansCount = activeLoans.filter(
    (loan) => !loan.returned
  ).length;

  const returnedLoansCount = activeLoans.filter(
    (loan) => loan.returned
  ).length;

  const selectedCopiesCount = selectedBooks.reduce(
    (total, book) => total + book.quantity,
    0
  );

  function addBook(book) {
    const available = book.totalCopies - book.borrowedCopies;

    if (available <= 0) {
      showMessage(copy.notAvailable, "error");
      return;
    }

    const selectedBook = selectedBooks.find(
      (item) => String(item.id) === String(book.id)
    );

    if (selectedBook) {
      if (selectedBook.quantity >= available) {
        showMessage(copy.noMoreCopies, "error");
        return;
      }

      setSelectedBooks((current) =>
        current.map((item) =>
          String(item.id) === String(book.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      setMessage("");
      return;
    }

    setSelectedBooks((current) => [
      ...current,
      { ...book, quantity: 1 },
    ]);

    setMessage("");
  }

  function increaseQuantity(bookId) {
    const book = books.find(
      (item) => String(item.id) === String(bookId)
    );

    if (!book) return;

    const available = book.totalCopies - book.borrowedCopies;

    setSelectedBooks((current) =>
      current.map((item) => {
        if (String(item.id) !== String(bookId)) return item;

        if (item.quantity >= available) return item;

        return { ...item, quantity: item.quantity + 1 };
      })
    );

    setMessage("");
  }

  function decreaseQuantity(bookId) {
    setSelectedBooks((current) =>
      current
        .map((book) =>
          String(book.id) === String(bookId)
            ? { ...book, quantity: book.quantity - 1 }
            : book
        )
        .filter((book) => book.quantity > 0)
    );

    setMessage("");
  }

  async function confirmLoan(event) {
    event.preventDefault();

    if (
      !borrowerName.trim() ||
      !dueDate ||
      selectedBooks.length === 0
    ) {
      showMessage(copy.requiredFields, "error");
      return;
    }

    if (dueDate < todayString) {
      showMessage(copy.pastDueDate, "error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const { error } = await supabase.rpc("confirm_loan", {
        p_borrower_name: borrowerName.trim(),
        p_due_date: dueDate,
        p_items: selectedBooks.map((book) => ({
          book_id: Number(book.id),
          quantity: book.quantity,
        })),
      });

      if (error) {
        showMessage(copy.loanError, "error");
        return;
      }

      setSelectedBooks([]);
      setBorrowerName("");
      setDueDate("");

      await Promise.all([loadBooks(), loadLoans()]);

      showMessage(copy.loanSuccess, "success");
    } catch {
      showMessage(copy.loanError, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function returnLoan(loanId) {
    const loan = activeLoans.find(
      (item) => String(item.id) === String(loanId)
    );

    if (!loan || loan.returned || returningLoanId !== null) {
      return;
    }

    setReturningLoanId(loanId);
    setMessage("");

    try {
      const { error } = await supabase.rpc("return_loan", {
        p_loan_id: Number(loanId),
      });

      if (error) {
        showMessage(copy.returnError, "error");
        return;
      }

      await Promise.all([loadBooks(), loadLoans()]);

      showMessage(copy.returnSuccess, "success");
    } catch {
      showMessage(copy.returnError, "error");
    } finally {
      setReturningLoanId(null);
    }
  }

  const cardClass =
    "rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm";

  const inputClass =
    "w-full rounded-xl border border-[#E7E7ED] bg-[#F8F7F4] px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10";

  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3428a5] disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div
      dir={isPersian ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8F7F4] px-4 py-6 text-[#252432] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {copy.title}
            </h1>
            <p className="mt-2 text-sm text-[#777582]">
              {copy.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#E7E7ED] bg-white px-4 py-3 text-sm font-medium transition hover:border-[#4033C3] disabled:opacity-50"
          >
            <RotateCcw size={16} />
            {copy.refresh}
          </button>
        </div>

        {message && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
              messageType === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {messageType === "error" ? (
              <CircleAlert size={19} className="mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className={cardClass}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#777582]">
                  {copy.availableCopies}
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? "—" : availableCopies}
                </p>
              </div>
              <div className="rounded-xl bg-[#4033C3]/10 p-3 text-[#4033C3]">
                <BookOpen size={24} />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#777582]">
                  {copy.activeLoans}
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? "—" : activeLoansCount}
                </p>
              </div>
              <div className="rounded-xl bg-orange-100 p-3 text-[#E66B3B]">
                <BookCheck size={24} />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#777582]">
                  {copy.returnedLoans}
                </p>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? "—" : returnedLoansCount}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className={`${cardClass} space-y-5`}>
            <div>
              <h2 className="text-lg font-bold">{copy.book}</h2>
              <p className="mt-1 text-sm text-[#777582]">
                {copy.addToLoan}
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchBooks}
              className={inputClass}
              aria-label={copy.searchBooks}
            />

            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#777582]">
                <LoaderCircle size={20} className="animate-spin" />
                {copy.loading}
              </div>
            ) : filteredBooks.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#777582]">
                {copy.noBooksFound}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredBooks.map((book) => {
                  const available =
                    book.totalCopies - book.borrowedCopies;

                  const selected = selectedBooks.find(
                    (item) =>
                      String(item.id) === String(book.id)
                  );

                  const unavailable = available <= 0;

                  return (
                    <div
                      key={book.id}
                      className="flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-[#E7E7ED] p-4 transition hover:border-[#4033C3]/40"
                    >
                      <div className="min-w-0">
                        <h3 className="break-words font-semibold">
                          {book.title}
                        </h3>
                        <p className="mt-1 break-words text-sm text-[#777582]">
                          {book.author || "—"}
                        </p>

                        {book.subject && (
                          <span className="mt-3 inline-flex rounded-lg bg-[#4033C3]/8 px-2.5 py-1 text-xs text-[#4033C3]">
                            {book.subject}
                          </span>
                        )}

                        <p
                          className={`mt-3 text-xs font-medium ${
                            unavailable
                              ? "text-red-600"
                              : "text-emerald-700"
                          }`}
                        >
                          {unavailable
                            ? copy.noAvailableCopies
                            : `${available} ${copy.available}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => addBook(book)}
                        disabled={unavailable || isSubmitting}
                        className={primaryButtonClass}
                      >
                        <Plus size={16} />
                        {selected
                          ? `${copy.addToLoan} (${selected.quantity})`
                          : copy.addToLoan}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className={`${cardClass} space-y-5`}>
            <div>
              <h2 className="text-lg font-bold">
                {copy.selectedBooks}
              </h2>
              <p className="mt-1 text-sm text-[#777582]">
                {copy.totalSelected}: {selectedCopiesCount}
              </p>
            </div>

            {selectedBooks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#D8D7E1] px-4 py-10 text-center">
                <BookOpen
                  size={30}
                  className="mx-auto text-[#A6A4B3]"
                />
                <p className="mt-3 text-sm text-[#777582]">
                  {copy.emptyBasket}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-[#F8F7F4] p-3"
                  >
                    <div className="min-w-0">
                      <p className="break-words text-sm font-semibold">
                        {book.title}
                      </p>
                      <p className="mt-1 text-xs text-[#777582]">
                        {book.quantity} {copy.copiesLabel}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(book.id)}
                        disabled={isSubmitting}
                        aria-label={copy.removeOne}
                        title={copy.removeOne}
                        className="rounded-lg border border-[#E7E7ED] bg-white p-2 transition hover:border-[#4033C3] disabled:opacity-50"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="min-w-5 text-center text-sm font-semibold">
                        {book.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(book.id)}
                        disabled={
                          isSubmitting ||
                          book.quantity >=
                            book.totalCopies - book.borrowedCopies
                        }
                        aria-label={copy.addOne}
                        title={copy.addOne}
                        className="rounded-lg border border-[#E7E7ED] bg-white p-2 transition hover:border-[#4033C3] disabled:opacity-50"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={confirmLoan} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="borrowerName"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <UserRound size={16} />
                  {copy.borrower}
                </label>

                <input
                  id="borrowerName"
                  type="text"
                  value={borrowerName}
                  onChange={(event) =>
                    setBorrowerName(event.target.value)
                  }
                  placeholder={copy.borrowerPlaceholder}
                  maxLength={150}
                  autoComplete="name"
                  className={inputClass}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dueDate"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CalendarDays size={16} />
                  {copy.dueDate}
                </label>

                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                  min={todayString}
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  isLoading ||
                  selectedBooks.length === 0
                }
                className={`${primaryButtonClass} w-full`}
              >
                {isSubmitting ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <BookCheck size={18} />
                )}
                {isSubmitting
                  ? copy.submitting
                  : copy.confirmLoan}
              </button>
            </form>
          </section>
        </div>

        <section className={`${cardClass} space-y-5`}>
          <div>
            <h2 className="text-lg font-bold">{copy.loanHistory}</h2>
            <p className="mt-1 text-sm text-[#777582]">
              {copy.subtitle}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#777582]">
              <LoaderCircle size={20} className="animate-spin" />
              {copy.loading}
            </div>
          ) : activeLoans.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#777582]">
              {copy.noLoans}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {activeLoans.map((loan) => (
                <article
                  key={loan.id}
                  className="rounded-xl border border-[#E7E7ED] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words font-semibold">
                        {loan.borrowerName}
                      </p>
                      <p className="mt-1 text-xs text-[#777582]">
                        {copy.due}: {formatDate(loan.dueDate, language)}
                      </p>
                    </div>

                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        loan.returned
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {loan.returned ? copy.returned : copy.active}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {loan.books.map((book, index) => (
                      <div
                        key={`${loan.id}-${book.id ?? index}`}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="break-words text-[#5E5C6B]">
                          {book.title || copy.book}
                        </span>
                        <span className="shrink-0 font-medium">
                          {book.quantity} ×
                        </span>
                      </div>
                    ))}
                  </div>

                  {!loan.returned && (
                    <button
                      type="button"
                      onClick={() => returnLoan(loan.id)}
                      disabled={returningLoanId !== null}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4033C3]/20 bg-[#4033C3]/5 px-4 py-3 text-sm font-semibold text-[#4033C3] transition hover:bg-[#4033C3]/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {returningLoanId === loan.id ? (
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <RotateCcw size={17} />
                      )}
                      {returningLoanId === loan.id
                        ? copy.returning
                        : copy.returnBook}
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default LoanDesk;
