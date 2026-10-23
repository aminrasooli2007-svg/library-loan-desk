
import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

function Members() {
  const { language } = useLanguage();
  const isPersian = language === "fa";

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    membershipNumber: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const text = isPersian
    ? {
        title: "مدیریت اعضا",
        description: "اعضای کتابخانه را ثبت و مدیریت کنید.",
        total: "تعداد اعضا",
        add: "افزودن عضو",
        search: "جست‌وجوی نام یا شماره عضویت...",
        name: "نام کامل",
        number: "شماره عضویت",
        phone: "شماره تماس",
        actions: "عملیات",
        save: "ذخیره عضو",
        update: "ذخیره تغییرات",
        cancel: "لغو",
        edit: "ویرایش",
        delete: "حذف",
        empty: "هنوز عضوی ثبت نشده است.",
        noResults: "عضوی پیدا نشد.",
        required: "نام و شماره عضویت الزامی است.",
        duplicate: "این شماره عضویت قبلاً ثبت شده است.",
        confirmDelete: "آیا از حذف این عضو مطمئن هستید؟",
        saved: "اطلاعات عضو ذخیره شد.",
        deleted: "عضو حذف شد.",
      }
    : {
        title: "Member Management",
        description: "Register and manage library members.",
        total: "Total Members",
        add: "Add Member",
        search: "Search name or membership number...",
        name: "Full Name",
        number: "Membership Number",
        phone: "Phone Number",
        actions: "Actions",
        save: "Save Member",
        update: "Save Changes",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        empty: "No members have been registered yet.",
        noResults: "No members found.",
        required: "Name and membership number are required.",
        duplicate: "This membership number already exists.",
        confirmDelete: "Are you sure you want to delete this member?",
        saved: "Member information saved.",
        deleted: "Member deleted.",
      };

  const filteredMembers = members.filter((member) =>
    `${member.fullName} ${member.membershipNumber}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function resetForm() {
    setForm({
      fullName: "",
      membershipNumber: "",
      phone: "",
    });
    setEditingId(null);
    setShowForm(false);
  }

  function saveMember(event) {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const membershipNumber = form.membershipNumber.trim();
    const phone = form.phone.trim();

    if (!fullName || !membershipNumber) {
      setMessage(text.required);
      return;
    }

    const duplicate = members.some(
      (member) =>
        member.membershipNumber.toLowerCase() ===
          membershipNumber.toLowerCase() &&
        member.id !== editingId
    );

    if (duplicate) {
      setMessage(text.duplicate);
      return;
    }

    if (editingId !== null) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId
            ? { ...member, fullName, membershipNumber, phone }
            : member
        )
      );
    } else {
      setMembers((current) => [
        ...current,
        {
          id: Date.now(),
          fullName,
          membershipNumber,
          phone,
        },
      ]);
    }

    resetForm();
    setMessage(text.saved);
  }

  function editMember(member) {
    setForm({
      fullName: member.fullName,
      membershipNumber: member.membershipNumber,
      phone: member.phone,
    });
    setEditingId(member.id);
    setShowForm(true);
    setMessage("");
  }

  function deleteMember(id) {
    if (!window.confirm(text.confirmDelete)) return;

    setMembers((current) =>
      current.filter((member) => member.id !== id)
    );
    setMessage(text.deleted);
  }

  return (
    <main
      dir={isPersian ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8F7F4]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="mb-8 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#252432] px-6 py-9 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="mb-3 text-sm font-medium text-[#B9B1FF]">
              {isPersian ? "خدمات کتابخانه" : "LIBRARY SERVICES"}
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              {text.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/65">
              {text.description}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <Users size={25} className="text-[#B9B1FF]" />
            <div>
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-xs text-white/60">{text.total}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E7E7ED] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-[#777783] ${
                  isPersian ? "right-4" : "left-4"
                }`}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={text.search}
                className={`w-full rounded-xl border border-[#D5D5E0] py-3 text-sm outline-none focus:border-[#4033C3] ${
                  isPersian ? "pr-11 pl-4" : "pl-11 pr-4"
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setMessage("");
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5144D8]"
            >
              <UserPlus size={17} />
              {text.add}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={saveMember}
              className="mt-6 rounded-2xl border border-[#E7E7ED] bg-[#F8F7F4] p-5"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="font-bold text-[#252432]">
                  {editingId !== null ? text.edit : text.add}
                </h2>
                <button
                  type="button"
                  onClick={resetForm}
                  aria-label={text.cancel}
                  className="rounded-lg p-2 text-[#777783] hover:bg-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className="text-sm text-[#777783]">
                  {text.name}
                  <input
                    required
                    value={form.fullName}
                    onChange={(event) =>
                      setForm({ ...form, fullName: event.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-[#D5D5E0] bg-white px-3 py-3 text-[#252432] outline-none focus:border-[#4033C3]"
                  />
                </label>

                <label className="text-sm text-[#777783]">
                  {text.number}
                  <input
                    required
                    value={form.membershipNumber}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        membershipNumber: event.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-[#D5D5E0] bg-white px-3 py-3 text-[#252432] outline-none focus:border-[#4033C3]"
                  />
                </label>

                <label className="text-sm text-[#777783]">
                  {text.phone}
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-[#D5D5E0] bg-white px-3 py-3 text-[#252432] outline-none focus:border-[#4033C3]"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4033C3] px-4 py-3 text-sm font-semibold text-white hover:bg-[#5144D8]"
                >
                  <Check size={17} />
                  {editingId !== null ? text.update : text.save}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm font-semibold text-[#252432]"
                >
                  {text.cancel}
                </button>
              </div>
            </form>
          )}

          {message && (
            <p role="status" className="mt-4 rounded-xl bg-[#4033C3]/10 p-3 text-sm text-[#4033C3]">
              {message}
            </p>
          )}

          <div className="mt-6 overflow-x-auto rounded-xl border border-[#E7E7ED]">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-[#F8F7F4] text-[#777783]">
                <tr>
                  <th className="px-4 py-4 text-start font-semibold">{text.name}</th>
                  <th className="px-4 py-4 text-start font-semibold">{text.number}</th>
                  <th className="px-4 py-4 text-start font-semibold">{text.phone}</th>
                  <th className="px-4 py-4 text-end font-semibold">{text.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7ED]">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F8F7F4]">
                    <td className="px-4 py-4 font-medium text-[#252432]">{member.fullName}</td>
                    <td className="px-4 py-4 text-[#777783]">{member.membershipNumber}</td>
                    <td className="px-4 py-4 text-[#777783]">{member.phone || "—"}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => editMember(member)}
                          aria-label={text.edit}
                          className="rounded-lg p-2 text-[#4033C3] hover:bg-[#4033C3]/10"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMember(member.id)}
                          aria-label={text.delete}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-[#777783]">
                      {members.length === 0 ? text.empty : text.noResults}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Members;
