
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    home: "Home",
    books: "Books",
    loanDesk: "Loan Desk",
    manageBooks: "Manage Books",
    about: "About",
    contact: "Contact",
    tagline: "Your personal library space",
    footer: "Every book has a story.",
    project: "Library Loan Desk · Student Project",
    language: "فارسی",
  },
  fa: {
    home: "خانه",
    books: "کتاب‌ها",
    loanDesk: "میز امانت",
    manageBooks: "مدیریت کتاب‌ها",
    about: "درباره ما",
    contact: "تماس با ما",
    tagline: "فضای کتابخانه شخصی شما",
    footer: "هر کتاب داستانی دارد.",
    project: "سیستم امانت کتابخانه · پروژه دانشجویی",
    language: "English",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("library-language") || "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    localStorage.setItem("library-language", language);
  }, [language]);

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "fa" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, t, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
