
import { BookOpen, CheckCircle2, CircleX } from "lucide-react";

function BookCard({ book }) {
  const availableCopies = book.totalCopies - book.borrowedCopies;

  const coverColors = {
    Programming: "from-[#4033C3] to-[#7770D8]",
    Technology: "from-[#385B50] to-[#789487]",
    English: "from-[#A45135] to-[#E6A17F]",
    Fiction: "from-[#343B54] to-[#7584A5]",
    default: "from-[#65558F] to-[#B1A5D4]",
  };

  const coverColor = coverColors[book.subject] || coverColors.default;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E7E7ED] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${coverColor} p-6`}
      >
        <div className="absolute inset-3 rounded-xl border border-white/25" />
        <div className="relative flex h-full w-full flex-col items-center justify-center text-center text-white">
          <BookOpen size={32} strokeWidth={1.4} />
          <h2 className="mt-4 line-clamp-3 text-xl font-bold italic leading-snug">
            {book.title}
          </h2>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/70">
            Library Collection
          </p>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {book.subject}
        </span>
      </div>

      <div className="p-5">
        <p className="truncate text-sm text-[#777783]">By {book.author}</p>

        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              availableCopies > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {availableCopies > 0 ? (
              <CheckCircle2 size={14} />
            ) : (
              <CircleX size={14} />
            )}
            {availableCopies > 0 ? "Available to borrow" : "Currently unavailable"}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[#E7E7ED] border-t border-[#E7E7ED] pt-4">
          <div className="pr-2">
            <p className="text-xs text-[#777783]">Total</p>
            <p className="mt-1 text-lg font-bold text-[#252432]">
              {book.totalCopies}
            </p>
          </div>

          <div className="px-3">
            <p className="text-xs text-[#777783]">Borrowed</p>
            <p className="mt-1 text-lg font-bold text-[#252432]">
              {book.borrowedCopies}
            </p>
          </div>

          <div className="pl-3">
            <p className="text-xs text-[#777783]">Available</p>
            <p className="mt-1 text-lg font-bold text-[#4033C3]">
              {availableCopies}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
