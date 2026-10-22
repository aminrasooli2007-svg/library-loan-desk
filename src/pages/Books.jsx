
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router";
import { useBooks } from "../context/BooksContext";
import { useLanguage } from "../i18n/LanguageContext";
import BookCard from "../components/BookCard";

function Books() {
  const { books } = useBooks();
  const { language } = useLanguage();
  const isPersian = language === "fa";

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showBorrowableOnly, setShowBorrowableOnly] = useState(false);

  const text = {
    en: {
      eyebrow: "YOUR READING SPACE",
      title: "Explore the Collection",
      description:
        "Find your next favorite book, discover new subjects, and check which titles are ready to borrow.",
      bookTitles: "Book titles",
      findBook: "Find a book",
      search: "Search",
      searchPlaceholder: "Title or author...",
      subject: "Subject",
      allSubjects: "All Subjects",
      sortBy: "Sort by availability",
      defaultOrder: "Default order",
      mostAvailable: "Most available",
      fewestAvailable: "Fewest available",
      borrowableOnly: "Only show books available to borrow",
      resetFilters: "Reset filters",
      collection: "Book Collection",
      titlesShown: "titles shown",
      openLoanDesk: "Open Loan Desk",
      noBooks: "No books found",
      noBooksDescription:
        "Try a different search, choose another subject, or change the availability filter.",
      clearFilters: "Clear all filters",
    },
    fa: {
      eyebrow: "فضای مطالعه شما",
      title: "مجموعه کتاب‌ها را کاوش کنید",
      description:
        "کتاب موردعلاقه بعدی خود را پیدا کنید، با موضوعات جدید آشنا شوید و کتاب‌های آماده امانت را بررسی کنید.",
      bookTitles: "عنوان کتاب",
      findBook: "پیدا کردن کتاب",
      search: "جستجو",
      searchPlaceholder: "عنوان یا نام نویسنده...",
      subject: "موضوع",
      allSubjects: "همه موضوعات",
      sortBy: "مرتب‌سازی بر اساس موجودی",
      defaultOrder: "ترتیب پیش‌فرض",
      mostAvailable: "بیشترین موجودی",
      fewestAvailable: "کمترین موجودی",
      borrowableOnly: "فقط کتاب‌های آماده امانت نمایش داده شوند",
      resetFilters: "بازنشانی فیلترها",
      collection: "مجموعه کتاب‌ها",
      titlesShown: "عنوان نمایش داده شده",
      openLoanDesk: "ورود به بخش امانت",
      noBooks: "کتابی پیدا نشد",
      noBooksDescription:
        "عبارت دیگری جستجو کنید، موضوع دیگری انتخاب کنید یا فیلتر موجودی را تغییر دهید.",
      clearFilters: "پاک کردن همه فیلترها",
    },
  };

  const copy = text[isPersian ? "fa" : "en"];

  const subjects = [
    "All",
    ...new Set(books.map((book) => book.subject)),
  ];

  const filteredBooks = books.filter((book) => {
    const query = search.trim().toLowerCase();
    const titleMatches = book.title.toLowerCase().includes(query);
    const authorMatches = book.author.toLowerCase().includes(query);
    const subjectMatches =
      selectedSubject === "All" || book.subject === selectedSubject;
    const availableCopies = book.totalCopies - book.borrowedCopies;

    const availabilityMatches =
      !showBorrowableOnly || availableCopies > 0;

    return (
      (titleMatches || authorMatches) &&
      subjectMatches &&
      availabilityMatches
    );
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const availableA = a.totalCopies - a.borrowedCopies;
    const availableB = b.totalCopies - b.borrowedCopies;

    if (sortOrder === "most") return availableB - availableA;
    if (sortOrder === "fewest") return availableA - availableB;

    return 0;
  });

  function resetFilters() {
    setSearch("");
    setSelectedSubject("All");
    setSortOrder("default");
    setShowBorrowableOnly(false);
  }

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

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-medium text-[#F0A17F]">
                {copy.eyebrow}
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                {copy.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <BookOpen size={25} className="text-[#B9B1FF]" />
              <div>
                <p className="text-2xl font-bold">{books.length}</p>
                <p className="text-xs text-white/60">{copy.bookTitles}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={19} className="text-[#4033C3]" />
            <h2 className="font-semibold text-[#252432]">
              {copy.findBook}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px]">
            <div>
              <label
                htmlFor="book-search"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                {copy.search}
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className={`absolute ${
                    isPersian ? "right-3.5" : "left-3.5"
                  } top-1/2 -translate-y-1/2 text-[#777783]`}
                />
                <input
                  id="book-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className={`w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] py-3 ${
                    isPersian ? "pr-10 pl-4" : "pl-10 pr-4"
                  } text-sm text-[#252432] outline-none transition placeholder:text-[#9999A3] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject-filter"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                {copy.subject}
              </label>
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                className="w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "All" ? copy.allSubjects : subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sort-books"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                {copy.sortBy}
              </label>
              <select
                id="sort-books"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              >
                <option value="default">{copy.defaultOrder}</option>
                <option value="most">{copy.mostAvailable}</option>
                <option value="fewest">{copy.fewestAvailable}</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-[#E7E7ED] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-[#252432]">
              <input
                type="checkbox"
                checked={showBorrowableOnly}
                onChange={(event) =>
                  setShowBorrowableOnly(event.target.checked)
                }
                className="h-4 w-4 accent-[#4033C3]"
              />
              {copy.borrowableOnly}
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#777783] transition hover:bg-[#E7E7ED] hover:text-[#4033C3]"
            >
              <RotateCcw size={15} />
              {copy.resetFilters}
            </button>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#252432]">
                {copy.collection}
              </h2>
              <p className="mt-1 text-sm text-[#777783]">
                {sortedBooks.length} {isPersian ? "از" : "of"} {books.length}{" "}
                {copy.titlesShown}
              </p>
            </div>

            <Link
              to="/loans"
              className="rounded-xl bg-[#4033C3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
            >
              {copy.openLoanDesk}
            </Link>
          </div>

          {sortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D5D5E0] bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4033C3]/10 text-[#4033C3]">
                <Search size={25} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[#252432]">
                {copy.noBooks}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777783]">
                {copy.noBooksDescription}
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-[#4033C3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
              >
                {copy.clearFilters}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Books;
