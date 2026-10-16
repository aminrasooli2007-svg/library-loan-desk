
import { useState } from "react";
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
    const query = search.toLowerCase();
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

    if (sortOrder === "most") {
      return availableB - availableA;
    }

    if (sortOrder === "fewest") {
      return availableA - availableB;
    }

    return 0;
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#E66B3B]">
          Library Collection
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-[#252432]">
          Browse Books
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777783]">
          Explore the collection and check how many copies are available to
          borrow.
        </p>
      </section>

      <section className="mb-8 rounded-2xl border border-[#DCDCE6] bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px] lg:items-end">
          <div>
            <label
              htmlFor="book-search"
              className="mb-2 block text-sm font-medium text-[#252432]"
            >
              Search books
            </label>

            <input
              id="book-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or author..."
              className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
            />
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
              className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
            >
              <option value="All">All Subjects</option>

              {subjects
                .filter((subject) => subject !== "All")
                .map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
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
              className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm text-[#252432] outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
            >
              <option value="default">Default order</option>
              <option value="most">Most available</option>
              <option value="fewest">Fewest available</option>
            </select>
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3 border-t border-[#E7E7ED] pt-4 text-sm font-medium text-[#252432]">
          <input
            type="checkbox"
            checked={showBorrowableOnly}
            onChange={(event) =>
              setShowBorrowableOnly(event.target.checked)
            }
            className="h-4 w-4 accent-[#4033C3]"
          />
          Show only books available to borrow
        </label>

        <p className="mt-3 text-sm text-[#777783]">
          Showing {sortedBooks.length} of {books.length} books
        </p>
      </section>

      {sortedBooks.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-[#DCDCE6] bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-[#252432]">
            No books found
          </h2>

          <p className="mt-2 text-sm text-[#777783]">
            Try another title or subject, or turn off the availability filter.
          </p>
        </div>
      )}
    </main>
  );
}

export default Books;
