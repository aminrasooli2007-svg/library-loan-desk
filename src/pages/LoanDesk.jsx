
import { useState } from "react";
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
  ArrowRight,
} from "lucide-react";
import { useBooks } from "../context/BooksContext";
import { useLanguage } from "../i18n/LanguageContext";

function LoanDesk() {
  const { books, setBooks } = useBooks();
  const { language } = useLanguage();
  const isPersian = language === "fa";

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [activeLoans, setActiveLoans] = useState([]);
  const [message, setMessage] = useState("");

  const text = {
    en: {
      availableCopies: "Available Copies",
      readyToBorrow: "Ready to be borrowed",
      activeLoans: "Active Loans",
      currentlyOnLoan: "Currently on loan",
      returnedLoans: "Returned Loans",
      completedReturns: "Completed returns",
      libraryServices: "LIBRARY SERVICES",
      loanDesk: "Loan Desk",
      description: "Manage book borrowing and returns in one organized workspace.",
      basketCopies: "Copies in your basket",
      step1: "STEP 1",
      chooseBooks: "Choose your books",
      chooseDescription: "Select available books to add them to the loan basket.",
      by: "By",
      copy: "copy",
      copies: "copies",
      available: "available",
      addCopy: "Add copy",
      addToBasket: "Add to basket",
      step2: "STEP 2",
      basket: "Loan basket",
      emptyBasket: "Your basket is empty",
      emptyDescription: "Add a book from the collection to get started.",
      quantity: "Quantity",
      borrowerInfo: "Borrower information",
      borrowerName: "Borrower name",
      borrowerPlaceholder: "Enter borrower name",
      dueDate: "Due date",
      confirmLoan: "Confirm Loan",
      loanActivity: "LOAN ACTIVITY",
      recentLoans: "Recent loans",
      noLoans: "No loans recorded yet.",
      returned: "Returned",
      active: "Active",
      returnBooks: "Return books",
      notAvailable: "This book is not available.",
      noMoreCopies: "No more copies of this book are available.",
      requiredFields: "Please enter the borrower name, due date, and select a book.",
      pastDueDate: "The due date cannot be in the past.",
      insufficientCopies: "Not enough copies are available for one or more books.",
      loanSuccess: "Loan confirmed successfully!",
      returnSuccess: "Books returned successfully!",
      decreaseQuantity: "Decrease quantity of",
      increaseQuantity: "Increase quantity of",
      due: "Due",
    },
    fa: {
      availableCopies: "نسخه‌های موجود",
      readyToBorrow: "آماده برای امانت",
      activeLoans: "امانت‌های فعال",
      currentlyOnLoan: "در حال حاضر امانت داده شده",
      returnedLoans: "امانت‌های بازگشتی",
      completedReturns: "امانت‌های تکمیل‌شده",
      libraryServices: "خدمات کتابخانه",
      loanDesk: "بخش امانت کتاب",
      description: "امانت گرفتن و بازگرداندن کتاب‌ها را در یک فضای منظم مدیریت کنید.",
      basketCopies: "نسخه‌های سبد امانت",
      step1: "مرحله اول",
      chooseBooks: "کتاب‌های خود را انتخاب کنید",
      chooseDescription: "کتاب‌های موجود را انتخاب کنید تا به سبد امانت اضافه شوند.",
      by: "نویسنده:",
      copy: "نسخه",
      copies: "نسخه",
      available: "موجود",
      addCopy: "افزودن نسخه",
      addToBasket: "افزودن به سبد",
      step2: "مرحله دوم",
      basket: "سبد امانت",
      emptyBasket: "سبد شما خالی است",
      emptyDescription: "برای شروع، یک کتاب از مجموعه انتخاب کنید.",
      quantity: "تعداد",
      borrowerInfo: "اطلاعات امانت‌گیرنده",
      borrowerName: "نام امانت‌گیرنده",
      borrowerPlaceholder: "نام امانت‌گیرنده را وارد کنید",
      dueDate: "تاریخ بازگرداندن",
      confirmLoan: "تأیید امانت",
      loanActivity: "فعالیت‌های امانت",
      recentLoans: "امانت‌های اخیر",
      noLoans: "هنوز امانتی ثبت نشده است.",
      returned: "بازگردانده شده",
      active: "فعال",
      returnBooks: "بازگرداندن کتاب‌ها",
      notAvailable: "این کتاب موجود نیست.",
      noMoreCopies: "نسخه بیشتری از این کتاب موجود نیست.",
      requiredFields: "لطفاً نام امانت‌گیرنده و تاریخ بازگرداندن را وارد کرده و یک کتاب انتخاب کنید.",
      pastDueDate: "تاریخ بازگرداندن نمی‌تواند در گذشته باشد.",
      insufficientCopies: "تعداد نسخه‌های موجود برای یک یا چند کتاب کافی نیست.",
      loanSuccess: "امانت با موفقیت ثبت شد!",
      returnSuccess: "کتاب‌ها با موفقیت بازگردانده شدند!",
      decreaseQuantity: "کاهش تعداد",
      increaseQuantity: "افزایش تعداد",
      due: "مهلت بازگرداندن:",
    },
  };

  const copy = text[isPersian ? "fa" : "en"];

  const availableCopies = books.reduce(
    (total, book) => total + book.totalCopies - book.borrowedCopies,
    0
  );

  const activeLoansCount = activeLoans.filter(
    (loan) => loan.returned === false
  ).length;

  const returnedLoansCount = activeLoans.filter(
    (loan) => loan.returned === true
  ).length;

  const selectedCopiesCount = selectedBooks.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function addBook(book) {
    const available = book.totalCopies - book.borrowedCopies;

    if (available <= 0) {
      setMessage(copy.notAvailable);
      return;
    }

    const selectedBook = selectedBooks.find(
      (item) => item.id === book.id
    );

    if (selectedBook) {
      if (selectedBook.quantity >= available) {
        setMessage(copy.noMoreCopies);
        return;
      }

      increaseQuantity(book.id);
      return;
    }

    const newSelectedBook = {
      ...book,
      quantity: 1,
    };

    setSelectedBooks([...selectedBooks, newSelectedBook]);
    setMessage("");
  }

  function increaseQuantity(bookId) {
    const book = books.find((item) => item.id === bookId);

    if (!book) return;

    const available = book.totalCopies - book.borrowedCopies;

    setSelectedBooks(
      selectedBooks.map((item) => {
        if (item.id !== bookId) return item;
        if (item.quantity >= available) return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );

    setMessage("");
  }

  function decreaseQuantity(bookId) {
    const updatedBooks = selectedBooks
      .map((book) => {
        if (book.id !== bookId) return book;

        return {
          ...book,
          quantity: book.quantity - 1,
        };
      })
      .filter((book) => book.quantity > 0);

    setSelectedBooks(updatedBooks);
    setMessage("");
  }

  function confirmLoan() {
    if (!borrowerName.trim() || !dueDate || selectedBooks.length === 0) {
      setMessage(copy.requiredFields);
      return;
    }

    if (dueDate < todayString) {
      setMessage(copy.pastDueDate);
      return;
    }

    const unavailableBook = selectedBooks.some((selectedBook) => {
      const book = books.find((item) => item.id === selectedBook.id);

      if (!book) return true;

      const available = book.totalCopies - book.borrowedCopies;

      return selectedBook.quantity > available;
    });

    if (unavailableBook) {
      setMessage(copy.insufficientCopies);
      return;
    }

    const newLoan = {
      id: Date.now(),
      borrowerName: borrowerName.trim(),
      dueDate: dueDate,
      books: selectedBooks.map((book) => ({
        id: book.id,
        title: book.title,
        quantity: book.quantity,
      })),
      returned: false,
    };

    const updatedBooks = books.map((book) => {
      const selectedBook = selectedBooks.find(
        (item) => item.id === book.id
      );

      if (!selectedBook) return book;

      return {
        ...book,
        borrowedCopies: book.borrowedCopies + selectedBook.quantity,
      };
    });

    setBooks(updatedBooks);
    setActiveLoans([...activeLoans, newLoan]);
    setSelectedBooks([]);
    setBorrowerName("");
    setDueDate("");
    setMessage(copy.loanSuccess);
  }

  function returnLoan(loanId) {
    const loan = activeLoans.find((item) => item.id === loanId);

    if (!loan || loan.returned) return;

    const updatedBooks = books.map((book) => {
      const returnedBook = loan.books.find(
        (item) => item.id === book.id
      );

      if (!returnedBook) return book;

      return {
        ...book,
        borrowedCopies: Math.max(
          0,
          book.borrowedCopies - returnedBook.quantity
        ),
      };
    });

    const updatedLoans = activeLoans.map((item) => {
      if (item.id !== loanId) return item;

      return {
        ...item,
        returned: true,
      };
    });

    setBooks(updatedBooks);
    setActiveLoans(updatedLoans);
    setMessage(copy.returnSuccess);
  }

  const stats = [
    {
      label: copy.availableCopies,
      value: availableCopies,
      note: copy.readyToBorrow,
      icon: BookOpen,
    },
    {
      label: copy.activeLoans,
      value: activeLoansCount,
      note: copy.currentlyOnLoan,
      icon: BookCheck,
    },
    {
      label: copy.returnedLoans,
      value: returnedLoansCount,
      note: copy.completedReturns,
      icon: RotateCcw,
    },
  ];

  return (
    <main
      dir={isPersian ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8F7F4]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#252432] px-6 py-9 text-white sm:px-10 sm:py-12">
          <div
            className={`pointer-events-none absolute ${
              isPersian ? "-left-12" : "-right-12"
            } -top-16 h-56 w-56 rounded-full bg-[#4033C3]/40 blur-3xl`}
          />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-medium text-[#F0A17F]">
                {copy.libraryServices}
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.loanDesk}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                {copy.description}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <BookOpen size={25} className="text-[#B9B1FF]" />
              <div>
                <p className="text-2xl font-bold">{selectedCopiesCount}</p>
                <p className="text-xs text-white/60">{copy.basketCopies}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ label, value, note, icon: Icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#777783]">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-[#252432]">
                    {value}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4033C3]/10 text-[#4033C3]">
                  <Icon size={23} />
                </div>
              </div>
              <p className="mt-4 border-t border-[#E7E7ED] pt-4 text-sm text-[#777783]">
                {note}
              </p>
            </article>
          ))}
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-[#4033C3]">
                {copy.step1}
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#252432]">
                {copy.chooseBooks}
              </h2>
              <p className="mt-2 text-sm text-[#777783]">
                {copy.chooseDescription}
              </p>
            </div>

            <div className="space-y-3">
              {books.map((book, index) => {
                const available =
                  book.totalCopies - book.borrowedCopies;

                const isSelected = selectedBooks.some(
                  (item) => item.id === book.id
                );

                const coverColors = [
                  "from-[#4033C3] to-[#7770D8]",
                  "from-[#385B50] to-[#789487]",
                  "from-[#A45135] to-[#E6A17F]",
                  "from-[#343B54] to-[#7584A5]",
                ];

                return (
                  <article
                    key={book.id}
                    className="flex gap-4 rounded-xl border border-[#E7E7ED] p-4 transition hover:border-[#C9C3F5]"
                  >
                    <div
                      className={`flex h-24 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${coverColors[index % coverColors.length]} p-2 text-center text-white shadow-sm`}
                    >
                      <BookOpen size={24} strokeWidth={1.5} />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#4033C3]">
                          {book.subject}
                        </p>
                        <h3 className="mt-1 font-semibold text-[#252432]">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#777783]">
                          {copy.by} {book.author}
                        </p>
                        <p className="mt-2 text-xs text-[#777783]">
                          {available} {isPersian ? copy.copies : available === 1 ? copy.copy : copy.copies} {copy.available}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={available <= 0}
                        onClick={() => addBook(book)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5144D8] disabled:cursor-not-allowed disabled:bg-[#E7E7ED] disabled:text-[#777783]"
                      >
                        <Plus size={16} />
                        {isSelected ? copy.addCopy : copy.addToBasket}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="space-y-8">
            <section className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#4033C3]">
                    {copy.step2}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#252432]">
                    {copy.basket}
                  </h2>
                </div>
                <span className="rounded-full bg-[#4033C3]/10 px-3 py-1 text-sm font-semibold text-[#4033C3]">
                  {selectedCopiesCount} {copy.copies}
                </span>
              </div>

              {selectedBooks.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-[#D5D5E0] px-4 py-8 text-center">
                  <BookOpen className="mx-auto text-[#777783]" size={28} />
                  <p className="mt-3 font-medium text-[#252432]">
                    {copy.emptyBasket}
                  </p>
                  <p className="mt-1 text-sm text-[#777783]">
                    {copy.emptyDescription}
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {selectedBooks.map((book) => {
                    const currentBook = books.find(
                      (item) => item.id === book.id
                    );

                    if (!currentBook) return null;

                    const available =
                      currentBook.totalCopies - currentBook.borrowedCopies;

                    return (
                      <div
                        key={book.id}
                        className="rounded-xl bg-[#F8F7F4] p-4"
                      >
                        <p className="font-semibold text-[#252432]">
                          {book.title}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-xs text-[#777783]">
                            {copy.quantity}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(book.id)}
                              aria-label={`${copy.decreaseQuantity} ${book.title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D5D5E0] bg-white text-[#4033C3] hover:bg-[#4033C3]/10"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-4 text-center text-sm font-bold">
                              {book.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={book.quantity >= available}
                              onClick={() => increaseQuantity(book.id)}
                              aria-label={`${copy.increaseQuantity} ${book.title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D5D5E0] bg-white text-[#4033C3] hover:bg-[#4033C3]/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-5 border-t border-[#E7E7ED] pt-5">
                <p className="text-sm font-medium text-[#252432]">
                  {copy.borrowerInfo}
                </p>

                <label
                  htmlFor="borrowerName"
                  className="mb-2 mt-4 flex items-center gap-2 text-sm text-[#777783]"
                >
                  <UserRound size={16} />
                  {copy.borrowerName}
                </label>
                <input
                  id="borrowerName"
                  type="text"
                  value={borrowerName}
                  onChange={(event) => setBorrowerName(event.target.value)}
                  placeholder={copy.borrowerPlaceholder}
                  className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />

                <label
                  htmlFor="dueDate"
                  className="mb-2 mt-4 flex items-center gap-2 text-sm text-[#777783]"
                >
                  <CalendarDays size={16} />
                  {copy.dueDate}
                </label>
                <input
                  id="dueDate"
                  type="date"
                  min={todayString}
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />

                {message && (
                  <p
                    role="status"
                    className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
                      [copy.loanSuccess, copy.returnSuccess].includes(message)
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    {[copy.loanSuccess, copy.returnSuccess].includes(message) ? (
                      <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
                    ) : (
                      <CircleAlert className="mt-0.5 shrink-0" size={16} />
                    )}
                    {message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={confirmLoan}
                  disabled={
                    !borrowerName.trim() ||
                    !dueDate ||
                    selectedBooks.length === 0
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-4 py-3 font-semibold text-white transition hover:bg-[#5144D8] disabled:cursor-not-allowed disabled:bg-[#E7E7ED] disabled:text-[#777783]"
                >
                  {copy.confirmLoan}
                  <ArrowRight
                    size={17}
                    className={isPersian ? "rotate-180" : ""}
                  />
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
              <div>
                <p className="text-sm font-medium text-[#4033C3]">
                  {copy.loanActivity}
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#252432]">
                  {copy.recentLoans}
                </h2>
              </div>

              {activeLoans.length === 0 ? (
                <div className="mt-5 rounded-xl bg-[#F8F7F4] px-4 py-6 text-center">
                  <p className="text-sm text-[#777783]">
                    {copy.noLoans}
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {[...activeLoans].reverse().map((loan) => (
                    <article
                      key={loan.id}
                      className="rounded-xl border border-[#E7E7ED] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#252432]">
                            {loan.borrowerName}
                          </p>
                          <p className="mt-1 text-xs text-[#777783]">
                            {copy.due} {loan.dueDate}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            loan.returned
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#4033C3]/10 text-[#4033C3]"
                          }`}
                        >
                          {loan.returned ? copy.returned : copy.active}
                        </span>
                      </div>

                      <ul className="mt-3 space-y-1 text-sm text-[#777783]">
                        {loan.books.map((book) => (
                          <li key={book.id}>
                            {book.title} × {book.quantity}
                          </li>
                        ))}
                      </ul>

                      {!loan.returned && (
                        <button
                          type="button"
                          onClick={() => returnLoan(loan.id)}
                          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#252432] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#4033C3]"
                        >
                          <RotateCcw size={15} />
                          {copy.returnBooks}
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoanDesk;
