import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, author, subject, total_copies, borrowed_copies")
        .order("id", { ascending: true });

      if (error) {
        console.error("Unable to load books from Supabase:", error.message);
        return;
      }

      if (isMounted) {
        setBooks(
          data.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            subject: book.subject,
            totalCopies: book.total_copies,
            borrowedCopies: book.borrowed_copies,
          }))
        );
      }
    }

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

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
