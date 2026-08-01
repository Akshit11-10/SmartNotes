import { useState } from "react";
import { Save } from "lucide-react";

// Reusable form for both creating and editing a note.
// - `initialValues` pre-fills the form (used by EditNote.jsx)
// - `onSubmit` is called with { title, content } when the form is valid
// - `submitLabel` lets the parent page customize the button text
function NoteForm({ initialValues = { title: "", content: "" }, onSubmit, submitLabel = "Save", submitting = false }) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [errors, setErrors] = useState({});

  // Mirrors the backend's @NotBlank validation on Note.java,
  // so the user gets instant feedback before the request is even sent.
  const validate = () => {
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!content.trim()) nextErrors.content = "Content is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grocery list"
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
            errors.title ? "border-rose-300" : "border-slate-300"
          }`}
        />
        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
            errors.content ? "border-rose-300" : "border-slate-300"
          }`}
        />
        {errors.content && <p className="mt-1 text-xs text-rose-600">{errors.content}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={16} />
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default NoteForm;
