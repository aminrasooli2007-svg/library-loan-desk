
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  LibraryBig,
  Search,
  ClipboardCheck,
  Sparkles,
  Layers3,
  Code2,
  MonitorSmartphone,
  RotateCcw,
  BookMarked,
} from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../i18n/LanguageContext";

const translations = {
  en: {
    badge: "The story behind the desk",
    heroTitleStart: "A little more order.",
    heroTitleEnd: "A lot more reading.",
    heroDescription:
      "Library Loan Desk is a simple library management experience designed to make organizing books, finding your next read, and managing loans feel easier.",
    exploreBooks: "Explore books",
    ourStory: "Our story",
    heroNote: "Designed around books, built around simplicity.",
    insideLibrary: "Inside the library",
    everyBook: "Every book has a place",
    discover: "Discover",
    organize: "Organize",
    smootherDesk: "A smoother loan desk",
    studentProject: "Student project",
    thoughtfullyMade: "Thoughtfully made for learning",
    simpleByDesign: "Simple by design",
    usefulClearFocused: "Useful, clear, focused",
    whyWeBuiltIt: "Why we built it",
    storyTitleStart: "Good systems make room",
    storyTitleEnd: "for good stories.",
    storyParagraph1:
      "Libraries bring people and ideas together. But when book details, available copies, and borrowing records are difficult to manage, finding the right book can become harder than it should be.",
    storyParagraph2:
      "Library Loan Desk was created as a learning project to explore how a clear interface can make everyday library tasks easier. It brings the collection, loan workflow, and inventory tools together in one place.",
    storyParagraph3:
      "The goal is simple: make the important things easy to find, keep the workflow understandable, and let readers focus on what matters most — reading.",
    lessConfusion: "Less confusion",
    lessConfusionDescription:
      "Keep book information and availability easy to understand.",
    thoughtfulDetails: "Thoughtful details",
    thoughtfulDetailsDescription:
      "Use clear layouts and simple actions for everyday tasks.",
    builtToBeUseful: "Built to be useful",
    builtToBeUsefulDescription:
      "Focus on practical library workflows instead of unnecessary complexity.",
    whatYouCanDo: "What you can do",
    featuresTitleStart: "Small tools.",
    featuresTitleEnd: "A smoother library.",
    feature1Title: "A clearer collection",
    feature1Description:
      "Keep book titles, authors, subjects, and copy availability organized in one place.",
    feature2Title: "Find your next read",
    feature2Description:
      "Search the collection by title, author, or subject and discover available books.",
    feature3Title: "Borrow with confidence",
    feature3Description:
      "Create sample loans, track due dates, and manage returns through a simple workflow.",
    feature4Title: "Stay in control",
    feature4Description:
      "Manage inventory and keep an eye on borrowed and available copies.",
    modernTools: "Made with modern tools",
    technologyTitleStart: "A learning project",
    technologyTitleEnd: "with a real purpose.",
    interface: "Interface",
    applicationLogic: "Application logic",
    visualDesign: "Visual design",
    navigation: "Navigation",
    ctaTitleStart: "Your next favorite book",
    ctaTitleEnd: "might be waiting.",
    ctaDescription:
      "Explore the collection and find a book that catches your interest.",
    browseBooks: "Browse the books",
    technologies: [
      { name: "React", description: "Interface" },
      { name: "JavaScript", description: "Application logic" },
      { name: "Tailwind CSS", description: "Visual design" },
      { name: "React Router", description: "Navigation" },
    ],
  },
  fa: {
    badge: "داستان پشت میز کتابخانه",
    heroTitleStart: "نظم بیشتر.",
    heroTitleEnd: "مطالعه بیشتر.",
    heroDescription:
      "Library Loan Desk یک تجربه ساده برای مدیریت کتابخانه است که سازمان‌دهی کتاب‌ها، پیدا کردن کتاب بعدی و مدیریت امانت‌ها را آسان‌تر می‌سازد.",
    exploreBooks: "مشاهده کتاب‌ها",
    ourStory: "داستان ما",
    heroNote: "طراحی‌شده برای کتاب‌ها، ساخته‌شده بر پایه سادگی.",
    insideLibrary: "درون کتابخانه",
    everyBook: "هر کتاب جای مشخصی دارد",
    discover: "کشف",
    organize: "سازمان‌دهی",
    smootherDesk: "مدیریت آسان‌تر امانت‌ها",
    studentProject: "پروژه دانشجویی",
    thoughtfullyMade: "با دقت برای یادگیری ساخته شده",
    simpleByDesign: "سادگی در طراحی",
    usefulClearFocused: "کاربردی، واضح و متمرکز",
    whyWeBuiltIt: "چرا آن را ساختیم؟",
    storyTitleStart: "سیستم‌های خوب، فضا ایجاد می‌کنند",
    storyTitleEnd: "برای داستان‌های خوب.",
    storyParagraph1:
      "کتابخانه‌ها انسان‌ها و ایده‌ها را به هم پیوند می‌دهند. اما وقتی مدیریت اطلاعات کتاب‌ها، نسخه‌های موجود و سوابق امانت دشوار باشد، پیدا کردن کتاب مناسب نیز سخت‌تر از حد لازم می‌شود.",
    storyParagraph2:
      "Library Loan Desk به‌عنوان یک پروژه آموزشی ساخته شد تا بررسی کنیم چگونه یک رابط کاربری واضح می‌تواند کارهای روزمره کتابخانه را آسان‌تر کند. این پروژه مجموعه کتاب‌ها، روند امانت‌دهی و ابزارهای مدیریت موجودی را در یک مکان گرد هم می‌آورد.",
    storyParagraph3:
      "هدف ساده است: اطلاعات مهم به‌آسانی پیدا شوند، روند کار قابل‌درک باشد و خوانندگان بتوانند روی مهم‌ترین چیز تمرکز کنند؛ یعنی مطالعه.",
    lessConfusion: "سردرگمی کمتر",
    lessConfusionDescription:
      "اطلاعات کتاب‌ها و وضعیت موجودی را واضح و قابل‌درک نگه دارید.",
    thoughtfulDetails: "جزئیات سنجیده",
    thoughtfulDetailsDescription:
      "برای کارهای روزمره از چیدمان واضح و عملکردهای ساده استفاده کنید.",
    builtToBeUseful: "ساخته‌شده برای کاربرد",
    builtToBeUsefulDescription:
      "به‌جای پیچیدگی‌های غیرضروری، روی روندهای عملی کتابخانه تمرکز کنید.",
    whatYouCanDo: "چه کارهایی می‌توانید انجام دهید؟",
    featuresTitleStart: "ابزارهای کوچک.",
    featuresTitleEnd: "کتابخانه‌ای منظم‌تر.",
    feature1Title: "مجموعه‌ای منظم‌تر",
    feature1Description:
      "عنوان کتاب‌ها، نویسندگان، موضوعات و موجودی نسخه‌ها را در یک مکان مدیریت کنید.",
    feature2Title: "کتاب بعدی خود را پیدا کنید",
    feature2Description:
      "مجموعه را بر اساس عنوان، نویسنده یا موضوع جست‌وجو کنید و کتاب‌های موجود را بیابید.",
    feature3Title: "با اطمینان امانت بگیرید",
    feature3Description:
      "امانت‌های نمونه ایجاد کنید، تاریخ‌های بازگشت را پیگیری کنید و بازگرداندن کتاب‌ها را مدیریت کنید.",
    feature4Title: "کنترل امور را در دست داشته باشید",
    feature4Description:
      "موجودی کتابخانه را مدیریت کنید و نسخه‌های امانت‌داده‌شده و موجود را زیر نظر داشته باشید.",
    modernTools: "ساخته‌شده با ابزارهای مدرن",
    technologyTitleStart: "یک پروژه آموزشی",
    technologyTitleEnd: "با هدفی کاربردی.",
    interface: "رابط کاربری",
    applicationLogic: "منطق برنامه",
    visualDesign: "طراحی ظاهری",
    navigation: "مسیریابی",
    ctaTitleStart: "شاید کتاب موردعلاقه بعدی شما",
    ctaTitleEnd: "همین‌جا منتظر باشد.",
    ctaDescription:
      "مجموعه کتاب‌ها را بررسی کنید و کتابی را پیدا کنید که توجه شما را جلب می‌کند.",
    browseBooks: "مشاهده کتاب‌ها",
    technologies: [
      { name: "React", description: "رابط کاربری" },
      { name: "JavaScript", description: "منطق برنامه" },
      { name: "Tailwind CSS", description: "طراحی ظاهری" },
      { name: "React Router", description: "مسیریابی" },
    ],
  },
};

const features = [
  {
    number: "01",
    icon: LibraryBig,
    title: "feature1Title",
    description: "feature1Description",
    color: "purple",
  },
  {
    number: "02",
    icon: Search,
    title: "feature2Title",
    description: "feature2Description",
    color: "orange",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "feature3Title",
    description: "feature3Description",
    color: "purple",
  },
  {
    number: "04",
    icon: BookMarked,
    title: "feature4Title",
    description: "feature4Description",
    color: "orange",
  },
];

const technologyIcons = [
  Code2,
  Layers3,
  Sparkles,
  MonitorSmartphone,
];

export default function About() {
  const { language } = useLanguage();
  const isPersian = language === "fa";
  const t = translations[isPersian ? "fa" : "en"];

  return (
    <main
      dir={isPersian ? "rtl" : "ltr"}
      className="overflow-hidden bg-[#F7F7FB] text-[#171725]"
    >
      <section className="relative overflow-hidden bg-[#11111B] text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4033C3]/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#E66B3B]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80">
              <Sparkles size={16} className="text-[#E66B3B]" />
              <span>{t.badge}</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              {t.heroTitleStart}
              <span className="mt-2 block text-[#A59DFF]">
                {t.heroTitleEnd}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              {t.heroDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
              >
                {t.exploreBooks}
                <ArrowRight
                  size={17}
                  className={isPersian ? "rotate-180" : ""}
                />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {t.ourStory}
                <ArrowDown size={16} />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-white/50">
              <span className="h-px w-9 bg-[#E66B3B]" />
              <span>{t.heroNote}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#4033C3]/30 to-[#E66B3B]/10 blur-2xl" />

            <div className="relative rounded-[1.75rem] border border-white/10 bg-[#1B1B29] p-5 shadow-2xl shadow-black/20 sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4033C3]/20 text-[#A59DFF]">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t.insideLibrary}
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      {t.everyBook}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  {t.studentProject}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.035] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4033C3]/20 text-[#A59DFF]">
                    <BookMarked size={20} />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-white">
                    {t.discover}
                  </p>
                  <p className="mt-1 text-xs leading-6 text-white/45">
                    {t.feature2Description}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.035] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E66B3B]/15 text-[#F49A75]">
                    <Layers3 size={20} />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-white">
                    {t.organize}
                  </p>
                  <p className="mt-1 text-xs leading-6 text-white/45">
                    {t.feature1Description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#4033C3]/20 bg-[#4033C3]/10 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4033C3]/25 text-[#B8B1FF]">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t.smootherDesk}
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    {t.thoughtfullyMade}
                  </p>
                </div>
                <ArrowRight
                  size={17}
                  className={`ms-auto shrink-0 text-white/35 ${
                    isPersian ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-[#242435] p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E66B3B]/15 text-[#F49A75]">
                  <Sparkles size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t.simpleByDesign}
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    {t.usefulClearFocused}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="our-story"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4033C3]/8 px-4 py-2 text-sm font-medium text-[#4033C3]">
              <BookOpen size={16} />
              {t.whyWeBuiltIt}
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.storyTitleStart}
              <span className="mt-1 block text-[#4033C3]">
                {t.storyTitleEnd}
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#626276]">
            <p>{t.storyParagraph1}</p>
            <p>{t.storyParagraph2}</p>
            <p>{t.storyParagraph3}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E8E8F0] bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
              <Search size={21} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">
              {t.lessConfusion}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#77778A]">
              {t.lessConfusionDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E8F0] bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E66B3B]/10 text-[#D65D30]">
              <Sparkles size={21} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">
              {t.thoughtfulDetails}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#77778A]">
              {t.thoughtfulDetailsDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E8F0] bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
              <BookMarked size={21} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">
              {t.builtToBeUseful}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#77778A]">
              {t.builtToBeUsefulDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E66B3B]/10 px-4 py-2 text-sm font-medium text-[#C6532B]">
              <Layers3 size={16} />
              {t.whatYouCanDo}
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.featuresTitleStart}
              <span className="text-[#4033C3]"> {t.featuresTitleEnd}</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isPurple = feature.color === "purple";

              return (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-[#E8E8F0] bg-[#FDFDFF] p-6 transition hover:-translate-y-1 hover:border-[#D7D3FF] hover:shadow-lg hover:shadow-[#4033C3]/5 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isPurple
                          ? "bg-[#4033C3]/10 text-[#4033C3]"
                          : "bg-[#E66B3B]/10 text-[#D65D30]"
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    <span className="text-sm font-semibold text-[#B7B7C8]">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {t[feature.title]}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77778A]">
                    {t[feature.description]}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4033C3]/8 px-4 py-2 text-sm font-medium text-[#4033C3]">
              <Code2 size={16} />
              {t.modernTools}
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.technologyTitleStart}
              <span className="mt-1 block text-[#4033C3]">
                {t.technologyTitleEnd}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.technologies.map((technology, index) => {
              const Icon = technologyIcons[index];

              return (
                <div
                  key={technology.name}
                  className="flex items-center gap-4 rounded-2xl border border-[#E8E8F0] bg-white p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4033C3]/8 text-[#4033C3]">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">{technology.name}</h3>
                    <p className="mt-1 text-sm text-[#77778A]">
                      {technology.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#171725] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#4033C3]/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#E66B3B]/15 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <BookOpen size={16} className="text-[#F49A75]" />
                {t.browseBooks}
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t.ctaTitleStart}
                <span className="mt-1 block text-[#A59DFF]">
                  {t.ctaTitleEnd}
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                {t.ctaDescription}
              </p>
            </div>

            <Link
              to="/books"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#171725] transition hover:bg-[#EDEBFF]"
            >
              {t.browseBooks}
              <ArrowRight
                size={17}
                className={isPersian ? "rotate-180" : ""}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
