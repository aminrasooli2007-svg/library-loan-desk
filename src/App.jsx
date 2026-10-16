
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Home from "./pages/Home";
import Books from "./pages/Books";
import LoanDesk from "./pages/LoanDesk";
import ManageBooks from "./pages/ManageBooks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BooksProvider } from "./context/BooksContext";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#4033C3]/10 text-[#4033C3]"
      : "text-[#777783] hover:bg-[#E7E7ED] hover:text-[#4033C3]"
  }`;

function App() {
  return (
    <BooksProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-[#E7E7ED] text-[#252432]">
        <header className="border-b border-[#D5D5E0] bg-white">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-5">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-[#4033C3] sm:text-2xl"
            >
              Library Loan Desk
            </NavLink>

            <div className="flex flex-wrap items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/books" className={navLinkClass}>
                Books
              </NavLink>
              <NavLink to="/loans" className={navLinkClass}>
                Loan Desk
              </NavLink>
              <NavLink to="/manage-books" className={navLinkClass}>
                Manage Books
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/loans" element={<LoanDesk />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
    </BooksProvider>
  );
}

export default App;
