
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

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
    const savedLanguage = localStorage.getItem("library-language");
    return savedLanguage === "fa" ? "fa" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

    localStorage.setItem("library-language", language);
  }, [language]);

  const t = (key) => translations[language][key] ?? key;

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "fa" : "en"
    );
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
