import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  BookOpen,
} from "lucide-react";

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
    <main className="min-h-screen bg-[#F8F8FC] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4033C3]/10 text-[#4033C3]">
            <Mail size={30} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#E66B3B]">
            Get in Touch
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#252432] sm:text-4xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#777783] sm:text-base">
            Have a question about our library or book loans? Send us a
            message and we will be happy to help.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl bg-[#4033C3] p-7 text-white shadow-sm">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <BookOpen size={25} />
              </div>

              <h2 className="text-xl font-semibold">
                Let's Talk
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/75">
                We are here to help you with your questions about
                books, borrowing, and library services.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="mt-1 shrink-0" />

                  <div>
                    <h3 className="text-sm font-semibold">
                      Email
                    </h3>
                    <p className="mt-1 text-sm text-white/75">
                      library@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="mt-1 shrink-0" />

                  <div>
                    <h3 className="text-sm font-semibold">
                      Phone
                    </h3>
                    <p className="mt-1 text-sm text-white/75">
                      +1 234 567 890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin size={20} className="mt-1 shrink-0" />

                  <div>
                    <h3 className="text-sm font-semibold">
                      Location
                    </h3>
                    <p className="mt-1 text-sm text-white/75">
                      Main Library, City Center
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="mt-1 shrink-0" />

                  <div>
                    <h3 className="text-sm font-semibold">
                      Working Hours
                    </h3>
                    <p className="mt-1 text-sm text-white/75">
                      Monday – Friday
                    </p>
                    <p className="text-sm text-white/75">
                      8:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6">
              <h3 className="font-semibold text-[#252432]">
                Need help with a loan?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#777783]">
                Visit the Loan Desk page to manage borrowed books,
                check due dates, and return your books.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E7E7ED] bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <h2 className="text-xl font-semibold text-[#252432]">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#777783]">
              Fill in the form below. All fields are required.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#DCDCE6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A0AA] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#DCDCE6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A0AA] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full rounded-xl border border-[#DCDCE6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A0AA] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#252432]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-[#DCDCE6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#A0A0AA] focus:border-[#4033C3] focus:ring-2 focus:ring-[#4033C3]/10"
                />
              </div>

              {submitted && (
                <p
                  role="status"
                  className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  Your message has been submitted successfully!
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3328A0] focus:outline-none focus:ring-2 focus:ring-[#4033C3]/30 focus:ring-offset-2"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-center text-xs leading-5 text-[#777783]">
                Demo form only. Messages are not sent to a real inbox.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;
