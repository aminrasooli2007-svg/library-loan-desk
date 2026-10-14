import { initialBooks } from "./data/books";
function App() {


  const totalBooks = initialBooks.length

  const borrowedCopies = initialBooks.reduce(
    (total, book) => total + book.borrowedCopies,
    0
  )

  const availableCopies = initialBooks.reduce(
    (total, book) => total + (book.totalCopies - book.borrowedCopies),
    0
  );
  return (
    <div className="min-h-screen bg-[#E7E7ED] text-[#252432]">
      <header className="border-b border-[#D5D5E0] bg-white">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight text-[#4033C3]">
            Library Loan Desk
          </a>

          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <a href="/" className="text-[#4033C3]">
              Home
            </a>
            <a href="/books" className="transition-colors hover:text-[#4033C3]">
              Books
            </a>
            <a href="/loans" className="transition-colors hover:text-[#4033C3]">
              Loan Desk
            </a>
            <a href="/manage-books" className="transition-colors hover:text-[#4033C3]">
              Manage Books
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <section className="mb-12">
          <p className="mb-3 text-sm font-medium text-[#E66B3B]">
            Your Library, Organized
          </p>

          <h1 className="mb-4 text-3xl font-bold italic tracking-tight sm:text-4xl">
            Welcome to Library Loan Desk
          </h1>

          <p className="max-w-2xl text-base leading-7 text-[#777783]">
            Manage your book collection, track available copies, and organize
            library loans in one simple place.
          </p>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Library Overview</h2>
            <p className="mt-1 text-sm text-[#777783]">
              A quick look at your library inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
              <p className="mb-4 text-sm font-medium text-[#777783]">
                Total Books
              </p>
              <p className="text-3xl font-bold tracking-tight text-[#4033C3]">
                {totalBooks}
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
              <p className="mb-4 text-sm font-medium text-[#777783]">
                Borrowed Copies
              </p>
              <p className="text-3xl font-bold tracking-tight text-[#4033C3]">
                {borrowedCopies}
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
              <p className="mb-4 text-sm font-medium text-[#777783]">
                Available Copies
              </p>
              <p className="text-3xl font-bold tracking-tight text-[#4033C3]">
                {availableCopies}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
