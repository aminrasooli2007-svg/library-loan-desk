
function BookCard({ book }) {
  const availableCopies = book.totalCopies - book.borrowedCopies;

  return (
    <article className="rounded-2xl border border-[#DCDCE6] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="rounded-full bg-[#4033C3]/10 px-3 py-1 text-xs font-medium text-[#4033C3]">
          {book.subject}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            availableCopies > 0
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {availableCopies > 0 ? "Available" : "Unavailable"}
        </span>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-[#252432]">
        {book.title}
      </h2>

      <p className="mb-5 text-sm text-[#777783]">
        By {book.author}
      </p>

      <div className="grid grid-cols-3 gap-2 border-t border-[#E7E7ED] pt-4">
        <div>
          <p className="text-xs text-[#777783]">Total</p>
          <p className="mt-1 font-semibold">{book.totalCopies}</p>
        </div>

        <div>
          <p className="text-xs text-[#777783]">Borrowed</p>
          <p className="mt-1 font-semibold">{book.borrowedCopies}</p>
        </div>

        <div>
          <p className="text-xs text-[#777783]">Available</p>
          <p className="mt-1 font-semibold text-[#4033C3]">
            {availableCopies}
          </p>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
