
import { useState } from "react";
import { initialBooks } from "../data/books";

function LoanDesk() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [activeLoans, setActiveLoans] = useState([]);
  const [message, setMessage] = useState("");

  const availableCopies = books.reduce(
    (total, book) => total + book.totalCopies - book.borrowedCopies,
    0
  );

  function addBook(book) {
    setSelectedBooks((currentBooks) => [
      ...currentBooks,
      { ...book, quantity: 1 },
    ]);
    setMessage("");
  }

  function increaseQuantity(bookId) {
    setSelectedBooks((currentBooks) =>
      currentBooks.map((book) => {
        if (book.id === bookId) {
          const currentBook = books.find((item) => item.id === bookId);
          const available = currentBook.totalCopies - currentBook.borrowedCopies;

          if (book.quantity < available) {
            return { ...book, quantity: book.quantity + 1 };
          }
        }

        return book;
      })
    );
  }

  function decreaseQuantity(bookId) {
    setSelectedBooks((currentBooks) =>
      currentBooks
        .map((book) =>
          book.id === bookId
            ? { ...book, quantity: book.quantity - 1 }
            : book
        )
        .filter((book) => book.quantity > 0)
    );
  }

  function confirmLoan() {
    if (!borrowerName.trim() || !dueDate || selectedBooks.length === 0) {
      setMessage("Please enter the borrower name, due date, and select a book.");
      return;
    }

    const unavailableBook = selectedBooks.some((selectedBook) => {
      const currentBook = books.find((book) => book.id === selectedBook.id);
      return (
        !currentBook ||
        selectedBook.quantity >
          currentBook.totalCopies - currentBook.borrowedCopies
      );
    });

    if (unavailableBook) {
      setMessage("Not enough copies are available for one or more books.");
      return;
    }

    const newLoan = {
      id: Date.now(),
      borrowerName: borrowerName.trim(),
      dueDate,
      books: selectedBooks.map((book) => ({
        id: book.id,
        title: book.title,
        quantity: book.quantity,
      })),
      returned: false,
    };

    setBooks((currentBooks) =>
      currentBooks.map((book) => {
        const selectedBook = selectedBooks.find(
          (item) => item.id === book.id
        );

        if (selectedBook) {
          return {
            ...book,
            borrowedCopies: book.borrowedCopies + selectedBook.quantity,
          };
        }

        return book;
      })
    );

    setActiveLoans((currentLoans) => [...currentLoans, newLoan]);
    setSelectedBooks([]);
    setBorrowerName("");
    setDueDate("");
    setMessage("Loan confirmed successfully!");
  }

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
          <h2 className="mt-3 text-3xl font-bold text-[#4033C3]">
            {availableCopies}
          </h2>
          <p className="mt-2 text-sm text-[#777783]">
            Copies ready to borrow
          </p>
        </div>

        <div className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#777783]">Active Loans</p>
          <h2 className="mt-3 text-3xl font-bold text-[#4033C3]">
            {activeLoans.length}
          </h2>
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
          {books.map((book) => {
            const available = book.totalCopies - book.borrowedCopies;
            const isSelected = selectedBooks.some(
              (item) => item.id === book.id
            );

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
                    Available: {available}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      available > 0
                        ? "bg-[#4033C3]/10 text-[#4033C3]"
                        : "bg-[#E7E7ED] text-[#777783]"
                    }`}
                  >
                    {available > 0 ? "Available" : "Unavailable"}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={available === 0 || isSelected}
                  onClick={() => addBook(book)}
                  className="mt-4 w-full rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3328A0] disabled:cursor-not-allowed disabled:bg-[#E7E7ED] disabled:text-[#777783]"
                >
                  {isSelected ? "Added to Loan" : "Add to Loan"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-t border-[#E7E7ED] pt-6">
          <h2 className="text-lg font-semibold text-[#252432]">
            Selected Books ({selectedBooks.length})
          </h2>

          {selectedBooks.length === 0 ? (
            <p className="mt-3 text-sm text-[#777783]">
              No books selected yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {selectedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#E7E7ED] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-[#252432]">{book.title}</p>
                    <p className="mt-1 text-sm text-[#777783]">{book.author}</p>
                    <p className="mt-2 text-sm text-[#777783]">
                      Quantity: {book.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(book.id)}
                      className="h-10 w-10 rounded-lg border border-[#DCDCE6] font-semibold text-[#4033C3] hover:bg-[#4033C3]/10"
                      aria-label={`Decrease quantity of ${book.title}`}
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {book.quantity}
                    </span>

                    <button
                      type="button"
                      disabled={
                        book.quantity >=
                        books.find((item) => item.id === book.id).totalCopies -
                          books.find((item) => item.id === book.id).borrowedCopies
                      }
                      onClick={() => increaseQuantity(book.id)}
                      className="h-10 w-10 rounded-lg border border-[#DCDCE6] font-semibold text-[#4033C3] hover:bg-[#4033C3]/10 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Increase quantity of ${book.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-[#E7E7ED] pt-6">
          <h2 className="text-lg font-semibold text-[#252432]">
            Borrower Information
          </h2>

          <p className="mt-2 text-sm text-[#777783]">
            Enter the borrower's information before confirming the loan.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="borrowerName"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                Borrower Name
              </label>

              <input
                id="borrowerName"
                type="text"
                value={borrowerName}
                onChange={(event) => setBorrowerName(event.target.value)}
                placeholder="Enter borrower name"
                className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-medium text-[#252432]"
              >
                Due Date
              </label>

              <input
                id="dueDate"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="w-full rounded-xl border border-[#DCDCE6] px-4 py-3 text-sm outline-none focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
              />
            </div>
          </div>

          {message && (
            <p
              role="status"
              className="mt-4 text-sm font-medium text-[#4033C3]"
            >
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
            className="mt-6 w-full rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3328A0] disabled:cursor-not-allowed disabled:bg-[#E7E7ED] disabled:text-[#777783]"
          >
            Confirm Loan
          </button>
        </div>

        {activeLoans.length > 0 && (
          <div className="mt-8 border-t border-[#E7E7ED] pt-6">
            <h2 className="text-lg font-semibold text-[#252432]">
              Recent Loans
            </h2>

            <div className="mt-4 space-y-3">
              {activeLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="rounded-xl border border-[#E7E7ED] p-4"
                >
                  <p className="font-semibold text-[#252432]">
                    {loan.borrowerName}
                  </p>

                  <p className="mt-1 text-sm text-[#777783]">
                    Due date: {loan.dueDate}
                  </p>

                  <ul className="mt-2 list-inside list-disc text-sm text-[#777783]">
                    {loan.books.map((book) => (
                      <li key={book.id}>
                        {book.title} × {book.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default LoanDesk;
