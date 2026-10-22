
import { useState } from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  BookMarked,
  CircleHelp,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const translations = {
  en: {
    badge: "We'd love to hear from you",
    heroTitle1: "Every good",
    heroTitle2: "conversation",
    heroTitle3: "starts with",
    heroTitle4: "hello.",
    heroDescription:
      "Questions about the collection, borrowing, or how the library works? Send us a note. We're always happy to hear from curious minds.",
    heroNote: "Good books. Helpful people. Better conversations.",
    hereToHelp: "Here to help",
    easierTitle: "Let's make things easier.",
    easierDescription:
      "Whether you're exploring the books or learning how to use the loan desk, you're in the right place.",
    exploreBooks: "Explore the books",
    visitLoanDesk: "Visit the Loan Desk",
    welcomingNote: "Made for a more welcoming library experience.",
    getInTouch: "Get in touch",
    messageAway: "We're just a message away.",
    contactDescription:
      "Find our contact details below, or use the form to share a question, suggestion, or idea.",
    contactDetails: [
      {
        title: "Email address",
        value: "library@example.com",
        description: "For general questions",
      },
      {
        title: "Phone number",
        value: "+1 234 567 890",
        description: "Example contact number",
      },
      {
        title: "Find the library",
        value: "Main Library, City Center",
        description: "Example location",
      },
      {
        title: "Opening hours",
        value: "Monday – Friday",
        description: "8:00 AM – 5:00 PM",
      },
    ],
    contactForm: "CONTACT FORM",
    sendMessage: "Send us a message",
    formDescription: "Tell us a little about what you need.",
    fullName: "Full name",
    namePlaceholder: "Your name",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjectPlaceholder: "What would you like to talk about?",
    message: "Your message",
    messagePlaceholder: "Write your message here...",
    submit: "Submit message",
    successTitle: "Form submitted successfully!",
    successDescription:
      "This is a demo form. Your message has not been sent to a real inbox.",
    demoNote: "Demo only · No message is sent or stored.",
    nextRead: "Looking for your next read?",
    nextReadDescription:
      "Explore the collection and discover what's available.",
    browseBooks: "Browse books",
  },
  fa: {
    badge: "خوشحال می‌شویم از شما بشنویم",
    heroTitle1: "هر گفت‌وگوی خوبی",
    heroTitle2: "با یک گفت‌وگو",
    heroTitle3: "شروع می‌شود؛ با",
    heroTitle4: "سلام!",
    heroDescription:
      "درباره مجموعه کتاب‌ها، امانت‌گرفتن یا نحوه کار کتابخانه پرسشی دارید؟ برای ما پیام بفرستید. همیشه از شنیدن دیدگاه‌های افراد کنجکاو خوشحال می‌شویم.",
    heroNote: "کتاب‌های خوب، افراد کمک‌کننده و گفت‌وگوهای بهتر.",
    hereToHelp: "برای کمک اینجا هستیم",
    easierTitle: "بیایید کارها را آسان‌تر کنیم.",
    easierDescription:
      "چه بخواهید کتاب‌ها را بررسی کنید و چه بخواهید با میز امانت آشنا شوید، جای درستی آمده‌اید.",
    exploreBooks: "مشاهده کتاب‌ها",
    visitLoanDesk: "رفتن به میز امانت",
    welcomingNote: "برای تجربه‌ای دوستانه‌تر از کتابخانه ساخته شده است.",
    getInTouch: "با ما در تماس باشید",
    messageAway: "فقط یک پیام با ما فاصله دارید.",
    contactDescription:
      "اطلاعات تماس ما را در پایین ببینید یا از فرم برای ارسال پرسش، پیشنهاد یا ایده خود استفاده کنید.",
    contactDetails: [
      {
        title: "نشانی ایمیل",
        value: "library@example.com",
        description: "برای پرسش‌های عمومی",
      },
      {
        title: "شماره تلفن",
        value: "+1 234 567 890",
        description: "شماره تماس نمونه",
      },
      {
        title: "نشانی کتابخانه",
        value: "کتابخانه مرکزی، مرکز شهر",
        description: "موقعیت مکانی نمونه",
      },
      {
        title: "ساعات کاری",
        value: "دوشنبه تا جمعه",
        description: "۸ صبح تا ۵ عصر",
      },
    ],
    contactForm: "فرم تماس",
    sendMessage: "برای ما پیام بفرستید",
    formDescription: "کمی درباره چیزی که نیاز دارید توضیح دهید.",
    fullName: "نام کامل",
    namePlaceholder: "نام شما",
    email: "نشانی ایمیل",
    emailPlaceholder: "you@example.com",
    subject: "موضوع",
    subjectPlaceholder: "درباره چه چیزی می‌خواهید صحبت کنید؟",
    message: "پیام شما",
    messagePlaceholder: "پیام خود را اینجا بنویسید...",
    submit: "ارسال پیام",
    successTitle: "فرم با موفقیت ثبت شد!",
    successDescription:
      "این فرم نمایشی است. پیام شما به صندوق ایمیل واقعی ارسال نشده است.",
    demoNote: "فقط نمایشی است؛ هیچ پیامی ارسال یا ذخیره نمی‌شود.",
    nextRead: "به دنبال کتاب بعدی خود هستید؟",
    nextReadDescription:
      "مجموعه کتاب‌ها را بررسی کنید و کتاب‌های موجود را پیدا کنید.",
    browseBooks: "مشاهده کتاب‌ها",
  },
};

function Contact() {
  const { language } = useLanguage();
  const isPersian = language === "fa";
  const t = translations[isPersian ? "fa" : "en"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main
      dir={isPersian ? "rtl" : "ltr"}
      className="overflow-hidden bg-[#F8F7F4] text-[#252432]"
    >
      <section className="relative isolate overflow-hidden bg-[#252432] text-white">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#4033C3]/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-52 left-1/4 h-[400px] w-[400px] rounded-full bg-[#E66B3B]/15 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-16 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#C8C1FF]">
              <MessageCircle size={15} />
              {t.badge}
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl">
              {t.heroTitle1}
              <span className="block text-[#B7AEFF]">{t.heroTitle2}</span>
              <span className="block">
                {t.heroTitle3}{" "}
                <span className="text-[#E66B3B]">{t.heroTitle4}</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              {t.heroDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4033C3] text-white">
                <BookOpen size={17} />
              </span>
              <span>{t.heroNote}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-white/10" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#302E43] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4033C3]">
                  <BookMarked size={25} />
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                  {t.hereToHelp}
                </span>
              </div>

              <h2 className="mt-8 text-2xl font-bold">{t.easierTitle}</h2>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {t.easierDescription}
              </p>

              <div className="mt-7 space-y-3">
                <Link
                  to="/books"
                  className="group flex items-center justify-between rounded-xl bg-white/[0.06] p-4 transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen size={19} className="text-[#B7AEFF]" />
                    <span className="text-sm font-medium">
                      {t.exploreBooks}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`text-white/45 transition group-hover:-translate-y-0.5 group-hover:text-white ${
                      isPersian
                        ? "group-hover:-translate-x-0.5"
                        : "group-hover:translate-x-0.5"
                    }`}
                  />
                </Link>

                <Link
                  to="/loans"
                  className="group flex items-center justify-between rounded-xl bg-white/[0.06] p-4 transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <CircleHelp size={19} className="text-[#E66B3B]" />
                    <span className="text-sm font-medium">
                      {t.visitLoanDesk}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`text-white/45 transition group-hover:-translate-y-0.5 group-hover:text-white ${
                      isPersian
                        ? "group-hover:-translate-x-0.5"
                        : "group-hover:translate-x-0.5"
                    }`}
                  />
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs leading-6 text-white/40">
                <Sparkles size={14} className="shrink-0 text-[#E66B3B]" />
                {t.welcomingNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold tracking-widest text-[#E66B3B]">
              {t.getInTouch}
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.messageAway}
            </h2>

            <p className="mt-4 max-w-md leading-7 text-[#777783]">
              {t.contactDescription}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {t.contactDetails.map((detail, index) => {
                const icons = [Mail, Phone, MapPin, Clock];
                const Icon = icons[index];

                return (
                  <div
                    key={detail.title}
                    className="group flex items-start gap-4 rounded-2xl border border-[#E7E7ED] bg-white p-4 transition hover:border-[#4033C3]/30 hover:shadow-md hover:shadow-[#252432]/5 sm:p-5"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        index % 2 === 0
                          ? "bg-[#4033C3]/10 text-[#4033C3]"
                          : "bg-[#E66B3B]/10 text-[#C4552C]"
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{detail.title}</h3>
                      <p
                        dir={index === 0 || index === 1 ? "ltr" : undefined}
                        className={`mt-1 break-words text-sm font-medium text-[#4033C3] ${
                          index === 0 || index === 1
                            ? "text-start"
                            : ""
                        }`}
                      >
                        {detail.value}
                      </p>
                      <p className="mt-1 text-xs text-[#777783]">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rotate-1 rounded-[2rem] bg-[#EAE7FF]" />

            <div className="relative rounded-[1.75rem] border border-[#E7E7ED] bg-white p-5 shadow-xl shadow-[#252432]/5 sm:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4033C3]">
                    <span className="h-2 w-2 rounded-full bg-[#E66B3B]" />
                    {t.contactForm}
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {t.sendMessage}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#777783]">
                    {t.formDescription}
                  </p>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1EEFF] text-[#4033C3] sm:flex">
                  <Send size={23} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#252432]"
                    >
                      {t.fullName}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#252432]"
                    >
                      {t.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      dir="ltr"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm text-left outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                    />
                  </div>
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
                    maxLength={150}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.subjectPlaceholder}
                    className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#252432]"
                    >
                      {t.message}
                    </label>
                    <span className="text-xs text-[#A2A1AB]">
                      {formData.message.length}/1000
                    </span>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={5}
                    maxLength={1000}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className="w-full resize-y rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                  />
                </div>

                {submitted && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-bold">{t.successTitle}</p>
                      <p className="mt-1 leading-6">
                        {t.successDescription}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#4033C3] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#4033C3]/20 transition hover:-translate-y-0.5 hover:bg-[#3328A0] hover:shadow-xl hover:shadow-[#4033C3]/25 focus:outline-none focus:ring-4 focus:ring-[#4033C3]/20"
                >
                  {t.submit}
                  <Send
                    size={17}
                    className={`transition ${
                      isPersian
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    } group-hover:-translate-y-0.5`}
                  />
                </button>

                <p className="text-center text-xs leading-5 text-[#92919C]">
                  {t.demoNote}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 overflow-hidden rounded-3xl bg-[#EAE7FF] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#4033C3]">
              <BookOpen size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold">{t.nextRead}</h2>
              <p className="mt-2 text-sm leading-6 text-[#68647D]">
                {t.nextReadDescription}
              </p>
            </div>
          </div>

          <Link
            to="/books"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3328A0]"
          >
            {t.browseBooks}
            <ArrowRight
              size={17}
              className={isPersian ? "rotate-180" : ""}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;
