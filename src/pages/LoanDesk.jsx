
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
        <h2 className="text-lg font-semibold text-[#252432]">
          Create a New Loan
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#777783]">
          Your selected books and loan details will appear here.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-[#D5D5E0] px-5 py-10 text-center">
          <p className="text-sm text-[#777783]">
            No books selected yet.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoanDesk;
