import { useState } from "react";
import { useBooks } from "../context/BooksContext";
import { useLanguage } from "../i18n/LanguageContext";
import {
  BookPlus,
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  LibraryBig,
  X,
  CheckCircle2,
  CircleAlert,
  Copy,
} from "lucide-react";

function ManageBooks() {
  const { books, setBooks } = useBooks();
  const { language } = useLanguage();
  const isPersian = language === "fa";

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    subject: "",
    totalCopies: "",
  });

  const translations = {
    en: {
      administration: "LIBRARY ADMINISTRATION",
      title: "Manage Books",
      description:
        "Organize your collection, update book details, and keep your library inventory under control.",
      bookTitles: "Book Titles",
      differentTitles: "Different titles in your collection",
      totalCopies: "Total Copies",
      includingBorrowed: "Including borrowed copies",
      availableCopies: "Available Copies",
      readyToBorrow: "Ready to be borrowed",
      editBook: "Edit Book",
      addNewBook: "Add a New Book",
      updateDetails: "Update the selected book details.",
      expandCollection: "Fill in the details to expand your collection.",
      bookTitle: "Book Title",
      author: "Author",
      subject: "Subject",
      titlePlaceholder: "e.g. JavaScript for Beginners",
      authorPlaceholder: "Enter author name",
      subjectPlaceholder: "e.g. Programming",
      copiesPlaceholder: "Enter number of copies",
      saveChanges: "Save Changes",
      addBook: "Add Book",
      cancelEditing: "Cancel Editing",
      inventory: "Book Inventory",
      book: "book",
      books: "books",
      found: "found",
      searchPlaceholder: "Search title, author, subject...",
      searchLabel: "Search books by title, author, or subject",
      noBooks: "No books found",
      tryAnotherSearch: "Try another search or add a new book.",
      by: "By",
      copies: "copies",
      available: "available",
      edit: "Edit",
      delete: "Delete",
      fillFields: "Please fill in all fields.",
      validCopies: "Total copies must be a whole number greater than zero.",
      duplicate: "This book already exists in the inventory.",
      bookNotFound: "Book not found.",
      fewerThanBorrowed: "Total copies cannot be less than borrowed copies.",
      added: "Book added successfully!",
      updated: "Book updated successfully.",
      deleted: "Book deleted successfully.",
      cannotDelete: "Cannot delete a book that has borrowed copies.",
      confirmDelete: (title) => `Are you sure you want to delete "${title}"?`,
    },
    fa: {
      administration: "مدیریت کتابخانه",
      title: "مدیریت کتاب‌ها",
      description:
        "مجموعهٔ کتاب‌های خود را سازمان‌دهی کنید، مشخصات کتاب‌ها را تغییر دهید و موجودی کتابخانه را مدیریت کنید.",
      bookTitles: "تعداد عنوان‌های کتاب",
      differentTitles: "تعداد عنوان‌های متفاوت در مجموعه",
      totalCopies: "مجموع نسخه‌ها",
      includingBorrowed: "شامل نسخه‌های امانت‌گرفته‌شده",
      availableCopies: "نسخه‌های موجود",
      readyToBorrow: "آماده برای امانت گرفتن",
      editBook: "ویرایش کتاب",
      addNewBook: "افزودن کتاب جدید",
      updateDetails: "مشخصات کتاب انتخاب‌شده را تغییر دهید.",
      expandCollection: "برای گسترش مجموعه، مشخصات کتاب را وارد کنید.",
      bookTitle: "عنوان کتاب",
      author: "نویسنده",
      subject: "موضوع",
      titlePlaceholder: "مثلاً: جاوااسکریپت برای مبتدیان",
      authorPlaceholder: "نام نویسنده را وارد کنید",
      subjectPlaceholder: "مثلاً: برنامه‌نویسی",
      copiesPlaceholder: "تعداد نسخه‌ها را وارد کنید",
      saveChanges: "ذخیرهٔ تغییرات",
      addBook: "افزودن کتاب",
      cancelEditing: "لغو ویرایش",
      inventory: "فهرست کتاب‌ها",
      book: "کتاب",
      books: "کتاب",
      found: "یافت شد",
      searchPlaceholder: "جست‌وجوی عنوان، نویسنده یا موضوع...",
      searchLabel: "جست‌وجوی کتاب بر اساس عنوان، نویسنده یا موضوع",
      noBooks: "کتابی پیدا نشد",
      tryAnotherSearch: "عبارت دیگری جست‌وجو کنید یا کتاب جدیدی اضافه کنید.",
      by: "نویسنده:",
      copies: "نسخه",
      available: "نسخه موجود",
      edit: "ویرایش",
      delete: "حذف",
      fillFields: "لطفاً تمام فیلدها را تکمیل کنید.",
      validCopies: "تعداد نسخه‌ها باید عدد صحیح بزرگ‌تر از صفر باشد.",
      duplicate: "این کتاب از قبل در فهرست موجودی وجود دارد.",
      bookNotFound: "کتاب پیدا نشد.",
      fewerThanBorrowed:
        "تعداد کل نسخه‌ها نمی‌تواند کمتر از نسخه‌های امانت‌داده‌شده باشد.",
      added: "کتاب با موفقیت اضافه شد!",
      updated: "مشخصات کتاب با موفقیت به‌روزرسانی شد.",
      deleted: "کتاب با موفقیت حذف شد.",
      cannotDelete: "کتابی که نسخهٔ امانت‌داده‌شده دارد، قابل حذف نیست.",
      confirmDelete: (title) => `آیا مطمئن هستید که می‌خواهید کتاب «${title}» را حذف کنید؟`,
    },
  };

  const t = translations[isPersian ? "fa" : "en"];

  const messageTranslations = {
    "Please fill in all fields.": t.fillFields,
    "Total copies must be a whole number greater than zero.": t.validCopies,
    "This book already exists in the inventory.": t.duplicate,
    "Book not found.": t.bookNotFound,
    "Total copies cannot be less than borrowed copies.": t.fewerThanBorrowed,
    "Book added successfully!": t.added,
    "Book updated successfully.": t.updated,
    "Book deleted successfully.": t.deleted,
    "Cannot delete a book that has borrowed copies.": t.cannotDelete,
  };

  const isSuccess =
    message === "Book added successfully!" ||
    message === "Book updated successfully." ||
    message === "Book deleted successfully.";

  const filteredBooks = books.filter((book) => {
    const bookDetails = `${book.title} ${book.author} ${book.subject}`;
    return bookDetails.toLowerCase().includes(search.toLowerCase().trim());
  });

  const totalCopies = books.reduce((total, book) => {
    return total + book.totalCopies;
  }, 0);

  const availableCopies = books.reduce((total, book) => {
    return total + book.totalCopies - book.borrowedCopies;
  }, 0);

  function handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });

    setMessage("");
  }

  function resetForm() {
    setFormData({
      title: "",
      author: "",
      subject: "",
      totalCopies: "",
    });

    setEditingBookId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();
    const author = formData.author.trim();
    const subject = formData.subject.trim();
    const totalCopiesValue = Number(formData.totalCopies);

    if (!title || !author || !subject || !formData.totalCopies) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!Number.isInteger(totalCopiesValue) || totalCopiesValue < 1) {
      setMessage("Total copies must be a whole number greater than zero.");
      return;
    }

    const duplicateBook = books.find((book) => {
      const sameTitle = book.title.toLowerCase() === title.toLowerCase();
      const sameAuthor = book.author.toLowerCase() === author.toLowerCase();
      const isDifferentBook = book.id !== editingBookId;

      return sameTitle && sameAuthor && isDifferentBook;
    });

    if (duplicateBook) {
      setMessage("This book already exists in the inventory.");
      return;
    }

    if (editingBookId !== null) {
      const editingBook = books.find((book) => book.id === editingBookId);

      if (!editingBook) {
        setMessage("Book not found.");
        return;
      }

      if (totalCopiesValue < editingBook.borrowedCopies) {
        setMessage("Total copies cannot be less than borrowed copies.");
        return;
      }

      const updatedBooks = books.map((book) => {
        if (book.id !== editingBookId) {
          return book;
        }

        return {
          ...book,
          title,
          author,
          subject,
          totalCopies: totalCopiesValue,
        };
      });

      setBooks(updatedBooks);
      setMessage("Book updated successfully.");
    } else {
      const newBook = {
        id: Date.now(),
        title,
        author,
        subject,
        totalCopies: totalCopiesValue,
        borrowedCopies: 0,
      };

      setBooks([...books, newBook]);
      setMessage("Book added successfully!");
    }

    resetForm();
  }

  function handleEdit(book) {
    setEditingBookId(book.id);

    setFormData({
      title: book.title,
      author: book.author,
      subject: book.subject,
      totalCopies: String(book.totalCopies),
    });

    setMessage("");
  }

  function handleDelete(book) {
    if (book.borrowedCopies > 0) {
      setMessage("Cannot delete a book that has borrowed copies.");
      return;
    }

    const confirmed = window.confirm(t.confirmDelete(book.title));

    if (!confirmed) {
      return;
    }

    const remainingBooks = books.filter((item) => item.id !== book.id);
    setBooks(remainingBooks);

    if (editingBookId === book.id) {
      resetForm();
    }

    setMessage("Book deleted successfully.");
  }

  return (
    <main
      dir={isPersian ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8F7F4] px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#252432] p-7 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#4033C3]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-[#E66B3B]/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#C7C2FF]">
                <LibraryBig size={17} />
                <span>{t.administration}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t.title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                {t.description}
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-[#D8D4FF]">
              <BookOpen size={42} strokeWidth={1.4} />
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-[#777783]">
                {t.bookTitles}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
                <BookOpen size={21} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252432]">
              {books.length}
            </p>
            <p className="mt-1 text-xs text-[#777783]">
              {t.differentTitles}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-[#777783]">
                {t.totalCopies}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E66B3B]/10 text-[#C4552C]">
                <Copy size={21} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252432]">
              {totalCopies}
            </p>
            <p className="mt-1 text-xs text-[#777783]">
              {t.includingBorrowed}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-[#777783]">
                {t.availableCopies}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <BookPlus size={21} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252432]">
              {availableCopies}
            </p>
            <p className="mt-1 text-xs text-[#777783]">
              {t.readyToBorrow}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
                {editingBookId !== null ? (
                  <Pencil size={22} />
                ) : (
                  <Plus size={24} />
                )}
              </span>

              <div>
                <h2 className="text-lg font-bold text-[#252432]">
                  {editingBookId !== null ? t.editBook : t.addNewBook}
                </h2>
                <p className="mt-1 text-sm text-[#777783]">
                  {editingBookId !== null
                    ? t.updateDetails
                    : t.expandCollection}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-[#252432]"
                >
                  {t.bookTitle}
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  maxLength={120}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={t.titlePlaceholder}
                  className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-semibold text-[#252432]"
                >
                  {t.author}
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  maxLength={100}
                  value={formData.author}
                  onChange={handleChange}
                  placeholder={t.authorPlaceholder}
                  className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-[#252432]"
                >
                  {t.subject}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={60}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="totalCopies"
                  className="mb-2 block text-sm font-semibold text-[#252432]"
                >
                  {t.totalCopies}
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
                  placeholder={t.copiesPlaceholder}
                  className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                />
              </div>

              {message && (
                <div
                  role="status"
                  className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                    isSuccess
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isSuccess ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <CircleAlert size={18} className="mt-0.5 shrink-0" />
                  )}
                  <span>{messageTranslations[message] || message}</span>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3328A0] focus:outline-none focus:ring-4 focus:ring-[#4033C3]/20"
              >
                {editingBookId !== null ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={19} />
                )}
                {editingBookId !== null ? t.saveChanges : t.addBook}
              </button>

              {editingBookId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMessage("");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCDCE6] px-5 py-3 text-sm font-semibold text-[#777783] transition hover:bg-[#F8F7F4] hover:text-[#252432]"
                >
                  <X size={17} />
                  {t.cancelEditing}
                </button>
              )}
            </form>
          </div>

          <div className="min-w-0 rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-7 lg:col-span-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#252432]">
                  {t.inventory}
                </h2>
                <p className="mt-1 text-sm text-[#777783]">
                  {filteredBooks.length}{" "}
                  {isPersian
                    ? t.books
                    : filteredBooks.length === 1
                      ? t.book
                      : t.books}{" "}
                  {t.found}
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={18}
                  className={`absolute top-1/2 -translate-y-1/2 text-[#777783] ${
                    isPersian ? "right-3.5" : "left-3.5"
                  }`}
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  aria-label={t.searchLabel}
                  className={`w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] py-3 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10 ${
                    isPersian ? "pl-4 pr-10" : "pl-10 pr-4"
                  }`}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {filteredBooks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#DCDCE6] bg-[#FCFBF9] px-4 py-12 text-center">
                  <BookOpen size={32} className="mx-auto text-[#A2A1AB]" />
                  <p className="mt-3 font-semibold text-[#252432]">
                    {t.noBooks}
                  </p>
                  <p className="mt-1 text-sm text-[#777783]">
                    {t.tryAnotherSearch}
                  </p>
                </div>
              ) : (
                filteredBooks.map((book) => {
                  const available = book.totalCopies - book.borrowedCopies;

                  return (
                    <article
                      key={book.id}
                      className="rounded-2xl border border-[#E7E7ED] bg-white p-4 transition hover:border-[#4033C3]/30 hover:shadow-sm sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#4033C3] to-[#7167DB] text-white shadow-sm">
                          <BookOpen size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words font-semibold text-[#252432]">
                            {book.title}
                          </h3>
                          <p className="mt-1 break-words text-sm text-[#777783]">
                            {t.by} {book.author}
                          </p>
                          <span className="mt-3 inline-flex rounded-full bg-[#4033C3]/10 px-3 py-1 text-xs font-semibold text-[#4033C3]">
                            {book.subject}
                          </span>
                        </div>

                        <div
                          className={`shrink-0 ${
                            isPersian ? "text-left" : "text-right"
                          }`}
                        >
                          <p className="text-sm font-bold text-[#252432]">
                            {book.totalCopies} {t.copies}
                          </p>
                          <p
                            className={`mt-1 text-xs font-medium ${
                              available > 0
                                ? "text-emerald-700"
                                : "text-red-600"
                            }`}
                          >
                            {available} {t.available}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2 border-t border-[#E7E7ED] pt-4">
                        <button
                          type="button"
                          onClick={() => handleEdit(book)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#DCDCE6] px-3 py-2.5 text-sm font-semibold text-[#4033C3] transition hover:border-[#4033C3]/40 hover:bg-[#4033C3]/5"
                        >
                          <Pencil size={15} />
                          {t.edit}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(book)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F0DADA] px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          {t.delete}
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ManageBooks;