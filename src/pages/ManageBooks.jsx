import { useState } from "react";
import { BookPlus, BookOpen, Plus, Search } from "lucide-react";
import { initialBooks } from "../data/books";

function ManageBooks() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    subject: "",
    totalCopies: "",
  });

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();
    const author = formData.author.trim();
    const subject = formData.subject.trim();
    const totalCopies = Number(formData.totalCopies);

    if (!title || !author || !subject || !formData.totalCopies) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      setMessage("Total copies must be a whole number greater than zero.");
      return;
    }

    const duplicateBook = books.some(
      (book) =>
        book.title.toLowerCase() === title.toLowerCase() &&
        book.author.toLowerCase() === author.toLowerCase()
    );

    if (duplicateBook) {
      setMessage("This book already exists in the inventory.");
      return;
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      subject,
      totalCopies,
      borrowedCopies: 0,
    };

    setBooks((currentBooks) => [...currentBooks, newBook]);

    setFormData({
      title: "",
      author: "",
      subject: "",
      totalCopies: "",
    });

    setMessage("Book added successfully!");
  }

  return (
    <main className="min-h-screen bg-[#F8F8FC] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#E66B3B]">
            Library Administration
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#252432] sm:text-4xl">
            Manage Books
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#777783] sm:text-base">
            Add books to your library inventory and keep your collection organized.
          </p>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
              <BookOpen size={24} />
            </div>

            <div>
              <p className="text-sm text-[#777783]">Total Book Titles</p>
              <h2 className="mt-1 text-2xl font-bold text-[#252432]">
                {books.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E66B3B]/10 text-[#E66B3B]">
              <BookPlus size={24} />
            </div>

            <div>
              <p className="text-sm text-[#777783]">Total Copies</p>
              <h2 className="mt-1 text-2xl font-bold text-[#252432]">
                {books.reduce((total, book) => total + book.totalCopies, 0)}
              </h2>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
                <Plus size={23} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#252432]">
                  Add a New Book
                </h2>
                <p className="mt-1 text-sm text-[#777783]">
                  Enter the book details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Book Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  maxLength={120}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Author
                </label>

                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  maxLength={100}
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={60}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Programming"
                  className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="totalCopies"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Total Copies
                </label>

                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={formData.totalCopies}
                  onChange={handleChange}
                  placeholder="Enter number of copies"
                  className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none transition focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              {message && (
                <p
                  role="status"
                  className={`rounded-xl px-4 py-3 text-sm ${
                    message === "Book added successfully!"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3328A0] focus:outline-none focus:ring-2 focus:ring-[#4033C3]/30 focus:ring-offset-2"
              >
                <Plus size={18} />
                Add Book
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm lg:col-span-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#252432]">
                  Book Inventory
                </h2>
                <p className="mt-1 text-sm text-[#777783]">
                  {filteredBooks.length} books found
                </p>
              </div>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777783]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search books..."
                  aria-label="Search books by title or author"
                  className="w-full rounded-xl border border-[#DCDCE6] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#4033C3] sm:w-56"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {filteredBooks.length === 0 ? (
                <div className="rounded-xl bg-[#F8F8FC] px-4 py-10 text-center">
                  <BookOpen
                    size={28}
                    className="mx-auto text-[#777783]"
                  />
                  <p className="mt-3 text-sm text-[#777783]">
                    No books found.
                  </p>
                </div>
              ) : (
                filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="rounded-xl border border-[#E7E7ED] p-4 transition hover:border-[#4033C3]/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[#252432]">
                          {book.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#777783]">
                          By {book.author}
                        </p>

                        <span className="mt-3 inline-block rounded-full bg-[#4033C3]/10 px-3 py-1 text-xs font-medium text-[#4033C3]">
                          {book.subject}
                        </span>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-[#252432]">
                          {book.totalCopies} copies
                        </p>

                        <p className="mt-1 text-xs text-[#777783]">
                          {book.totalCopies - book.borrowedCopies} available
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ManageBooks;
