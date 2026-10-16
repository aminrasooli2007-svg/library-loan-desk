
import { Link } from "react-router";
import {
  BookOpen,
  LibraryBig,
  BookCheck,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useBooks } from "../context/BooksContext";

function Home() {
  const { books } = useBooks();

  const totalBooks = books.length;

  const totalCopies = books.reduce(
    (total, book) => total + book.totalCopies,
    0
  );

  const borrowedCopies = books.reduce(
    (total, book) => total + book.borrowedCopies,
    0
  );

  const availableCopies = books.reduce(
    (total, book) => total + book.totalCopies - book.borrowedCopies,
    0
  );

  const featuredBooks = books
    .filter((book) => book.totalCopies - book.borrowedCopies > 0)
    .slice(0, 4);

  const stats = [
    {
      label: "Total Titles",
      value: totalBooks,
      icon: LibraryBig,
      description: "Different books in your library",
    },
    {
      label: "Available Copies",
      value: availableCopies,
      icon: BookOpen,
      description: "Ready to be borrowed",
    },
    {
      label: "Borrowed Copies",
      value: borrowedCopies,
      icon: BookCheck,
      description: "Currently on loan",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#252432] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#4033C3]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-[#E66B3B]/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/80">
                <Sparkles size={15} className="text-[#F0A17F]" />
                Your Library, Organized
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Every book has a story.
                <span className="mt-2 block text-[#B9B1FF]">
                  Find yours here.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                Discover your collection, keep track of borrowed books, and
                make every library visit a little easier.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3 font-semibold text-white transition hover:bg-[#5144D8]"
                >
                  Explore Books
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/loans"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Open Loan Desk
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -left-4 top-10 h-40 w-32 rotate-[-12deg] rounded-2xl bg-[#E66B3B]/80 shadow-xl" />
              <div className="absolute -right-3 top-5 h-48 w-36 rotate-[10deg] rounded-2xl bg-[#7C70D9] shadow-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#4033C3] p-7 shadow-2xl">
                <div className="flex min-h-64 flex-col justify-between rounded-xl border border-white/20 p-5">
                  <BookOpen size={38} strokeWidth={1.3} />
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      The joy of reading
                    </p>
                    <h2 className="mt-3 text-3xl font-bold italic leading-tight">
                      A world
                      <br />
                      between
                      <br />
                      the pages.
                    </h2>
                  </div>
                  <p className="text-sm text-white/60">LibraryDesk Collection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#4033C3]">
                At a glance
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#252432]">
                Your library overview
              </h2>
            </div>

            <p className="text-sm text-[#777783]">
              {totalCopies} physical copies in total
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map(({ label, value, icon: Icon, description }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#777783]">
                      {label}
                    </p>
                    <p className="mt-3 text-4xl font-bold tracking-tight text-[#252432]">
                      {value}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4033C3]/10 text-[#4033C3]">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                </div>

                <p className="mt-5 border-t border-[#E7E7ED] pt-4 text-sm text-[#777783]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#4033C3]">
                Pick your next read
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#252432]">
                Available books
              </h2>
              <p className="mt-2 text-sm text-[#777783]">
                Books with copies currently available in your collection.
              </p>
            </div>

            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#4033C3] transition hover:bg-[#4033C3]/10"
            >
              View all books
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredBooks.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks.map((book, index) => {
                const colors = [
                  "from-[#4033C3] to-[#7770D8]",
                  "from-[#385B50] to-[#789487]",
                  "from-[#A45135] to-[#E6A17F]",
                  "from-[#343B54] to-[#7584A5]",
                ];

                return (
                  <article
                    key={book.id ?? book.title}
                    className="group overflow-hidden rounded-2xl border border-[#E7E7ED] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${colors[index % colors.length]} p-5`}
                    >
                      <div className="absolute inset-3 rounded-lg border border-white/25" />
                      <div className="relative flex h-full w-full flex-col items-center justify-center text-center text-white">
                        <BookOpen size={30} strokeWidth={1.3} />
                        <h3 className="mt-4 line-clamp-3 text-xl font-bold italic leading-snug">
                          {book.title}
                        </h3>
                        <p className="mt-3 text-xs uppercase tracking-widest text-white/70">
                          Library Collection
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="truncate text-sm text-[#777783]">
                        {book.author}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#4033C3]/10 px-3 py-1 text-xs font-medium text-[#4033C3]">
                          {book.totalCopies - book.borrowedCopies} available
                        </span>
                        <Link
                          to="/books"
                          aria-label={`View ${book.title} in the books page`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7E7ED] text-[#4033C3] transition group-hover:border-[#4033C3] group-hover:bg-[#4033C3] group-hover:text-white"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D5D5E0] bg-white px-6 py-12 text-center">
              <BookOpen className="mx-auto text-[#777783]" size={32} />
              <h3 className="mt-4 font-semibold text-[#252432]">
                No books available right now
              </h3>
              <p className="mt-2 text-sm text-[#777783]">
                Visit the book collection to manage your inventory.
              </p>
              <Link
                to="/manage-books"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4033C3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
              >
                Manage Books
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-[#E7E7ED] bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-medium text-[#E66B3B]">
              Keep your collection up to date
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#252432]">
              Need to add or update a book?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#777783]">
              Manage your titles and copy counts from one simple workspace.
            </p>
          </div>

          <Link
            to="/manage-books"
            className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#252432] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4033C3] sm:mt-0"
          >
            Manage Collection
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Home;
