
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

const features = [
  {
    number: "01",
    icon: LibraryBig,
    title: "A clearer collection",
    description:
      "Keep book titles, authors, subjects, and copy availability organized in one place.",
    color: "bg-[#4033C3]",
  },
  {
    number: "02",
    icon: Search,
    title: "Find your next read",
    description:
      "Search the collection by title, author, or subject and discover available books.",
    color: "bg-[#E66B3B]",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Borrow with confidence",
    description:
      "Create sample loans, track due dates, and manage returns through a simple workflow.",
    color: "bg-[#4033C3]",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Stay in control",
    description:
      "Manage inventory and keep an eye on borrowed and available copies.",
    color: "bg-[#E66B3B]",
  },
];

const technologies = [
  { name: "React", detail: "Interface", icon: Code2 },
  { name: "JavaScript", detail: "Application logic", icon: Layers3 },
  { name: "Tailwind CSS", detail: "Visual design", icon: Sparkles },
  { name: "React Router", detail: "Navigation", icon: MonitorSmartphone },
];

function About() {
  return (
    <main className="overflow-hidden bg-[#F8F7F4] text-[#252432]">
      <section className="relative isolate overflow-hidden bg-[#252432] text-white">
        <div className="pointer-events-none absolute -right-36 -top-40 h-[480px] w-[480px] rounded-full bg-[#4033C3]/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-52 left-1/4 h-[420px] w-[420px] rounded-full bg-[#E66B3B]/15 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D6D0FF]">
              <Sparkles size={15} />
              The story behind the desk
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              A little more
              <span className="block text-[#B7AEFF]">order.</span>
              <span className="block">A lot more</span>
              <span className="text-[#E66B3B]">reading.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Meet Library Loan Desk — a simple, thoughtful way to organize
              books, discover what is available, and make everyday library
              tasks feel effortless.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4033C3]/25 transition hover:-translate-y-0.5 hover:bg-[#5145D5] focus:outline-none focus:ring-4 focus:ring-[#B7AEFF]/30"
              >
                Explore the collection
                <ArrowRight size={17} />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                Discover our story
                <ArrowDown size={17} />
              </a>
            </div>

            <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex -space-x-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#252432] bg-[#4033C3]">
                  <BookOpen size={17} />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#252432] bg-[#E66B3B]">
                  <BookMarked size={17} />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#252432] bg-[#5B5770]">
                  <LibraryBig size={17} />
                </span>
              </div>

              <p className="text-sm leading-6 text-white/60">
                Designed around books,
                <span className="block font-medium text-white">
                  built around simplicity.
                </span>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-5 rounded-[2.5rem] border border-white/[0.08] rotate-3" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#302E43] p-5 shadow-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    Inside the library
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">
                    Every book has a place.
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4033C3]">
                  <BookOpen size={22} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-6">
                <div className="rounded-2xl bg-[#4033C3] p-4 sm:p-5">
                  <BookOpen size={22} className="text-white/75" />
                  <p className="mt-8 text-2xl font-bold">Discover</p>
                  <p className="mt-1 text-xs leading-5 text-white/70">
                    Explore the collection
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E66B3B] p-4 sm:p-5">
                  <BookMarked size={22} className="text-white/80" />
                  <p className="mt-8 text-2xl font-bold">Organize</p>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Keep every copy accounted for
                  </p>
                </div>

                <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#C8C1FF]">
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">A smoother loan desk</p>
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      Borrowing and returns, without the clutter.
                    </p>
                  </div>
                  <ArrowRight
                    size={19}
                    className="ml-auto shrink-0 text-[#E66B3B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#211F30] px-4 py-3">
                <span className="text-xs text-white/50">
                  Thoughtfully made for learning
                </span>
                <span className="flex items-center gap-2 text-xs font-medium text-[#C8C1FF]">
                  <span className="h-2 w-2 rounded-full bg-[#E66B3B]" />
                  Student project
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-[#E7E7ED] bg-white p-4 text-[#252432] shadow-xl sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1EEFF] text-[#4033C3]">
                <Sparkles size={20} />
              </span>
              <span>
                <span className="block text-sm font-bold">Simple by design</span>
                <span className="mt-1 block text-xs text-[#777783]">
                  Useful, clear, focused
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="our-story" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E66B3B]">
              Why we built it
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Good systems make room for
              <span className="text-[#4033C3]"> good stories.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#777783] sm:text-lg">
            <p>
              A library is more than shelves and book titles. It is a place
              where people find ideas, learn new skills, and discover different
              perspectives. Managing its collection should feel just as
              welcoming.
            </p>
            <p>
              Library Loan Desk was created as a student project to bring
              everyday library tasks into one clear interface. It helps users
              explore inventory, check available copies, record sample loans,
              process returns, and manage book details.
            </p>
            <p>
              Our approach is simple: keep the experience easy to understand,
              make important information visible, and give each task a clear
              place.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 sm:p-7">
            <span className="text-sm font-bold text-[#E66B3B]">01 / CLARITY</span>
            <h3 className="mt-5 text-xl font-bold">Less confusion</h3>
            <p className="mt-3 text-sm leading-7 text-[#777783]">
              Present the details people need without making the interface
              complicated.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 sm:p-7">
            <span className="text-sm font-bold text-[#4033C3]">02 / CARE</span>
            <h3 className="mt-5 text-xl font-bold">Thoughtful details</h3>
            <p className="mt-3 text-sm leading-7 text-[#777783]">
              Clear feedback and useful controls make routine tasks easier
              to follow.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 sm:p-7">
            <span className="text-sm font-bold text-[#E66B3B]">03 / PURPOSE</span>
            <h3 className="mt-5 text-xl font-bold">Built to be useful</h3>
            <p className="mt-3 text-sm leading-7 text-[#777783]">
              Focus on the essentials of book inventory, loans, and returns.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E7E7ED] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E66B3B]">
              What you can do
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Small tools. A smoother library.
            </h2>
            <p className="mt-4 leading-7 text-[#777783]">
              Everything is organized around the everyday tasks of a library.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-[#E7E7ED] bg-[#F8F7F4] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#4033C3]/30 hover:bg-white hover:shadow-xl hover:shadow-[#252432]/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.15em] text-[#A09EAC]">
                      {feature.number}
                    </span>
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white transition duration-300 group-hover:rotate-3 ${feature.color}`}
                    >
                      <Icon size={23} />
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#777783]">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="overflow-hidden rounded-3xl bg-[#EAE7FF]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4033C3]">
                Made with modern tools
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                A learning project with a real purpose.
              </h2>
              <p className="mt-4 max-w-md leading-7 text-[#68647D]">
                Built with familiar web technologies to practice component
                design, application state, navigation, and responsive layouts.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {technologies.map((technology) => {
                const Icon = technology.icon;

                return (
                  <div
                    key={technology.name}
                    className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 transition hover:bg-white"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4033C3]/10 text-[#4033C3]">
                      <Icon size={23} />
                    </span>
                    <span>
                      <span className="block font-bold text-[#252432]">
                        {technology.name}
                      </span>
                      <span className="mt-1 block text-xs text-[#777783]">
                        {technology.detail}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#252432] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4033C3]">
            <BookOpen size={28} />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Your next favorite book might be waiting.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
            Explore the collection and see what is available at the Library
            Loan Desk.
          </p>

          <Link
            to="/books"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#4033C3] transition hover:-translate-y-0.5 hover:bg-[#F1EEFF]"
          >
            Browse the books
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
