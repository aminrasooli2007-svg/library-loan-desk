
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

const contactDetails = [
  {
    icon: Mail,
    title: "Email address",
    value: "library@example.com",
    description: "For general questions",
  },
  {
    icon: Phone,
    title: "Phone number",
    value: "+1 234 567 890",
    description: "Example contact number",
  },
  {
    icon: MapPin,
    title: "Find the library",
    value: "Main Library, City Center",
    description: "Example location",
  },
  {
    icon: Clock,
    title: "Opening hours",
    value: "Monday – Friday",
    description: "8:00 AM – 5:00 PM",
  },
];

function Contact() {
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
    <main className="overflow-hidden bg-[#F8F7F4] text-[#252432]">
      <section className="relative isolate overflow-hidden bg-[#252432] text-white">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#4033C3]/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-52 left-1/4 h-[400px] w-[400px] rounded-full bg-[#E66B3B]/15 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-16 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C8C1FF]">
              <MessageCircle size={15} />
              We'd love to hear from you
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Every good
              <span className="block text-[#B7AEFF]">conversation</span>
              <span className="block">
                starts with
                <span className="text-[#E66B3B]"> hello.</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Questions about the collection, borrowing, or how the library
              works? Send us a note. We're always happy to hear from curious
              minds.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4033C3] text-white">
                <BookOpen size={17} />
              </span>
              <span>Good books. Helpful people. Better conversations.</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/10 rotate-2" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#302E43] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4033C3]">
                  <BookMarked size={25} />
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">
                  Here to help
                </span>
              </div>

              <h2 className="mt-8 text-2xl font-bold">
                Let's make things easier.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/55">
                Whether you're exploring the books or learning how to use the
                loan desk, you're in the right place.
              </p>

              <div className="mt-7 space-y-3">
                <Link
                  to="/books"
                  className="group flex items-center justify-between rounded-xl bg-white/[0.06] p-4 transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen size={19} className="text-[#B7AEFF]" />
                    <span className="text-sm font-medium">
                      Explore the books
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-white/45 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </Link>

                <Link
                  to="/loans"
                  className="group flex items-center justify-between rounded-xl bg-white/[0.06] p-4 transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <CircleHelp size={19} className="text-[#E66B3B]" />
                    <span className="text-sm font-medium">
                      Visit the Loan Desk
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-white/45 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/40">
                <Sparkles size={14} className="text-[#E66B3B]" />
                Made for a more welcoming library experience.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E66B3B]">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              We're just a message away.
            </h2>

            <p className="mt-4 max-w-md leading-7 text-[#777783]">
              Find our contact details below, or use the form to share a
              question, suggestion, or idea.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;

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
                      <p className="mt-1 break-words text-sm font-medium text-[#4033C3]">
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
            <div className="absolute -inset-2 rounded-[2rem] bg-[#EAE7FF] rotate-1" />

            <div className="relative rounded-[1.75rem] border border-[#E7E7ED] bg-white p-5 shadow-xl shadow-[#252432]/5 sm:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4033C3]">
                    <span className="h-2 w-2 rounded-full bg-[#E66B3B]" />
                    CONTACT FORM
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Send us a message
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#777783]">
                    Tell us a little about what you need.
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
                      Full name
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
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#252432]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#252432]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={150}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to talk about?"
                    className="w-full rounded-xl border border-[#DCDCE6] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A2A1AB] focus:border-[#4033C3] focus:bg-white focus:ring-4 focus:ring-[#4033C3]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#252432]"
                    >
                      Your message
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
                    placeholder="Write your message here..."
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
                      <p className="font-bold">Form submitted successfully!</p>
                      <p className="mt-1 leading-6">
                        This is a demo form. Your message has not been sent
                        to a real inbox.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#4033C3] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#4033C3]/20 transition hover:-translate-y-0.5 hover:bg-[#3328A0] hover:shadow-xl hover:shadow-[#4033C3]/25 focus:outline-none focus:ring-4 focus:ring-[#4033C3]/20"
                >
                  Submit message
                  <Send
                    size={17}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </button>

                <p className="text-center text-xs leading-5 text-[#92919C]">
                  Demo only · No message is sent or stored.
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
              <h2 className="text-xl font-bold">
                Looking for your next read?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#68647D]">
                Explore the collection and discover what's available.
              </p>
            </div>
          </div>

          <Link
            to="/books"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3328A0]"
          >
            Browse books
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;
