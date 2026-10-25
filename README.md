# 📚 LibraryDesk — Library Management System

A modern library management web application built with React and Supabase. LibraryDesk helps manage books, track inventory, and organize the book borrowing and returning process through a clean and user-friendly interface.

## 📖 Overview

LibraryDesk is designed to simplify everyday library operations by providing tools for managing book records, monitoring availability, and handling loans.

The application combines a React-based frontend with Supabase for database integration and authentication. It also supports a bilingual interface in English and Persian.

## ✨ Features

### 📚 Book Management
- View books in an organized catalog.
- Search for books by title or author, where supported by the current implementation.
- Filter books by subject.
- View total, borrowed, and available copies.
- Add new books to the catalog.
- Edit existing book information.
- Delete books when deletion is permitted and no active borrowing restriction applies.

### 🔄 Borrowing and Returning
- Select books for borrowing.
- Adjust the quantity of selected books.
- Check available copies before borrowing.
- Record loan information and due dates.
- Manage book returns.
- Track loan-related information.

### 📊 Inventory Management
- Monitor book availability.
- Distinguish total copies from borrowed copies.
- Help prevent borrowing quantities that exceed available inventory.

### 🔐 Authentication and Security
- Use Supabase Auth for authentication.
- Apply PostgreSQL Row Level Security (RLS) policies to protect database operations.
- Restrict book creation, editing, and deletion to authorized administrators.
- Keep database credentials and sensitive configuration out of the public repository.

### 🌐 User Interface
- English and Persian language support.
- Responsive, component-based React interface.
- Dedicated pages for the home screen, book catalog, loan desk, book management, about information, and contact information.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| Vite | Development server and build tooling |
| Tailwind CSS | Styling and layout |
| React Router | Client-side navigation |
| Supabase | Authentication and database integration |
| PostgreSQL | Relational database |
| Git | Version control |
| GitHub | Source code hosting |

## 🗂️ Database Architecture

The database is organized around four main tables:

| Table | Description |
|---|---|
| `books` | Stores book information and inventory counts |
| `members` | Stores library member information |
| `loans` | Stores general loan records |
| `loan_items` | Connects loan records with the books included in each loan |

The `loan_items` table acts as an associative table between loans and books, allowing a loan to contain multiple book entries.

The exact columns and foreign-key relationships depend on the database schema configured in Supabase.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- A Supabase account and project

### 1. Clone the repository

```bash
git clone https://github.com/aminrasooli2007-svg/library-loan-desk.git
```

### 2. Navigate to the project directory

```bash
cd library-loan-desk
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Supabase

Create a `.env` file in the project root and add the public project configuration required by your application.

For example, if your Supabase client uses Vite environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Use the exact variable names expected by your `src/lib/supabase.js` file. Newer Supabase projects may use a publishable key instead of the legacy `anon` key.

Never place a Supabase service-role key, database password, or administrator password in frontend code or a public repository.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal to access the application.

### 6. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔒 Security Notes

LibraryDesk uses Supabase Row Level Security (RLS) to control access to database operations.

The `books` table has been configured to allow public reading while restricting administrative changes through an administrator-checking function.

For a secure deployment:

- Keep RLS enabled on tables exposed through the Supabase API.
- Define appropriate policies for `books`, `members`, `loans`, and `loan_items`.
- Verify administrator permissions on the server side through Supabase policies.
- Never rely only on hiding buttons in the frontend.
- Do not commit `.env` files or private credentials.
- Test borrowing and returning operations using the actual database policies before production use.

## 📁 Project Structure

The application follows a React and Vite project structure. The following is a simplified overview of the known project organization:

```text
library-loan-desk/
├── public/
├── src/
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   └── ManageBooks.jsx
│   ├── components/
│   └── ...
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

Some directories and files may differ depending on the current version of the project.

## 🧪 Testing Checklist

Before deploying or presenting the application, verify the following:

- [ ] Books load correctly from Supabase.
- [ ] Search and subject filtering work as expected.
- [ ] New books can be added.
- [ ] Existing book information can be edited.
- [ ] Book deletion works and remains deleted after refreshing.
- [ ] Borrowing quantities cannot exceed available inventory.
- [ ] Loan records are stored correctly.
- [ ] Returning books updates inventory correctly.
- [ ] Administrative database policies work as intended.
- [ ] The application works in both English and Persian.

## 🎯 Project Goals

LibraryDesk demonstrates practical experience with:

- Component-based development using React.
- Managing application state and user interactions.
- Working with a PostgreSQL database through Supabase.
- Integrating authentication into a web application.
- Implementing database access policies with RLS.
- Building a bilingual user interface.
- Managing source code with Git and GitHub.

## 🔮 Future Improvements

Potential future enhancements include:

- A dedicated dashboard with real-time inventory statistics.
- More advanced search and sorting options.
- Improved loan history and overdue-loan tracking.
- Member management tools.
- Automated tests for critical borrowing and returning workflows.
- Additional accessibility and responsive design improvements.

## 👨‍💻 Author

**Amin Rasooli**

Software Engineering Student | Frontend Developer

- GitHub: [@aminrasooli2007-svg](https://github.com/aminrasooli2007-svg)
- LinkedIn: [Amin Rasooli](https://linkedin.com/in/amin-rasooli-8325b4408)

## 📄 License

No license has been specified yet. If you intend to make this project open source, consider adding a `LICENSE` file that defines how others may use, modify, and distribute the code.
