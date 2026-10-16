
import { createContext, useContext, useState } from "react";
import { initialBooks } from "../data/books";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used inside BooksProvider");
  }

  return context;
}
