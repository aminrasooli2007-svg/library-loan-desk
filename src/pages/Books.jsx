import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router";
import { useBooks } from "../context/BooksContext";
import BookCard from "../components/BookCard";

function Books() {
  const { books } = useBooks();

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showBorrowableOnly, setShowBorrowableOnly] = useState(false);

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
    <main className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#252432] px-6 py-9 text-white sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#4033C3]/40 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-medium text-[#F0A17F]">
                YOUR READING SPACE
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Explore the Collection
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Find your next favorite book, discover new subjects, and check
                which titles are ready to borrow.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <BookOpen size={25} className="text-[#B9B1FF]" />
              <div>
                <p className="text-2xl font-bold">{books.length}</p>
                <p className="text-xs text-white/60">Book titles</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={19} className="text-[#4033C3]" />
            <h2 className="font-semibold text-[#252432]">Find a book</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px]">
            <div>
              <label
                htmlFor="book-search"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777783]"
                />
                <input
                  id="book-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Title or author..."
                  className="w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] py-3 pl-10 pr-4 text-sm text-[#252432] outline-none transition placeholder:text-[#9999A3] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject-filter"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                Subject
              </label>
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                className="w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "All" ? "All Subjects" : subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sort-books"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                Sort by availability
              </label>
              <select
                id="sort-books"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-xl border border-[#D5D5E0] bg-[#FCFCFB] px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              >
                <option value="default">Default order</option>
                <option value="most">Most available</option>
                <option value="fewest">Fewest available</option>
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
              Only show books available to borrow
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#777783] transition hover:bg-[#E7E7ED] hover:text-[#4033C3]"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#252432]">
                Book Collection
              </h2>
              <p className="mt-1 text-sm text-[#777783]">
                {sortedBooks.length} of {books.length} titles shown
              </p>
            </div>

            <Link
              to="/loans"
              className="rounded-xl bg-[#4033C3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
            >
              Open Loan Desk
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
                No books found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777783]">
                Try a different search, choose another subject, or change the
                availability filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-[#4033C3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Books;
