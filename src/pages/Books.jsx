
import { useState } from "react";
import { initialBooks } from "../data/books";
import BookCard from "../components/BookCard";

function Books() {
    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");

    const filteredBooks = initialBooks.filter((book) => {
        const query = search.toLowerCase();

        return (
            book.title.toLowerCase().includes(query) &&
            (selectedSubject === "All" || book.subject === selectedSubject)
        );
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


            <div className="mb-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_220px] sm:items-end">
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
                            placeholder="Search by title..."
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
                            <option value="Technology">Technology</option>
                            <option value="Literature">Literature</option>
                            <option value="Languages">Languages</option>
                        </select>
                    </div>
                </div>

                <p className="mt-3 text-sm text-[#777783]">
                    Showing {filteredBooks.length} of {initialBooks.length} books
                </p>
            </div>


            {filteredBooks.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </section>
            ) : (
                <div className="rounded-2xl border border-[#DCDCE6] bg-white px-6 py-12 text-center">
                    <h2 className="text-lg font-semibold text-[#252432]">
                        No books found
                    </h2>
                    <p className="mt-2 text-sm text-[#777783]">
                        Try another title or author name.
                    </p>
                </div>
            )}
        </main>
    );
}

export default Books;
