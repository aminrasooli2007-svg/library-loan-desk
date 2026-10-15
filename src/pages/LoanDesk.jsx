import { initialBooks } from "../data/books";
function LoanDesk() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#E66B3B]">
          Library Services
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-[#252432]">
          Loan Desk
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777783]">
          Manage book loans, select copies, and keep track of borrowing activity.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#777783]">Available Books</p>
          <h2 className="mt-3 text-3xl font-bold text-[#4033C3]">12</h2>
          <p className="mt-2 text-sm text-[#777783]">
            Copies ready to borrow
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#777783]">Active Loans</p>
          <h2 className="mt-3 text-3xl font-bold text-[#4033C3]">0</h2>
          <p className="mt-2 text-sm text-[#777783]">
            Current sample loans
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#777783]">Returned Loans</p>
          <h2 className="mt-3 text-3xl font-bold text-[#4033C3]">0</h2>
          <p className="mt-2 text-sm text-[#777783]">
            Completed returns
          </p>
        </div>
      </section>

      
        <section className="mt-8 rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-[#252432]">
      Select a Book
    </h2>

    <p className="mt-2 text-sm text-[#777783]">
      Choose a book from the available library collection.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {initialBooks.map((book) => {
      const availableCopies = book.totalCopies - book.borrowedCopies;

      return (
        <div
          key={book.id}
          className="rounded-xl border border-[#E7E7ED] p-5 transition hover:border-[#4033C3]"
        >
          <p className="text-xs font-medium text-[#E66B3B]">
            {book.subject}
          </p>

          <h3 className="mt-2 font-semibold text-[#252432]">
            {book.title}
          </h3>

          <p className="mt-1 text-sm text-[#777783]">
            By {book.author}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[#777783]">
              Available: {availableCopies}
            </p>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                availableCopies > 0
                  ? "bg-[#4033C3]/10 text-[#4033C3]"
                  : "bg-[#E7E7ED] text-[#777783]"
              }`}
            >
              {availableCopies > 0 ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</section>
      
    </main>
  );
}

export default LoanDesk;
