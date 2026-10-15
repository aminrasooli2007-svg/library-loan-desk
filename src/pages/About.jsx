
import { BookOpen, Library, Users, ClipboardList } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] px-4 py-12 text-[#252432] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl bg-[#4033C3] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <BookOpen size={34} />
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            About Library Loan Desk
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            A simple library management system designed to make book
            inventory and borrowing easier, faster, and more organized.
          </p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-[#E7E7ED] bg-white p-6">
            <h2 className="text-xl font-bold text-[#4033C3]">
              Our Purpose
            </h2>

            <p className="mt-4 leading-7 text-[#777783]">
              Library Loan Desk helps library staff manage books, track
              available copies, and record borrowing activities in one
              place. It provides a clear and simple way to organize
              library information.
            </p>
          </div>

          <div className="rounded-xl border border-[#E7E7ED] bg-white p-6">
            <h2 className="text-xl font-bold text-[#4033C3]">
              Our Goal
            </h2>

            <p className="mt-4 leading-7 text-[#777783]">
              Our goal is to make everyday library tasks easier by
              providing an organized interface for book inventory,
              loans, and returns.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Main Features</h2>
            <p className="mt-2 text-[#777783]">
              The key tools available in our library system.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#E7E7ED] bg-white p-5">
              <Library className="text-[#4033C3]" size={28} />
              <h3 className="mt-4 font-semibold">Book Inventory</h3>
              <p className="mt-2 text-sm leading-6 text-[#777783]">
                View books and track available copies.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E7ED] bg-white p-5">
              <BookOpen className="text-[#4033C3]" size={28} />
              <h3 className="mt-4 font-semibold">Book Search</h3>
              <p className="mt-2 text-sm leading-6 text-[#777783]">
                Find books by title, author, or subject.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E7ED] bg-white p-5">
              <ClipboardList className="text-[#4033C3]" size={28} />
              <h3 className="mt-4 font-semibold">Loan Tracking</h3>
              <p className="mt-2 text-sm leading-6 text-[#777783]">
                Record loans and manage due dates.
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E7ED] bg-white p-5">
              <Users className="text-[#4033C3]" size={28} />
              <h3 className="mt-4 font-semibold">Easy Management</h3>
              <p className="mt-2 text-sm leading-6 text-[#777783]">
                Keep library tasks organized in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-[#E7E7ED] bg-white p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold">Built with Modern Web Technologies</h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#777783]">
            This project uses React to build the user interface,
            JavaScript for application logic, Tailwind CSS for styling,
            and React Router for page navigation.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {["React", "JavaScript", "Tailwind CSS", "React Router"].map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-[#eeecff] px-4 py-2 text-sm font-medium text-[#4033C3]"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
